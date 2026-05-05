package com.orlyhal.dr_halachmi_clinic.auth;

// This record defines the JSON shape returned by the auth endpoints.
public record AuthResponse(
	// True when the request represents an authenticated admin state.
	boolean authenticated,
	// A short human-readable message the frontend can display if needed.
	String message,
	// The logged-in admin details, or null when there is no authenticated admin.
	AdminPrincipal admin
) 
{
}
