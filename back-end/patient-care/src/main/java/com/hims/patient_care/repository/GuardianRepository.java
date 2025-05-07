package com.hims.patient_care.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hims.patient_care.model.Guardian;
import com.hims.patient_care.model.Users;

@Repository
public interface GuardianRepository extends JpaRepository<Guardian, Long>{

    Guardian findByUser(Users user); 

}
