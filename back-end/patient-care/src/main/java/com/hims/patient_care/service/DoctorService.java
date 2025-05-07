package com.hims.patient_care.service;

import java.io.IOException;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.hims.patient_care.dto.DoctorDTO;
import com.hims.patient_care.model.Doctor;
import com.hims.patient_care.model.Users;


public interface DoctorService {

	Doctor registerDoctor(DoctorDTO doctorRegistrationDTO, MultipartFile profilePicture) throws IOException;

	Doctor getDoctorDetails(Long doctorId);

	List<Doctor> findDoctorsBySymptoms(List<Long> symptomIds);

	Doctor getDoctorDetailsByUser(Users authenticatedUser);

	List<Doctor> getDoctorsBySpecialty(String specialty);

//	DoctorDTO getDoctorDetailsWithVisits(Long id);


}
