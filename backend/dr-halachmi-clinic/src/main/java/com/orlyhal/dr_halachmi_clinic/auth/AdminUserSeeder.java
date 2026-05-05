package com.orlyhal.dr_halachmi_clinic.auth;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// Creates the first admin account once when the database is empty.
@Component
public class AdminUserSeeder implements CommandLineRunner {

	private final AdminUserRepository adminUserRepository;
	private final PasswordEncoder passwordEncoder;
	private final AdminSeedProperties adminSeedProperties;

	// Injects the repository, encoder, and configured seed values.
	public AdminUserSeeder(
		AdminUserRepository adminUserRepository,
		PasswordEncoder passwordEncoder,
		AdminSeedProperties adminSeedProperties
	) {
		this.adminUserRepository = adminUserRepository;
		this.passwordEncoder = passwordEncoder;
		this.adminSeedProperties = adminSeedProperties;
	}

	// Seeds the default admin only if no admin users exist yet.
	@Override
	public void run(String... args) {
		if (adminUserRepository.count() > 0) {
			return;
		}

		AdminUser adminUser = new AdminUser(
			adminSeedProperties.username(),
			passwordEncoder.encode(adminSeedProperties.password()),
			adminSeedProperties.displayName()
		);

		adminUserRepository.save(adminUser);
	}
}
