package com.hims.patient_care.service.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hims.patient_care.model.Guardian;
import com.hims.patient_care.model.Users;
import com.hims.patient_care.repository.GuardianRepository;
import com.hims.patient_care.service.GuardianService;

@Service
public class GuardianServiceImpl implements GuardianService{
	  @Autowired
	    private GuardianRepository guardianRepository;

	    public Guardian saveGuardian(Guardian guardian) {
	        return guardianRepository.save(guardian);
	    }

	    public Guardian getGuardianByUser(Users user) {
	        return guardianRepository.findByUser(user);
	    }

	    public Guardian getGuardianById(Long guardianId) {
	        return guardianRepository.findById(guardianId).orElse(null);
	    }

}
