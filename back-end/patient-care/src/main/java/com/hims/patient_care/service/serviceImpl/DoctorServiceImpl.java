package com.hims.patient_care.service.serviceImpl;

import java.io.IOException;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hims.patient_care.dto.DoctorDTO;
import com.hims.patient_care.model.Doctor;
import com.hims.patient_care.model.Symptom;
import com.hims.patient_care.model.Users;
import com.hims.patient_care.repository.DoctorRepository;

import com.hims.patient_care.service.DoctorService;
import com.hims.patient_care.service.UserService;


@Service
public class DoctorServiceImpl implements DoctorService {

	@Autowired
	private DoctorRepository doctorRepository;

	
	@Autowired
	private UserService userService;

	@Override
	public Doctor getDoctorDetails(Long doctorId) {
		Optional<Doctor> doctor = doctorRepository.findById(doctorId);
		if (doctor.isPresent()) {
			return doctor.get();
		} else {
			throw new RuntimeException("Doctor with ID " + doctorId + " not found.");
		}

	}

	@Override
	public Doctor registerDoctor(DoctorDTO doctorDTO, MultipartFile profilePicture) throws IOException {
	    String username = SecurityContextHolder.getContext().getAuthentication().getName();

	    Optional<Doctor> existingDoctorOptional = doctorRepository.findByEmail(doctorDTO.getEmail());
//	    Optional<Speciality> specialtyOptional = this.SpecialtyRepository.findByName(doctorDTO.getSpecialization());
//        if (!specialtyOptional.isPresent()) {
//            throw new RuntimeException("Specialty not found.");
//        }

//        Speciality specialty = specialtyOptional.get();
	    Doctor doctor;
	    if (existingDoctorOptional.isPresent()) {
	        doctor = existingDoctorOptional.get();
	        if (profilePicture != null && !profilePicture.isEmpty()) {
	            doctor.setProfilePicture(profilePicture.getBytes());
	            doctor.setFirstName(doctorDTO.getFirstName());
	    	    doctor.setLastName(doctorDTO.getLastName());
	    	    doctor.setSpeciality(doctorDTO.getSpecialization()); // Ensure this is only set once
	    	    doctor.setExperienceYears(doctorDTO.getExperienceYears());
	    	    doctor.setPhoneNumber(doctorDTO.getPhoneNumber());
	    	    doctor.setAddress(doctorDTO.getAddress());
	    	    doctor.setDob(doctorDTO.getDob());
	    	    doctor.setGender(doctorDTO.getGender());
	    	    doctor.setHospitalName(doctorDTO.getHospitalName());
	    	    doctor.setLocation(doctorDTO.getLocation());
	    	    doctor.setAvailable(doctorDTO.isAvailable());
	    	    doctor.setStatus(doctorDTO.getStatus());
	    	    doctor.setEmail(doctorDTO.getEmail());
	    	    doctor.setAvailableSlots(doctorDTO.getAvailableSlots());
	        }
	    } else {
	        if (doctorRepository.existsByEmail(doctorDTO.getEmail())) {
	            throw new RuntimeException("A doctor with this email is already registered.");
	        }

	        Users authenticatedUser = userService.getAuthenticatedUserByUsername(username);
	        doctor = new Doctor();
	        if (profilePicture != null && !profilePicture.isEmpty()) {
	            doctor.setProfilePicture(profilePicture.getBytes());
	        }
	        doctor.setUser(authenticatedUser);
	    }

	    // Set doctor fields from the DTO
	    doctor.setFirstName(doctorDTO.getFirstName());
	    doctor.setLastName(doctorDTO.getLastName());
	    doctor.setSpeciality(doctorDTO.getSpecialization());
//	    doctor.setSpeciality(specialtyOptional.get()); // Ensure this is only set once
	    doctor.setExperienceYears(doctorDTO.getExperienceYears());
	    doctor.setPhoneNumber(doctorDTO.getPhoneNumber());
	    doctor.setAddress(doctorDTO.getAddress());
	    doctor.setDob(doctorDTO.getDob());
	    doctor.setGender(doctorDTO.getGender());
	    doctor.setHospitalName(doctorDTO.getHospitalName());
	    doctor.setLocation(doctorDTO.getLocation());
	    doctor.setAvailable(doctorDTO.isAvailable());
	    doctor.setStatus(doctorDTO.getStatus());
	    doctor.setEmail(doctorDTO.getEmail());
        doctor.setAvailableSlots(doctorDTO.getAvailableSlots());
	    return doctorRepository.save(doctor);
	}


	@Override
	public List<Doctor> findDoctorsBySymptoms(List<Long> symptomIds) {
		List<Doctor> doctors = doctorRepository.findAll();
		return doctors.stream().filter(doctor -> doctor.getSymptoms().stream().map(Symptom::getId)
				.collect(Collectors.toList()).containsAll(symptomIds)).collect(Collectors.toList());

	}

	@Override
	public Doctor getDoctorDetailsByUser(Users authenticatedUser) {
		return doctorRepository.findByUser(authenticatedUser).orElse(null);
	}

	public List<Doctor> getDoctorsBySpecialty(String specialty) {
		return doctorRepository.findAll().stream().filter(doctor -> doctor.getSpeciality().equalsIgnoreCase(specialty))
				.collect(Collectors.toList());
	}

//	@Override
//	 public DoctorDTO getDoctorDetailsWithVisits(Long doctorId) {
//        Doctor doctor = doctorRepository.findById(doctorId)
//                .orElseThrow(() -> new RuntimeException("Doctor not found"));
//
//        // Manually convert Doctor to DoctorDTO
//        DoctorDTO doctorDTO = new DoctorDTO();
//        doctorDTO.setId(doctor.getId());
//        doctorDTO.setFirstName(doctor.getFirstName());
//        doctorDTO.setLastName(doctor.getLastName());
//        doctorDTO.setSpecialization(doctor.getSpeciality());
//        doctorDTO.setExperienceYears(doctor.getExperienceYears());
//        doctorDTO.setEmail(doctor.getEmail());
//        doctorDTO.setPhoneNumber(doctor.getPhoneNumber());
//        doctorDTO.setAddress(doctor.getAddress());
//        doctorDTO.setDob(doctor.getDob());
//        doctorDTO.setGender(doctor.getGender());
//        doctorDTO.setHospitalName(doctor.getHospitalName());
//        doctorDTO.setLocation(doctor.getLocation());
//        doctorDTO.setAvailable(doctor.isAvailable());
//        doctorDTO.setStatus(doctor.getStatus());
//
//        List<DoctorVisitDTO> visits = doctor.getVisits().stream().map(visit -> {
//            DoctorVisitDTO visitDTO = new DoctorVisitDTO();
//            visitDTO.setVisitId(visit.getVisitId());
//            visitDTO.setVisitDate(visit.getVisitDate());
////            visitDTO.setTime(visit.getTime());
//            visitDTO.setPatientName(visit.getPatientName());
//            visitDTO.setPurpose(visit.getPurpose());
//            visitDTO.setStatus(visit.getStatus());
//            return visitDTO;
//        }).collect(Collectors.toList());
//        doctorDTO.setDoctorVisits(visits);
//
//        return doctorDTO;
//    }
}


//	public List<Doctor> getDoctorsBySpecialty(String specialtyName) {
//	    return doctorRepository.findAll().stream()
//	            .filter(doctor -> doctor.getSpeciality() != null && 
//	                    doctor.getSpeciality().getName().equalsIgnoreCase(specialtyName))
//	            .collect(Collectors.toList());
//	}



