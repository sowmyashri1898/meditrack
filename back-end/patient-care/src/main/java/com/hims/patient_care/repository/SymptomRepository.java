package com.hims.patient_care.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hims.patient_care.model.Patient;
import com.hims.patient_care.model.Symptom;
@Repository
public interface SymptomRepository extends JpaRepository<Symptom, Long>{

	Optional<Patient> findByIdIn(List<Long> symptomId);
//    Optional<Symptom> findByName(String name);

}
