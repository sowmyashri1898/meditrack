package com.hims.patient_care.service;

import java.util.List;

import java.util.Optional;

import com.hims.patient_care.dto.PatientDTO;
import com.hims.patient_care.dto.PatientResponseDTO;
import com.hims.patient_care.model.Guardian;
import com.hims.patient_care.model.Patient;
import com.hims.patient_care.model.Users;

public interface PatientService {
	Patient registerPatient(Patient patient);

    Patient getPatientById(Long id);

    PatientResponseDTO updatePatient(Long id, PatientDTO patientDTO);

    List<PatientResponseDTO> getAllPatients();   

    void deletePatient(Long id);

	Optional<Patient> getPatient();
	
Patient getPatientDetails(Long userId);

Patient getPatientByUser(Users authenticatedUser);

Patient registerPatient(Long userId, PatientDTO patientRegistrationDTO);

Patient getPatient(Long id);

Patient getLatestPatientByUser(Users authenticatedUser);

List<Patient> getHistoricalPatientsByUser(Users authenticatedUser);

List<Patient> getPatientsByGuardian(Guardian guardian);

Patient getPatientByGuardian(Guardian guardian);

List<Patient> getHistoricalPatientsByGuardian(Guardian guardian);

Patient savePatient(Patient patient);

//Optional<Patient> findById(Long id);
Optional<Patient> findByEmail(String email);

}
