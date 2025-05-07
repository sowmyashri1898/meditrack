package com.hims.patient_care.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hims.patient_care.model.DoctorVisit;
import com.hims.patient_care.repository.DoctorVisitRepository;
import com.hims.patient_care.service.DoctorVisitService;
@Service

public class DoctorVisitServiceImpl implements  DoctorVisitService{

	@Autowired
    private DoctorVisitRepository doctorVisitRepository;

    public List<DoctorVisit> getVisitsByDoctorId(Long doctorId) {
        return doctorVisitRepository.findByDoctor_Id(doctorId);
    }

    public DoctorVisit createVisit(DoctorVisit visit) {
        return doctorVisitRepository.save(visit);
    }

	
}
