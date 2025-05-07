package com.hims.patient_care.service;

import java.util.List;

import com.hims.patient_care.model.Symptom;

public interface SymptomService {

	List<Symptom> getAllSymptoms();

	Symptom saveSymptom(Symptom symptom);

	Symptom findSymptomById(Long symptomId);

	List<Symptom> findByIdIn(List<Long> ids);


}
