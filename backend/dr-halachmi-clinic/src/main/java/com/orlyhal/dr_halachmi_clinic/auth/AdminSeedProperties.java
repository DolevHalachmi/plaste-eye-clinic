package com.orlyhal.dr_halachmi_clinic.auth;

import org.springframework.boot.context.properties.ConfigurationProperties;

// Holds the default admin values read from application properties.
@ConfigurationProperties(prefix = "app.admin.seed")
public record AdminSeedProperties(String username, String password, String displayName) {
}
