package com.orlyhal.dr_halachmi_clinic.auth;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

// Database access layer for admin users.
public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {

	// Finds an admin by username without caring about letter casing.
	Optional<AdminUser> findByUsernameIgnoreCase(String username);
}
