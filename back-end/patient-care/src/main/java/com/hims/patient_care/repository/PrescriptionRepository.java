package com.hims.patient_care.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hims.patient_care.model.Doctor;
import com.hims.patient_care.model.Patient;
import com.hims.patient_care.model.Prescription;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long>{

	List<Prescription> findByDoctor(Doctor doctor);
	List<Prescription> findByPatient(Patient patient);



}
