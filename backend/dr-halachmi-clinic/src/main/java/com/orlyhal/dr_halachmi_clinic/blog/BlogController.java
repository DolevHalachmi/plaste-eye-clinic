package com.orlyhal.dr_halachmi_clinic.blog;

import java.time.Instant;
import java.util.List;

import com.orlyhal.dr_halachmi_clinic.auth.AdminPrincipal;
import com.orlyhal.dr_halachmi_clinic.auth.AuthService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// Exposes the public blog endpoints and the admin-only CRUD actions for the blog.
@RestController
public class BlogController {

	private final BlogPostRepository blogPostRepository;
	private final BlogQuestionRepository blogQuestionRepository;
	private final QuestionAnswerNotificationService notificationService;

	// Injects the repositories used by the public blog and admin tools.
	public BlogController(
		BlogPostRepository blogPostRepository,
		BlogQuestionRepository blogQuestionRepository,
		QuestionAnswerNotificationService notificationService
	) {
		this.blogPostRepository = blogPostRepository;
		this.blogQuestionRepository = blogQuestionRepository;
		this.notificationService = notificationService;
	}

	// Returns the published blog cards in newest-updated-first order.
	@GetMapping("/api/blog/posts")
	public List<BlogPostResponse> getPosts() {
		return blogPostRepository.findAllByOrderByUpdatedAtDescIdDesc()
			.stream()
			.map(BlogPostResponse::from)
			.toList();
	}

	// Saves a visitor question so the admin can review it later.
	@PostMapping("/api/blog/questions")
	public ResponseEntity<BlogMessageResponse> createQuestion(@Valid @RequestBody BlogQuestionRequest request) {
		BlogQuestion question = new BlogQuestion(
			clean(request.name()),
			cleanOptional(request.phone()),
			clean(request.email()),
			cleanOptional(request.subject()),
			clean(request.comment())
		);

		blogQuestionRepository.save(question);
		return ResponseEntity.status(HttpStatus.CREATED)
			.body(new BlogMessageResponse(true, "Your question was saved successfully."));
	}

	// Returns the admin-only list of submitted questions.
	@GetMapping("/api/admin/blog/questions")
	public ResponseEntity<?> getQuestionIdeas(HttpSession session) {
		if (!isAdminLoggedIn(session)) {
			return unauthorized();
		}

		List<BlogQuestionResponse> questions = blogQuestionRepository.findAllByOrderByCreatedAtDescIdDesc()
			.stream()
			.map(BlogQuestionResponse::from)
			.toList();

		return ResponseEntity.ok(questions);
	}

	// Creates a new published blog card for the public page.
	@PostMapping("/api/admin/blog/posts")
	public ResponseEntity<?> createPost(@Valid @RequestBody BlogPostRequest request, HttpSession session) {
		if (!isAdminLoggedIn(session)) {
			return unauthorized();
		}

		ResponseEntity<BlogMessageResponse> questionConflict = validateQuestionLink(request.sourceQuestionId(), null);
		if (questionConflict != null) {
			return questionConflict;
		}

		BlogPost post = blogPostRepository.save(new BlogPost(
			clean(request.question()),
			clean(request.answer()),
			request.sourceQuestionId()
		));
		String message = finalizeLinkedQuestion(post, request.sourceQuestionId());
		return ResponseEntity.status(HttpStatus.CREATED)
			.body(new BlogPostMutationResponse(BlogPostResponse.from(post), message));
	}

	// Updates an existing blog card by id.
	@PutMapping("/api/admin/blog/posts/{id}")
	public ResponseEntity<?> updatePost(
		@PathVariable Long id,
		@Valid @RequestBody BlogPostRequest request,
		HttpSession session
	) {
		if (!isAdminLoggedIn(session)) {
			return unauthorized();
		}

		return blogPostRepository.findById(id)
			.<ResponseEntity<?>>map(post -> {
				Long sourceQuestionId = post.getSourceQuestionId() != null
					? post.getSourceQuestionId()
					: request.sourceQuestionId();
				ResponseEntity<BlogMessageResponse> questionConflict = validateQuestionLink(sourceQuestionId, post.getId());
				if (questionConflict != null) {
					return questionConflict;
				}

				post.update(clean(request.question()), clean(request.answer()), sourceQuestionId);
				blogPostRepository.save(post);
				String message = finalizeLinkedQuestion(post, sourceQuestionId);
				return ResponseEntity.ok(new BlogPostMutationResponse(BlogPostResponse.from(post), message));
			})
			.orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(new BlogMessageResponse(false, "The requested blog post was not found.")));
	}

	// Deletes a published blog card by id.
	@DeleteMapping("/api/admin/blog/posts/{id}")
	public ResponseEntity<BlogMessageResponse> deletePost(@PathVariable Long id, HttpSession session) {
		if (!isAdminLoggedIn(session)) {
			return unauthorized();
		}

		if (!blogPostRepository.existsById(id)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(new BlogMessageResponse(false, "The requested blog post was not found."));
		}

		blogPostRepository.deleteById(id);
		return ResponseEntity.ok(new BlogMessageResponse(true, "The blog post was deleted."));
	}

	// Deletes a saved visitor question from the idea list.
	@DeleteMapping("/api/admin/blog/questions/{id}")
	public ResponseEntity<BlogMessageResponse> deleteQuestion(@PathVariable Long id, HttpSession session) {
		if (!isAdminLoggedIn(session)) {
			return unauthorized();
		}

		if (!blogQuestionRepository.existsById(id)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(new BlogMessageResponse(false, "The requested question was not found."));
		}

		blogQuestionRepository.deleteById(id);
		return ResponseEntity.ok(new BlogMessageResponse(true, "The saved question was deleted."));
	}

	// Reuses the clinic login so blog management shares the same admin session.
	private boolean isAdminLoggedIn(HttpSession session) {
		return session.getAttribute(AuthService.ADMIN_SESSION_KEY) instanceof AdminPrincipal;
	}

	// Builds a standard 401 response for admin-only actions.
	private ResponseEntity<BlogMessageResponse> unauthorized() {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
			.body(new BlogMessageResponse(false, "Admin login is required for this action."));
	}

	private ResponseEntity<BlogMessageResponse> validateQuestionLink(Long sourceQuestionId, Long currentPostId) {
		if (sourceQuestionId == null) {
			return null;
		}

		if (!blogQuestionRepository.existsById(sourceQuestionId)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(new BlogMessageResponse(false, "The selected visitor question no longer exists."));
		}

		boolean alreadyLinked = currentPostId == null
			? blogPostRepository.existsBySourceQuestionId(sourceQuestionId)
			: blogPostRepository.existsBySourceQuestionIdAndIdNot(sourceQuestionId, currentPostId);
		if (alreadyLinked) {
			return ResponseEntity.status(HttpStatus.CONFLICT)
				.body(new BlogMessageResponse(false, "This visitor question is already linked to another blog post."));
		}

		return null;
	}

	private String finalizeLinkedQuestion(BlogPost post, Long sourceQuestionId) {
		if (sourceQuestionId == null) {
			return "The blog post was saved successfully.";
		}

		return blogQuestionRepository.findById(sourceQuestionId)
			.map(question -> {
				question.linkAnsweredPost(post.getId());

				String message = "The blog post was saved and linked to the visitor question.";
				if (question.getAnswerNotificationSentAt() == null) {
					QuestionAnswerNotificationService.DeliveryResult deliveryResult =
						notificationService.sendAnswerNotification(question, post);
					if (deliveryResult.sent()) {
						question.markAnswerNotificationSent();
					}
					message = deliveryResult.message();
				}

				blogQuestionRepository.save(question);
				return message;
			})
			.orElse("The blog post was saved, but the original question could not be linked.");
	}

	// Trims required strings before saving them.
	private String clean(String value) {
		return value.trim();
	}

	// Trims optional strings and converts empty values to null.
	private String cleanOptional(String value) {
		if (value == null) {
			return null;
		}

		String cleaned = value.trim();
		return cleaned.isEmpty() ? null : cleaned;
	}

	public record BlogPostRequest(
		@NotBlank(message = "Please enter a question.")
		@Size(max = 300, message = "The question is too long.")
		String question,
		@NotBlank(message = "Please enter an answer.")
		String answer,
		Long sourceQuestionId
	) {
	}

	public record BlogQuestionRequest(
		@NotBlank(message = "Please enter a name.")
		@Size(max = 120, message = "The name is too long.")
		String name,
		@Size(max = 40, message = "The phone number is too long.")
		String phone,
		@NotBlank(message = "Please enter an email address.")
		@Email(message = "Please enter a valid email address.")
		@Size(max = 160, message = "The email address is too long.")
		String email,
		@Size(max = 200, message = "The subject is too long.")
		String subject,
		@NotBlank(message = "Please enter your question.")
		String comment
	) {
	}

	public record BlogPostResponse(
		Long id,
		String question,
		String answer,
		Long sourceQuestionId,
		Instant createdAt,
		Instant updatedAt
	) {
		// Maps the entity into the smaller response used by the frontend.
		static BlogPostResponse from(BlogPost post) {
			return new BlogPostResponse(
				post.getId(),
				post.getQuestion(),
				post.getAnswer(),
				post.getSourceQuestionId(),
				post.getCreatedAt(),
				post.getUpdatedAt()
			);
		}
	}

	public record BlogQuestionResponse(
		Long id,
		String name,
		String phone,
		String email,
		String subject,
		String comment,
		Long answeredPostId,
		Instant answerNotificationSentAt,
		Instant createdAt
	) {
		// Maps the entity into the smaller response used by the frontend.
		static BlogQuestionResponse from(BlogQuestion question) {
			return new BlogQuestionResponse(
				question.getId(),
				question.getName(),
				question.getPhone(),
				question.getEmail(),
				question.getSubject(),
				question.getComment(),
				question.getAnsweredPostId(),
				question.getAnswerNotificationSentAt(),
				question.getCreatedAt()
			);
		}
	}

	public record BlogPostMutationResponse(BlogPostResponse post, String message) {
	}

	public record BlogMessageResponse(boolean success, String message) {
	}
}
