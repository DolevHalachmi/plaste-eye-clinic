package com.orlyhal.dr_halachmi_clinic.auth;

import jakarta.servlet.http.HttpServletRequest;
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
	private final RateLimitService rateLimitService;

	// Injects the authentication service and rate limiter used by all auth endpoints.
	public AuthController(AuthService authService, RateLimitService rateLimitService) {
		this.authService = authService;
		this.rateLimitService = rateLimitService;
	}

	// Validates the submitted credentials and stores the admin in session on success.
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(
		@Valid @RequestBody LoginRequest loginRequest,
		HttpSession session,
		HttpServletRequest request
	) {
		String clientIp = resolveClientIp(request);
		RateLimitService.LoginRateLimitResult rateLimit = rateLimitService.consumeLoginAttempt(clientIp);

		if (!rateLimit.allowed()) {
			return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
				.body(new AuthResponse(false, rateLimit.warningMessage(), null));
		}

		return authService.authenticate(loginRequest.username(), loginRequest.password())
			.map(admin -> {
				session.setAttribute(AuthService.ADMIN_SESSION_KEY, admin);
				return ResponseEntity.ok(new AuthResponse(true, "Login successful", admin));
			})
			.orElseGet(() -> {
				String message = rateLimit.hasWarning()
					? "Invalid username or password. " + rateLimit.warningMessage()
					: "Invalid username or password.";
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(new AuthResponse(false, message, null));
			});
	}

	// Reads the real client IP, checking X-Forwarded-For first for proxy/CDN setups like Render.
	private String resolveClientIp(HttpServletRequest request) {
		String forwarded = request.getHeader("X-Forwarded-For");
		if (forwarded != null && !forwarded.isBlank()) {
			return forwarded.split(",")[0].trim();
		}
		return request.getRemoteAddr();
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
