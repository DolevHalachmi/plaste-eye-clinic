package com.orlyhal.dr_halachmi_clinic.auth;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// Stores one admin login row in the database.
@Entity
@Table(name = "admin_users")
public class AdminUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true, length = 100)
	private String username;

	@Column(nullable = false)
	private String passwordHash;

	@Column(nullable = false, length = 120)
	private String displayName;

	protected AdminUser() {
	}

	// Creates an admin record with the already-hashed password.
	public AdminUser(String username, String passwordHash, String displayName) {
		this.username = username;
		this.passwordHash = passwordHash;
		this.displayName = displayName;
	}

	public Long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public String getPasswordHash() {
		return passwordHash;
	}

	public String getDisplayName() {
		return displayName;
	}
}
