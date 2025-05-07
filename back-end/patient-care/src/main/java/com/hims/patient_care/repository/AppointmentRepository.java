package com.hims.patient_care.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hims.patient_care.model.Appointment;
import com.hims.patient_care.model.Doctor;
import com.hims.patient_care.model.Patient;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
	List<Appointment> findByPatient(Patient patient);
    List<Appointment> findByDoctor(Optional<Doctor> doctor);
    }
