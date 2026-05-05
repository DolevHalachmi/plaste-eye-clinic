package com.orlyhal.dr_halachmi_clinic.auth;

// Small session-safe view of the admin returned to the frontend.
public record AdminPrincipal(Long id, String username, String displayName) {

	// Converts the full entity into the smaller session/response model.
	public static AdminPrincipal from(AdminUser adminUser) {
		return new AdminPrincipal(adminUser.getId(), adminUser.getUsername(), adminUser.getDisplayName());
	}
}
