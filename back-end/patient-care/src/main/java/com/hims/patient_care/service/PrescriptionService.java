package com.hims.patient_care.service;

import java.util.List;

import com.hims.patient_care.dto.PrescriptionDTO;
import com.hims.patient_care.model.Dosage;
import com.hims.patient_care.model.Medication;

public interface PrescriptionService {

	List<Medication> getMedications();

	List<Dosage> getDosages();

	PrescriptionDTO createPrescription(PrescriptionDTO prescriptionDTO);

	void deletePrescription(Long id);

	PrescriptionDTO updatePrescription(Long id, PrescriptionDTO prescriptionDTO);

	List<PrescriptionDTO> getAllPrescriptions();

	PrescriptionDTO getPrescriptionById(Long id);

	List<PrescriptionDTO> getPrescriptionsForDoctor(String username);

	List<PrescriptionDTO> getPrescriptionsForPatient(String username);

}
