package com.hims.patient_care.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hims.patient_care.model.Medication;
@Repository
public interface MedicationRepository extends JpaRepository<Medication, Long>{

}
