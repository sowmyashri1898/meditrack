package com.hims.patient_care.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hims.patient_care.model.Doctor;
import com.hims.patient_care.model.Users;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long>{

	boolean existsByEmail(String loggedInEmail);

	Optional<Doctor> findByUser(Users authenticatedUser);

	Optional<Doctor> findByEmail(String email);	
	


}
