package com.hims.patient_care.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hims.patient_care.model.DoctorVisit;
@Repository
public interface DoctorVisitRepository extends JpaRepository<DoctorVisit, Long>{

	List<DoctorVisit> findByDoctor_Id(Long doctorId);

}
