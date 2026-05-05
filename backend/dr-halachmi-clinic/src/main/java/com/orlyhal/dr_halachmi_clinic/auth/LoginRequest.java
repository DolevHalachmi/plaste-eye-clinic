package com.orlyhal.dr_halachmi_clinic.auth;

// Validates that incoming request fields are not blank.
import jakarta.validation.constraints.NotBlank;

// Represents the JSON body the frontend sends to the login endpoint.
public record LoginRequest(
	// Username must be present before the controller accepts the request.
	@NotBlank(message = "Username is required")
	String username,
	// Password must also be present before authentication logic runs.
	@NotBlank(message = "Password is required")
	String password
) {
}
