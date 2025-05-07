package com.hims.patient_care.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hims.patient_care.model.FamilyVisit;
import com.hims.patient_care.model.Guardian;
import com.hims.patient_care.model.Patient;
import com.hims.patient_care.model.Users;

@Repository
public interface FamilyVisitRepository extends JpaRepository<FamilyVisit, Long> {
    List<FamilyVisit> findByPatientId(Long patientId);
    List<FamilyVisit> findByGuardianId(Long guardianId);
	List<FamilyVisit> findByPatient(Patient patient);

}

