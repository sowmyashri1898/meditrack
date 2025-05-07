package com.hims.patient_care.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hims.patient_care.dto.PrescriptionDTO;
import com.hims.patient_care.model.Dosage;
import com.hims.patient_care.model.Medication;
import com.hims.patient_care.model.Users;
import com.hims.patient_care.service.PrescriptionService;
import com.hims.patient_care.service.UserService;
import com.hims.patient_care.service.serviceImpl.JWTService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {
	@Autowired
	private PrescriptionService prescriptionService;

	@Autowired
	private JWTService jwtUtil; // Your JWT Service

	@Autowired
	private UserService userService;

	@GetMapping("/medications")
	public List<Medication> getMedications() {
		return prescriptionService.getMedications();
	}

	@GetMapping("/dosages")
	public List<Dosage> getDosages() {
		return prescriptionService.getDosages();
	}

	@PostMapping
	@PreAuthorize("hasRole('DOCTOR')")
	public ResponseEntity<PrescriptionDTO> createPrescription(@RequestBody PrescriptionDTO prescriptionDTO) {
		PrescriptionDTO createdPrescription = prescriptionService.createPrescription(prescriptionDTO);
		return ResponseEntity.ok(createdPrescription);
	}

	@GetMapping
	@PreAuthorize("hasRole('DOCTOR') or hasRole('PATIENT')")
	public ResponseEntity<List<PrescriptionDTO>> getAllPrescriptions() {
		List<PrescriptionDTO> prescriptions = prescriptionService.getAllPrescriptions();
		return ResponseEntity.ok(prescriptions);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('DOCTOR') or hasRole('PATIENT')")
	public ResponseEntity<PrescriptionDTO> getPrescriptionById(@PathVariable Long id) {
		PrescriptionDTO prescription = prescriptionService.getPrescriptionById(id);
		return ResponseEntity.ok(prescription);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('DOCTOR')")
	public ResponseEntity<PrescriptionDTO> updatePrescription(@PathVariable Long id,
			@RequestBody PrescriptionDTO prescriptionDTO) {
		PrescriptionDTO updatedPrescription = prescriptionService.updatePrescription(id, prescriptionDTO);
		return ResponseEntity.ok(updatedPrescription);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('DOCTOR')")
	public ResponseEntity<Void> deletePrescription(@PathVariable Long id) {
		prescriptionService.deletePrescription(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/patient")
	public ResponseEntity<List<PrescriptionDTO>> getPatientPrescriptions(HttpServletRequest request,
			HttpServletResponse response) {
		String token = jwtUtil.extractTokenFromRequest(request);
		response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));

		if (token == null || !jwtUtil.validateToken(token)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}

//	        String patientId = jwtUtil.extractPatientId(token);  // Extract patientId from token
//
//	        if (patientId == null || patientId.isEmpty()) {
//	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
//	        }
		String username = jwtUtil.extractUserName(token);
		if (username == null || username.isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
		Users authenticatedUser = userService.getAuthenticatedUserByUsername(jwtUtil.extractUserName(token));
		if (authenticatedUser == null || !"PATIENT".equalsIgnoreCase(authenticatedUser.getRole())) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
		}

		try {
			List<PrescriptionDTO> prescriptions = prescriptionService.getPrescriptionsForPatient(username);
			if (prescriptions == null || prescriptions.isEmpty()) {
				return ResponseEntity.noContent().build();
			}

			return ResponseEntity.ok(prescriptions);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/doctor")
	public ResponseEntity<List<PrescriptionDTO>> getDoctorPrescriptions(HttpServletRequest request,
			HttpServletResponse response) {
		String token = jwtUtil.extractTokenFromRequest(request);
		response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));

		if (token == null || !jwtUtil.validateToken(token)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}

//	        String doctorId = jwtUtil.extractDoctorId(token);  // Extract doctorId from token
//
//	        if (doctorId == null || doctorId.isEmpty()) {
//	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
//	        }

		String username = jwtUtil.extractUserName(token);
		if (username == null || username.isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
		Users authenticatedUser = userService.getAuthenticatedUserByUsername(jwtUtil.extractUserName(token));
		if (authenticatedUser == null || !"DOCTOR".equalsIgnoreCase(authenticatedUser.getRole())) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
		}

		try {
			List<PrescriptionDTO> prescriptions = prescriptionService.getPrescriptionsForDoctor(username);
			if (prescriptions == null || prescriptions.isEmpty()) {
				return ResponseEntity.noContent().build();
			}

			return ResponseEntity.ok(prescriptions);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}
