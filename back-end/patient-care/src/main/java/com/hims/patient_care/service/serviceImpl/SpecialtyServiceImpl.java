package com.hims.patient_care.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hims.patient_care.model.Speciality;
import com.hims.patient_care.repository.SpecialtyRepository;
import com.hims.patient_care.service.SpecialtyService;

@Service
public class SpecialtyServiceImpl implements SpecialtyService {

	@Autowired
    private SpecialtyRepository specialtyRepository;

    public List<Speciality> getAllSpecialties() {
        return specialtyRepository.findAll();
    }

}
