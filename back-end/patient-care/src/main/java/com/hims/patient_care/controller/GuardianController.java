
package com.hims.patient_care.controller;

import com.hims.patient_care.dto.GuardianDTO;
import com.hims.patient_care.dto.GuardianResponseDTO;
import com.hims.patient_care.dto.PatientResponseDTO;
import com.hims.patient_care.model.Guardian;
import com.hims.patient_care.model.Patient;
import com.hims.patient_care.model.Users;
import com.hims.patient_care.service.GuardianService;
import com.hims.patient_care.service.PatientService;
import com.hims.patient_care.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/guardians")
public class GuardianController {

	@Autowired
	private GuardianService guardianService;

	@Autowired
	private UserService userService;

	@Autowired
	private PatientService patientService;

	@PostMapping("/register")
	public ResponseEntity<GuardianResponseDTO> registerGuardian(@Valid @RequestBody GuardianDTO guardianDTO,
	        HttpServletRequest request, HttpServletResponse response) {

	    String username = SecurityContextHolder.getContext().getAuthentication().getName();

	    if (username == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	    }

	    try {
	        Users authenticatedUser = userService.getAuthenticatedUserByUsername(username);
	        if (authenticatedUser == null) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	        }

	        // Create and save the guardian
	        Guardian guardian = new Guardian();
	        guardian.setGuardianFirstName(guardianDTO.getGuardianFirstName());
	        guardian.setGuardianLastName(guardianDTO.getGuardianLastName());
	        guardian.setPhoneNumber(guardianDTO.getPhoneNumber());
	        guardian.setGuardianEmail(guardianDTO.getGuardianEmail());
	        guardian.setRelationship(guardianDTO.getRelationship());
	        guardian.setUser(authenticatedUser);

	        guardian = guardianService.saveGuardian(guardian);

	        // If guardian has a patient they are registering for, associate patient
	        if (guardianDTO.getPatient() != null) {
	        	
	        	
	        	
	            Patient patient = new Patient();
	            
	            patient.setFirstName(guardianDTO.getPatient().getFirstName());
	            patient.setLastName(guardianDTO.getPatient().getLastName());
//	            patient.setDob(guardianDTO.getPatient().getDob());
	            patient.setGuardian(guardian);  // Set the guardian associated with the patient
                patient.setAddress(guardianDTO.getPatient().getAddress());
                patient.setAllergies(guardianDTO.getPatient().getAllergies());
                patient.setBloodPressure(guardianDTO.getPatient().getBloodPressure());
                patient.setContactNumber(guardianDTO.getPatient().getContactNumber());
//                patient.setCreatedAt(guardianDTO.getPatient().getCreatedAt());
                patient.setCurrentMedications(guardianDTO.getPatient().getCurrentMedications());
                patient.setDietaryPreferences(guardianDTO.getPatient().getDietaryPreferences());
                patient.setEmail(guardianDTO.getPatient().getEmail());
                patient.setGender(guardianDTO.getPatient().getGender());
                patient.setHeartRate(guardianDTO.getPatient().getHeartRate());
                patient.setHeight(guardianDTO.getPatient().getHeight());
                patient.setIsResident(guardianDTO.getPatient().getIsResident());
                patient.setWeight(guardianDTO.getPatient().getWeight());
                patient.setTemperature(guardianDTO.getPatient().getTemperature());
                patient.setRoomNumber(guardianDTO.getPatient().getRoomNumber());
                patient.setPreviousDiseases(guardianDTO.getPatient().getPreviousDiseases());
//                patient.setPreferredEvents(guardianDTO.getPatient().getPreferredEvents());
//                patient.setPatientImage(guardianDTO.getPatient().getPatientImage());
	            patientService.registerPatient(patient);
	        }

	        GuardianResponseDTO responseDTO = new GuardianResponseDTO(guardian);
	        return ResponseEntity.ok(responseDTO);

	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}


	@GetMapping("/patients")
	public ResponseEntity<?> getPatientsForGuardian() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		if (username == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: User not authenticated.");
		}

		try {
			Users authenticatedUser = userService.getAuthenticatedUserByUsername(username);

			if (authenticatedUser == null || !authenticatedUser.getRole().equalsIgnoreCase("GUARDIAN")) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied: User is not a guardian.");
			}

			Guardian guardian = guardianService.getGuardianByUser(authenticatedUser);

			if (guardian == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body("Guardian not found for the authenticated user.");
			}

			List<Patient> patients = patientService.getPatientsByGuardian(guardian);

			List<PatientResponseDTO> patientDTOs = patients.stream().map(patient -> new PatientResponseDTO(patient)) 
					.collect(Collectors.toList());

			return ResponseEntity.ok(patientDTOs);

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while fetching patients.");
		}
	}
}
