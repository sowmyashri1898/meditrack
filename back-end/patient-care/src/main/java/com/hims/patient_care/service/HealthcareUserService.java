package com.hims.patient_care.service;

import java.util.List;
import java.util.Optional;

import com.hims.patient_care.model.HealthcareUser;

public interface HealthcareUserService {

	List<HealthcareUser> getDoctorsBySymptom(Long symptomId);

	void deleteHealthcareUser(Long userId);

	HealthcareUser saveHealthcareUser(HealthcareUser healthcareUser);

	List<HealthcareUser> getAllHealthcareUsers();

	Optional<HealthcareUser> getHealthcareUserById(Long userId);

}
