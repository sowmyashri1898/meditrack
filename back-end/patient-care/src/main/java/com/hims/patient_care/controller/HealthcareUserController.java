package com.hims.patient_care.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hims.patient_care.model.HealthcareUser;
import com.hims.patient_care.service.HealthcareUserService;
@CrossOrigin(origins = "http://localhost:4200") // Allow CORS from Angular app
@RestController
@RequestMapping("/api/healthcare")
public class HealthcareUserController {
	
	@Autowired
	private HealthcareUserService healthcareUserService;

	 @GetMapping("/doctors/{symptomId}")
	    public List<HealthcareUser> getDoctorsBySymptom(@PathVariable Long symptomId) {
	        return healthcareUserService.getDoctorsBySymptom(symptomId);
	    }
	 
	  @PostMapping("/save")
	    public ResponseEntity<HealthcareUser> createOrUpdateHealthcareUser(@RequestBody HealthcareUser healthcareUser) {
	        HealthcareUser savedUser = healthcareUserService.saveHealthcareUser(healthcareUser);
	        return ResponseEntity.ok(savedUser);
	    }

	    // Get all HealthcareUsers
	    @GetMapping
	    public List<HealthcareUser> getAllHealthcareUsers() {
	        return healthcareUserService.getAllHealthcareUsers();
	    }

	    // Get a HealthcareUser by ID
	    @GetMapping("/{userId}")
	    public ResponseEntity<HealthcareUser> getHealthcareUserById(@PathVariable Long userId) {
	        Optional<HealthcareUser> healthcareUser = healthcareUserService.getHealthcareUserById(userId);
	        return healthcareUser.map(ResponseEntity::ok)
	                             .orElseGet(() -> ResponseEntity.notFound().build());
	    }

	    // Delete a HealthcareUser by ID
	    @DeleteMapping("/{userId}")
	    public ResponseEntity<Void> deleteHealthcareUser(@PathVariable Long userId) {
	        healthcareUserService.deleteHealthcareUser(userId);
	        return ResponseEntity.noContent().build();
	    }
}
