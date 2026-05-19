package com.orlyhal.dr_halachmi_clinic.blog;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

// Stores a question submitted by a site visitor so the admin can review it later.
@Entity
@Table(name = "blog_questions")
public class BlogQuestion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 120)
	private String name;

	@Column(length = 40)
	private String phone;

	@Column(nullable = false, length = 160)
	private String email;

	@Column(length = 200)
	private String subject;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String comment;

	@Column
	private Long answeredPostId;

	@Column
	private Instant answerNotificationSentAt;

	@Column(nullable = false, updatable = false)
	private Instant createdAt;

	protected BlogQuestion() {
	}

	// Creates a saved visitor question from the public form values.
	public BlogQuestion(String name, String phone, String email, String subject, String comment) {
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.subject = subject;
		this.comment = comment;
	}

	@PrePersist
	// Stamps the time once when the question is first stored.
	void onCreate() {
		createdAt = Instant.now();
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getPhone() {
		return phone;
	}

	public String getEmail() {
		return email;
	}

	public String getSubject() {
		return subject;
	}

	public String getComment() {
		return comment;
	}

	public Long getAnsweredPostId() {
		return answeredPostId;
	}

	public Instant getAnswerNotificationSentAt() {
		return answerNotificationSentAt;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public void linkAnsweredPost(Long postId) {
		answeredPostId = postId;
	}

	public void markAnswerNotificationSent() {
		answerNotificationSentAt = Instant.now();
	}
}
