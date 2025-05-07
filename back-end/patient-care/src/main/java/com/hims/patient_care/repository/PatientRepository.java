package com.hims.patient_care.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hims.patient_care.model.Guardian;
import com.hims.patient_care.model.Patient;
import com.hims.patient_care.model.Users;
@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    Patient findByUserId(Long userId);

	Patient findByUser(Users authenticatedUser);

	Patient findTopByUserIdOrderByCreatedAtDesc(Long id);

	List<Patient> findAllByUserIdOrderByCreatedAtAsc(Long id);

	Patient findByGuardian(Guardian guardian);

	Optional<Patient> findByEmail(String email);


}
