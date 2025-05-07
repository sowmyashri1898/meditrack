package com.hims.patient_care.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hims.patient_care.dto.FamilyVisitRequestDTO;
import com.hims.patient_care.dto.FamilyVisitResponseDTO;
import com.hims.patient_care.model.Users;
import com.hims.patient_care.repository.UserRepository;
import com.hims.patient_care.service.FamilyVisitService;

@RestController
@RequestMapping("/api/family-visits")
public class FamilyVisitController {

    @Autowired
    private FamilyVisitService familyVisitService;
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/patient")
    public ResponseEntity<List<FamilyVisitResponseDTO>> getVisitsForPatient() {
        List<FamilyVisitResponseDTO> visits = familyVisitService.getVisitsForLoggedInPatient();
        return ResponseEntity.ok(visits);
    }

    @GetMapping("/guardian")
    public ResponseEntity<List<FamilyVisitResponseDTO>> getGuardianVisits() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        
        Users user = userRepository.findByUsername(username); // Assuming this returns a Users object directly
        
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if user is not found
        }

        List<FamilyVisitResponseDTO> visits = familyVisitService.getGuardianVisits(user.getId());
        return ResponseEntity.ok(visits);
    }

    @PostMapping("/schedule")
    public ResponseEntity<FamilyVisitResponseDTO> scheduleVisit(@RequestBody FamilyVisitRequestDTO visitRequest) {
        
        FamilyVisitResponseDTO response = familyVisitService.scheduleVisit(visitRequest);
        return ResponseEntity.ok(response);
    }
}
