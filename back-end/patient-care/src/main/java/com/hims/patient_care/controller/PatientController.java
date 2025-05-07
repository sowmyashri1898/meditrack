package com.hims.patient_care.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hims.patient_care.dto.GuardianResponseDTO;
import com.hims.patient_care.dto.PatientDTO;
import com.hims.patient_care.dto.PatientResponseDTO;
import com.hims.patient_care.model.Doctor;
import com.hims.patient_care.model.Guardian;
import com.hims.patient_care.model.Patient;
import com.hims.patient_care.model.Speciality;
import com.hims.patient_care.model.Symptom;
import com.hims.patient_care.model.Users;
import com.hims.patient_care.service.DoctorService;
import com.hims.patient_care.service.GuardianService;
import com.hims.patient_care.service.PatientService;
import com.hims.patient_care.service.SpecialtyService;
import com.hims.patient_care.service.SymptomService;
import com.hims.patient_care.service.UserService;
import com.hims.patient_care.service.serviceImpl.EmailService;
import com.hims.patient_care.service.serviceImpl.JWTService;
import java.util.UUID;

import java.util.Base64;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JWTService jwtUtil;

    @Autowired
    private SymptomService symptomService;
    
    @Autowired
    private DoctorService doctorService;
    
    @Autowired
    private SpecialtyService specialtyService;
    
    @Autowired
    private GuardianService guardianService;
    
    @Autowired
    private EmailService emailService;
    
    @Autowired(required= true)
    private PasswordEncoder passwordEncoder;

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PatientResponseDTO> registerOrUpdatePatient(
            @RequestPart("patientDTO") String patientDTOString,
            @RequestPart(value = "patientImage", required = false) MultipartFile patientImage) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            PatientDTO patientDTO = objectMapper.readValue(patientDTOString, PatientDTO.class);

            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            if (username == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            Users authenticatedUser = userService.getAuthenticatedUserByUsername(username);
            if (authenticatedUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            Guardian guardian = null;
            if (patientDTO.getGuardian() != null) {
                if (patientDTO.getGuardian().getId() != null) {
                    guardian = guardianService.getGuardianById(patientDTO.getGuardian().getId());
                } else {
                    guardian = new Guardian();
                    guardian.setGuardianFirstName(patientDTO.getGuardian().getGuardianFirstName());
                    guardian.setGuardianLastName(patientDTO.getGuardian().getGuardianLastName());
                    guardian.setPhoneNumber(patientDTO.getGuardian().getPhoneNumber());
                    guardian.setGuardianEmail(patientDTO.getGuardian().getGuardianEmail());
                    guardian.setRelationship(patientDTO.getGuardian().getRelationship());
                    guardian.setUser(authenticatedUser); // Link guardian to authenticated user

                    // Save the guardian entity
                    guardian = guardianService.saveGuardian(guardian);

                    // Create a user account for the guardian (but not for the patient)
                    Users guardianUser = new Users();
                    guardianUser.setUsername("guardian-" + UUID.randomUUID());
                    String generatedPassword = generateRandomPassword();
                    guardianUser.setPassword(passwordEncoder.encode(generatedPassword));
                    guardianUser.setRole("GUARDIAN");
                    guardianUser.setEmail(patientDTO.getGuardian().getGuardianEmail());
                    userService.saveUser(guardianUser);

                    // Send credentials to the guardian (if required)
                    emailService.sendGuardianCredentials(guardian.getGuardianEmail(), generatedPassword);
                }
            }

            // Find the patient by email (instead of ID) to update details
            Optional<Patient> existingPatientOptional = patientService.findByEmail(patientDTO.getEmail());

            Patient patient;
            if (existingPatientOptional.isPresent()) {
                patient = existingPatientOptional.get();
            } else {
                patient = new Patient();
            }

            if (patientImage != null && !patientImage.isEmpty()) {
                patient.setPatientImage(patientImage.getBytes());
            }

            // Update other patient details
            patient.setFirstName(patientDTO.getFirstName());
            patient.setLastName(patientDTO.getLastName());
            patient.setGender(patientDTO.getGender());
            patient.setContactNumber(patientDTO.getContactNumber());
            patient.setEmail(patientDTO.getEmail());
            patient.setAddress(patientDTO.getAddress());
            patient.setAllergies(patientDTO.getAllergies());
            patient.setBloodPressure(patientDTO.getBloodPressure());
            patient.setCurrentMedications(patientDTO.getCurrentMedications());
            patient.setDietaryPreferences(patientDTO.getDietaryPreferences());
            patient.setHeartRate(patientDTO.getHeartRate());
            patient.setHeight(patientDTO.getHeight());
            patient.setIsResident(patientDTO.getIsResident());
            patient.setPreviousDiseases(patientDTO.getPreviousDiseases());
            patient.setRoomNumber(patientDTO.getRoomNumber());
            patient.setTemperature(patientDTO.getTemperature());
            patient.setWeight(patientDTO.getWeight());

            if (guardian != null) {
                patient.setGuardian(guardian);
            }

            patient.setUser(authenticatedUser);

            Patient savedPatient = patientService.savePatient(patient);

            PatientResponseDTO responseDTO = new PatientResponseDTO(savedPatient);
            return ResponseEntity.ok(responseDTO);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


//    @GetMapping("/{id}")
//    public ResponseEntity<PatientResponseDTO> getPatientById(@PathVariable Long id) {
//        Optional<PatientResponseDTO> patient = patientService.getPatientById(id);
//        return patient.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientResponseDTO> updatePatient(@PathVariable Long id, @RequestBody PatientDTO patientDTO) {
        PatientResponseDTO updatedPatient = patientService.updatePatient(id, patientDTO);
        return updatedPatient != null ? ResponseEntity.ok(updatedPatient) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<PatientResponseDTO>> getAllPatients() {
        List<PatientResponseDTO> patients = patientService.getAllPatients();
        return ResponseEntity.ok(patients);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/patient")
    public ResponseEntity<Patient> getPatient() {
        Optional<Patient> patient = patientService.getPatient();
        return patient.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/details")
    @Transactional(readOnly = true)
    public ResponseEntity<?> getPatientDetails(HttpServletRequest request, HttpServletResponse response) {
        String token = jwtUtil.extractTokenFromRequest(request);
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));

        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized request");
        }

        String username = jwtUtil.extractUserName(token);
        Users authenticatedUser = userService.getAuthenticatedUserByUsername(username);

        if (authenticatedUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        if ("patient".equalsIgnoreCase(authenticatedUser.getRole())) {
            Patient latestPatient = patientService.getLatestPatientByUser(authenticatedUser);

            if (latestPatient == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient details not found");
            }

            List<Patient> historicalPatients = patientService.getHistoricalPatientsByUser(authenticatedUser);
            
            String profilePictureBase64 = null;
            if (latestPatient.getPatientImage() != null) {
                profilePictureBase64 = Base64.getEncoder().encodeToString(latestPatient.getPatientImage());
            }

            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("latestPatient", latestPatient);
            responseMap.put("historicalPatients", historicalPatients);
            responseMap.put("profilePicture", profilePictureBase64);
            responseMap.put("guardianDetails", latestPatient.getGuardian()); // Include guardian details

            return ResponseEntity.ok(responseMap);

        } else if ("guardian".equalsIgnoreCase(authenticatedUser.getRole())) {
            Guardian guardian = guardianService.getGuardianByUser(authenticatedUser);
            if (guardian == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Guardian not found");
            }

            Patient patient = patientService.getPatientByGuardian(guardian);
            if (patient == null) {
System.out.println(guardian.getId());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient associated with this guardian not found");
            }

            List<Patient> historicalPatients = patientService.getHistoricalPatientsByGuardian(guardian);
            
            String profilePictureBase64 = null;
            if (patient.getPatientImage() != null) {
                profilePictureBase64 = Base64.getEncoder().encodeToString(patient.getPatientImage());
            }

            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("patient", patient);
            responseMap.put("guardian", guardian);
            responseMap.put("historicalPatients", historicalPatients);
            responseMap.put("profilePicture", profilePictureBase64);

            return ResponseEntity.ok(responseMap);
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to view patient details");
    }

    @GetMapping("/symptoms")
    public List<Symptom> getSymptoms() {
        return symptomService.getAllSymptoms();
    }

    @GetMapping("/doctors")
    public List<Doctor> getDoctors(@RequestParam String specialty) {
        return doctorService.getDoctorsBySpecialty(specialty);
    }
    
    @GetMapping("/specialties")
    public List<Speciality> getSpecialties() {
        return specialtyService.getAllSpecialties();
    }
    @GetMapping("/patient/{patientId}/guardian")
    public ResponseEntity<GuardianResponseDTO> getGuardianDetails(@PathVariable Long patientId) {
        Patient patient = patientService.getPatientById(patientId);
        if (patient == null || patient.getGuardian() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Guardian guardian = patient.getGuardian();
        GuardianResponseDTO responseDTO = new GuardianResponseDTO(guardian);
        return ResponseEntity.ok(responseDTO);
    }
    private String generateRandomPassword() {
        // You can use a secure method to generate a password
        int length = 8; // Length of password
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder password = new StringBuilder(length);
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            password.append(chars.charAt(random.nextInt(chars.length())));
        }
        return password.toString();
    }

}
