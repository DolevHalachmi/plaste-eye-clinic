package com.orlyhal.dr_halachmi_clinic.auth;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Handles the admin login/session endpoints used by the clinic page.
@RestController
@RequestMapping("/api/admin/auth")
public class AuthController {

	private final AuthService authService;

	// Injects the authentication service used by all auth endpoints.
	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	// Validates the submitted credentials and stores the admin in session on success.
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest, HttpSession session) {
		return authService.authenticate(loginRequest.username(), loginRequest.password())
			.map(admin -> {
				session.setAttribute(AuthService.ADMIN_SESSION_KEY, admin);
				return ResponseEntity.ok(new AuthResponse(true, "Login successful", admin));
			})
			.orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(new AuthResponse(false, "Invalid username or password", null)));
	}

	// Returns the active admin session so the frontend can stay logged in after refresh.
	@GetMapping("/session")
	public ResponseEntity<AuthResponse> session(HttpSession session) {
		AdminPrincipal admin = (AdminPrincipal) session.getAttribute(AuthService.ADMIN_SESSION_KEY);
		if (admin == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(new AuthResponse(false, "No active admin session", null));
		}

		return ResponseEntity.ok(new AuthResponse(true, "Active admin session", admin));
	}

	// Clears the stored admin session and logs the user out.
	@PostMapping("/logout")
	public AuthResponse logout(HttpSession session) {
		session.invalidate();
		return new AuthResponse(false, "Logged out", null);
	}
}
