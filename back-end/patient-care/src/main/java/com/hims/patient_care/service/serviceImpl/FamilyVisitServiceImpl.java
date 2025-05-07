package com.hims.patient_care.service.serviceImpl;

import java.util.List;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.hims.patient_care.dto.FamilyVisitRequestDTO;
import com.hims.patient_care.dto.FamilyVisitResponseDTO;
import com.hims.patient_care.model.FamilyVisit;
import com.hims.patient_care.model.Guardian;
import com.hims.patient_care.model.Patient;
import com.hims.patient_care.model.Users;
import com.hims.patient_care.repository.FamilyVisitRepository;
import com.hims.patient_care.repository.GuardianRepository;
import com.hims.patient_care.repository.PatientRepository;
import com.hims.patient_care.service.FamilyVisitService;
import com.hims.patient_care.service.UserService;

@Service
public class FamilyVisitServiceImpl implements FamilyVisitService {

	@Autowired
	private FamilyVisitRepository familyVisitRepository;

	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private GuardianRepository guardianRepository;

	@Autowired
	private UserService userService;

	@Override
	public FamilyVisitResponseDTO scheduleVisit(FamilyVisitRequestDTO visitRequest) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		if (username == null) {
			throw new IllegalArgumentException("User not authenticated.");
		}

		Users authenticatedUser = userService.getAuthenticatedUserByUsername(username);
		if (authenticatedUser == null) {
			throw new IllegalArgumentException("Authenticated user not found.");
		}

		Guardian guardian = guardianRepository.findByUser(authenticatedUser);
		if (guardian == null) {
			throw new IllegalArgumentException("Guardian not found for the authenticated user.");
		}

		System.out.println("Guardian ID: " + guardian.getId());

		if (guardian.getId() == null) {
			throw new IllegalArgumentException("Guardian ID must not be null.");
		}

		Long patientId = visitRequest.getPatient().getId();
		if (patientId == null) {
			throw new IllegalArgumentException("Patient ID must not be null.");
		}

		Patient patient = patientRepository.findById(patientId)
				.orElseThrow(() -> new IllegalArgumentException("Patient not found with ID: " + patientId));

		FamilyVisit visit = new FamilyVisit();
		visit.setVisitType(visitRequest.getVisitType());
		visit.setVisitDetails(visitRequest.getVisitDetails());
		visit.setVisitDate(visitRequest.getVisitDate());
		visit.setOnline(visitRequest.isOnline());
		visit.setZoomLink(visitRequest.getZoomLink());
		visit.setPatient(patient);
		visit.setGuardian(guardian);

		FamilyVisit savedVisit = familyVisitRepository.save(visit);
		return mapToResponseDTO(savedVisit);
	}

	@Override
	public List<FamilyVisitResponseDTO> getVisitsForLoggedInPatient() {
	    String username = SecurityContextHolder.getContext().getAuthentication().getName();

	    if (username == null) {
	        throw new IllegalArgumentException("User not authenticated.");
	    }

	    Users authenticatedUser = userService.getAuthenticatedUserByUsername(username);
	    if (authenticatedUser == null) {
	        throw new IllegalArgumentException("Authenticated user not found.");
	    }

	    Patient patient = patientRepository.findByUser(authenticatedUser);
	    if (patient == null) {
	        throw new IllegalArgumentException("Patient not found for the authenticated user.");
	    }

	    List<FamilyVisit> visits = familyVisitRepository.findByPatient(patient);

	    return visits.stream().map(this::mapToResponseDTO).collect(Collectors.toList());
	}


	@Override
	public List<FamilyVisitResponseDTO> getGuardianVisits(Long guardianId) {
		List<FamilyVisit> visits = familyVisitRepository.findByGuardianId(guardianId);
		return visits.stream().map(this::mapToResponseDTO).collect(Collectors.toList());
	}

	private FamilyVisitResponseDTO mapToResponseDTO(FamilyVisit visit) {
		FamilyVisitResponseDTO dto = new FamilyVisitResponseDTO();
		dto.setId(visit.getId());
		dto.setVisitType(visit.getVisitType());
		dto.setVisitDetails(visit.getVisitDetails());
		dto.setVisitDate(visit.getVisitDate());
		dto.setOnline(visit.isOnline());
		dto.setGuardian(visit.getGuardian());
		dto.setPatient(visit.getPatient());
		dto.setZoomLink(visit.getZoomLink());
		return dto;
	}
}
