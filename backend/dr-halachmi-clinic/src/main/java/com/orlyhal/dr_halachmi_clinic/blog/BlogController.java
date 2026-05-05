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

	// Injects the repositories used by the public blog and admin tools.
	public BlogController(BlogPostRepository blogPostRepository, BlogQuestionRepository blogQuestionRepository) {
		this.blogPostRepository = blogPostRepository;
		this.blogQuestionRepository = blogQuestionRepository;
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
			.body(new BlogMessageResponse(true, "השאלה נשמרה ונשלחה למנהלת הבלוג."));
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

		BlogPost post = blogPostRepository.save(new BlogPost(clean(request.question()), clean(request.answer())));
		return ResponseEntity.status(HttpStatus.CREATED).body(BlogPostResponse.from(post));
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
				post.update(clean(request.question()), clean(request.answer()));
				blogPostRepository.save(post);
				return ResponseEntity.ok(BlogPostResponse.from(post));
			})
			.orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(new BlogMessageResponse(false, "כרטיס הבלוג לא נמצא.")));
	}

	// Deletes a published blog card by id.
	@DeleteMapping("/api/admin/blog/posts/{id}")
	public ResponseEntity<BlogMessageResponse> deletePost(@PathVariable Long id, HttpSession session) {
		if (!isAdminLoggedIn(session)) {
			return unauthorized();
		}

		if (!blogPostRepository.existsById(id)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(new BlogMessageResponse(false, "כרטיס הבלוג לא נמצא."));
		}

		blogPostRepository.deleteById(id);
		return ResponseEntity.ok(new BlogMessageResponse(true, "כרטיס הבלוג נמחק."));
	}

	// Deletes a saved visitor question from the idea list.
	@DeleteMapping("/api/admin/blog/questions/{id}")
	public ResponseEntity<BlogMessageResponse> deleteQuestion(@PathVariable Long id, HttpSession session) {
		if (!isAdminLoggedIn(session)) {
			return unauthorized();
		}

		if (!blogQuestionRepository.existsById(id)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(new BlogMessageResponse(false, "השאלה לא נמצאה."));
		}

		blogQuestionRepository.deleteById(id);
		return ResponseEntity.ok(new BlogMessageResponse(true, "השאלה נמחקה ממאגר הרעיונות."));
	}

	// Reuses the clinic login so blog management shares the same admin session.
	private boolean isAdminLoggedIn(HttpSession session) {
		return session.getAttribute(AuthService.ADMIN_SESSION_KEY) instanceof AdminPrincipal;
	}

	// Builds a standard 401 response for admin-only actions.
	private ResponseEntity<BlogMessageResponse> unauthorized() {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
			.body(new BlogMessageResponse(false, "נדרשת התחברות מנהל כדי לבצע את הפעולה הזאת."));
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
		@NotBlank(message = "יש להזין שאלה")
		@Size(max = 300, message = "השאלה ארוכה מדי")
		String question,
		@NotBlank(message = "יש להזין תשובה")
		String answer
	) {
	}

	public record BlogQuestionRequest(
		@NotBlank(message = "יש להזין שם")
		@Size(max = 120, message = "השם ארוך מדי")
		String name,
		@Size(max = 40, message = "מספר הטלפון ארוך מדי")
		String phone,
		@NotBlank(message = "יש להזין אימייל")
		@Email(message = "כתובת האימייל לא תקינה")
		@Size(max = 160, message = "כתובת האימייל ארוכה מדי")
		String email,
		@Size(max = 200, message = "הנושא ארוך מדי")
		String subject,
		@NotBlank(message = "יש להזין את תוכן השאלה")
		String comment
	) {
	}

	public record BlogPostResponse(
		Long id,
		String question,
		String answer,
		Instant createdAt,
		Instant updatedAt
	) {
		// Maps the entity into the smaller response used by the frontend.
		static BlogPostResponse from(BlogPost post) {
			return new BlogPostResponse(
				post.getId(),
				post.getQuestion(),
				post.getAnswer(),
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
				question.getCreatedAt()
			);
		}
	}

	public record BlogMessageResponse(boolean success, String message) {
	}
}
