package com.hims.patient_care.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hims.patient_care.model.Speciality;
@Repository

public interface SpecialtyRepository extends JpaRepository<Speciality, Long>{

	Optional<Speciality> findByName(String specialization);

}
