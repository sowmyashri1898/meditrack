package com.hims.patient_care.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hims.patient_care.model.HealthcareUser;
@Repository
public interface HealthcareUserRepository extends JpaRepository<HealthcareUser, Long>{
	@Query("SELECT h FROM HealthcareUser h JOIN h.symptoms s WHERE s.id = :symptomId")
	List<HealthcareUser> findHealthcareUsersBySymptomId(@Param("symptomId") Long symptomId);

}
