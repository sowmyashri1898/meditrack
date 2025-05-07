package com.hims.patient_care.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hims.patient_care.model.Symptom;
import com.hims.patient_care.repository.SymptomRepository;
import com.hims.patient_care.service.SymptomService;

@Service
public class SymptomServiceImpl implements SymptomService{

	@Autowired
	private SymptomRepository symptomRepository;
	
	@Override
	 public List<Symptom> getAllSymptoms() {
        return symptomRepository.findAll();  
    }

	@Override
	public Symptom saveSymptom(Symptom symptom) {
        return symptomRepository.save(symptom);
	}

	@Override
	public Symptom findSymptomById(Long symptomId) {
        return symptomRepository.findById(symptomId).orElse(null);  
	}

	@Override
	public List<Symptom> findByIdIn(List<Long> ids) {
		// TODO Auto-generated method stub
		return null;
	}

	
}
