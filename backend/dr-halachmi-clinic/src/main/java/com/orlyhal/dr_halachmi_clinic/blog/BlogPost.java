package com.orlyhal.dr_halachmi_clinic.blog;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

// Stores one published question-and-answer card shown on the public blog page.
@Entity
@Table(name = "blog_posts")
public class BlogPost {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 300)
	private String question;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String answer;

	@Column(nullable = false, updatable = false)
	private Instant createdAt;

	@Column(nullable = false)
	private Instant updatedAt;

	protected BlogPost() {
	}

	// Creates a new published card with its question and answer.
	public BlogPost(String question, String answer) {
		this.question = question;
		this.answer = answer;
	}

	// Replaces the public text when the admin edits a card.
	public void update(String question, String answer) {
		this.question = question;
		this.answer = answer;
	}

	@PrePersist
	// Sets both timestamps when the card is first saved.
	void onCreate() {
		Instant now = Instant.now();
		createdAt = now;
		updatedAt = now;
	}

	@PreUpdate
	// Refreshes the update timestamp on each edit.
	void onUpdate() {
		updatedAt = Instant.now();
	}

	public Long getId() {
		return id;
	}

	public String getQuestion() {
		return question;
	}

	public String getAnswer() {
		return answer;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}
}
