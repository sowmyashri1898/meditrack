package com.hims.patient_care.service;

import java.util.List;

import com.hims.patient_care.dto.FamilyVisitRequestDTO;
import com.hims.patient_care.dto.FamilyVisitResponseDTO;

public interface FamilyVisitService {
	  FamilyVisitResponseDTO scheduleVisit(FamilyVisitRequestDTO visitRequest);

	  

	    List<FamilyVisitResponseDTO> getGuardianVisits(Long guardianId);

		List<FamilyVisitResponseDTO> getVisitsForLoggedInPatient();
}
