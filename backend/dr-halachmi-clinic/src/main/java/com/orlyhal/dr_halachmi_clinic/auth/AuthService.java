package com.orlyhal.dr_halachmi_clinic.auth;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// Verifies admin credentials against the saved database records.
@Service
public class AuthService {

	public static final String ADMIN_SESSION_KEY = "clinicAdmin";

	private final AdminUserRepository adminUserRepository;
	private final PasswordEncoder passwordEncoder;

	// Injects the repository and password encoder used during login.
	public AuthService(AdminUserRepository adminUserRepository, PasswordEncoder passwordEncoder) {
		this.adminUserRepository = adminUserRepository;
		this.passwordEncoder = passwordEncoder;
	}

	// Loads the admin by username and checks the submitted password against the hash.
	public Optional<AdminPrincipal> authenticate(String username, String password) {
		return adminUserRepository.findByUsernameIgnoreCase(username)
			.filter(adminUser -> passwordEncoder.matches(password, adminUser.getPasswordHash()))
			.map(AdminPrincipal::from);
	}
}
