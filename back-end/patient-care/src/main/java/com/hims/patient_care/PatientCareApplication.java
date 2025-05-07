package com.hims.patient_care;


import org.springframework.boot.SpringApplication;


import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.hims.patient_care.config.FileStorageProperties;



@EnableJpaRepositories(basePackages = "com.hims.patient_care.repository")
@SpringBootApplication(scanBasePackages = "com.hims.patient_care")

@EnableConfigurationProperties(FileStorageProperties.class) 

public class PatientCareApplication {

	public static void main(String[] args) {
		SpringApplication.run(PatientCareApplication.class, args);
	}

}
