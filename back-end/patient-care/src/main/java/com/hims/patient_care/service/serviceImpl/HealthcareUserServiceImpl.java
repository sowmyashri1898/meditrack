package com.hims.patient_care.service.serviceImpl;

import java.time.LocalDate;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hims.patient_care.model.HealthcareUser;
import com.hims.patient_care.model.Users;
import com.hims.patient_care.repository.HealthcareUserRepository;
import com.hims.patient_care.repository.UserRepository;
import com.hims.patient_care.service.HealthcareUserService;

@Service
public class HealthcareUserServiceImpl implements HealthcareUserService{
	
	@Autowired
	private  HealthcareUserRepository healthcareUserRepository;
	
	
	@Autowired
	private  UserRepository userRepository;

	  @Override
	    public List<HealthcareUser> getDoctorsBySymptom(Long symptomId) {
	        return healthcareUserRepository.findHealthcareUsersBySymptomId(symptomId);
	    }

	    public HealthcareUserServiceImpl(HealthcareUserRepository healthcareUserRepository) {
	        this.healthcareUserRepository = healthcareUserRepository;
	    }

	    @Override
	    public HealthcareUser saveHealthcareUser(HealthcareUser healthcareUser) {
	        // Check if healthcareUser has an existing ID (i.e., update scenario)
	        if (healthcareUser.getUserId() != null) {
	            if (healthcareUserRepository.existsById(healthcareUser.getUserId())) {
	                // Fetch the existing healthcareUser from the repository
	                HealthcareUser existingUser = healthcareUserRepository.findById(healthcareUser.getUserId())
	                                                                      .orElseThrow(() -> new RuntimeException("User not found"));

	                // Update the HealthcareUser details
	                existingUser.setFirstName(healthcareUser.getFirstName());
	                existingUser.setLastName(healthcareUser.getLastName());
	                existingUser.setEmail(healthcareUser.getEmail());
	                existingUser.setPhoneNumber(healthcareUser.getPhoneNumber());
	                existingUser.setAddress(healthcareUser.getAddress());
	                existingUser.setDob(healthcareUser.getDob());
	                existingUser.setGender(healthcareUser.getGender());
	                existingUser.setProfilePicture(healthcareUser.getProfilePicture());
	                existingUser.setStatus(healthcareUser.getStatus());
	                existingUser.setRole(healthcareUser.getRole());
	                existingUser.setUpdatedAt(healthcareUser.getUpdatedAt());

	                if (existingUser.getUser() != null) {
	                    Users existingLoginUser = existingUser.getUser();
	                    existingLoginUser.setUsername(healthcareUser.getUser().getUsername());
	                    existingLoginUser.setPassword(healthcareUser.getUser().getPassword()); // Ensure proper handling of password (hashed or encrypted)
	                    
	                    // Save updated User details
	                    userRepository.save(existingLoginUser);
	                }

	                // Save and return the updated HealthcareUser
	                return healthcareUserRepository.save(existingUser);
	            }
	        }

	        healthcareUser.setCreatedAt(healthcareUser.getCreatedAt() != null ? healthcareUser.getCreatedAt() : LocalDate.now());

	        Users loginUser = healthcareUser.getUser();
	        if (loginUser != null) {
	            if (loginUser.getId() == null) {
	                userRepository.save(loginUser); // Save new User details (login data)
	            } else {
	                Users existingLoginUser = userRepository.findById(loginUser.getId()).orElseThrow();
	                existingLoginUser.setUsername(loginUser.getUsername());
	                existingLoginUser.setPassword(loginUser.getPassword()); // Ensure password is correctly handled (hashed)
	                userRepository.save(existingLoginUser);
	            }
	        }

	        return healthcareUserRepository.save(healthcareUser);
	    }

	    @Override
	    public List<HealthcareUser> getAllHealthcareUsers() {
	        return healthcareUserRepository.findAll();
	    }

	    @Override
	    public Optional<HealthcareUser> getHealthcareUserById(Long userId) {
	        return healthcareUserRepository.findById(userId);
	    }

	    @Override
	    public void deleteHealthcareUser(Long userId) {
	        healthcareUserRepository.deleteById(userId);
	    }

}
