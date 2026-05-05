package com.orlyhal.dr_halachmi_clinic;

import com.orlyhal.dr_halachmi_clinic.auth.AdminSeedProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AdminSeedProperties.class)
public class DrHalachmiClinicApplication {

	public static void main(String[] args) {
		SpringApplication.run(DrHalachmiClinicApplication.class, args);
	}

}
