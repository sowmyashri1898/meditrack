package com.hims.patient_care.controller;

import java.io.IOException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hims.patient_care.dto.DoctorDTO;
import com.hims.patient_care.model.Doctor;
import com.hims.patient_care.model.Users;
import com.hims.patient_care.service.DoctorService;
import com.hims.patient_care.service.UserService;
import com.hims.patient_care.service.serviceImpl.JWTService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/healthcare")
public class DoctorController {
	@Autowired
	private DoctorService doctorService;

	@Autowired
	private UserService userService;

	@Autowired
	private JWTService jwtUtil;

	@PostMapping("/doctor/register")
	public Doctor registerDoctor( @Valid @ModelAttribute DoctorDTO doctorDTO, 
			@RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture) throws IOException 
	{
 
		return doctorService.registerDoctor(doctorDTO,profilePicture);
	}

	@GetMapping("/{doctorId}")
	public Doctor getDoctorDetails(@PathVariable Long doctorId) {
		return doctorService.getDoctorDetails(doctorId);
	}

	@GetMapping("/doctors")
	public List<Doctor> findDoctorsBySymptoms(@RequestParam List<Long> symptomIds) {
		return doctorService.findDoctorsBySymptoms(symptomIds);
	}


	@GetMapping("/doctor/details")
	public ResponseEntity<?> getDoctorDetails(HttpServletRequest request, HttpServletResponse response) {
	    String token = jwtUtil.extractTokenFromRequest(request);
	    response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));

	    if (token == null || !jwtUtil.validateToken(token)) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized request");
	    }

	    String username = jwtUtil.extractUserName(token);
	    Users authenticatedUser = userService.getAuthenticatedUserByUsername(username);

	    if (authenticatedUser == null || !"doctor".equalsIgnoreCase(authenticatedUser.getRole())) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to view doctor details");
	    }

	    Doctor latestDoctor = doctorService.getDoctorDetailsByUser(authenticatedUser);

	    if (latestDoctor == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor details not found");
	    }

	    String profilePictureBase64 = null;
	    if (latestDoctor.getProfilePicture() != null) {
	        profilePictureBase64 = Base64.getEncoder().encodeToString(latestDoctor.getProfilePicture());
	    }

	    Map<String, Object> responseMap = new HashMap<>();
	    responseMap.put("doctor", latestDoctor);
	    responseMap.put("profilePicture", profilePictureBase64);

	    return ResponseEntity.ok(responseMap);
	}

	
	@PostMapping("/update-profile")
	public ResponseEntity<?> updateProfile(@RequestParam("profilePicture") MultipartFile profilePicture,
	                                       @RequestParam Map<String, String> formData) {
	    if (!profilePicture.isEmpty()) {
	    }
	    return ResponseEntity.ok("Profile updated");
	}
//	
//	@GetMapping("/doctor/{id}")
//	public ResponseEntity<DoctorDTO> getDoctorWithVisits(@PathVariable Long id) {
//	    DoctorDTO doctorDTO = doctorService.getDoctorDetailsWithVisits(id);
//	    return ResponseEntity.ok(doctorDTO);
//	}

}
