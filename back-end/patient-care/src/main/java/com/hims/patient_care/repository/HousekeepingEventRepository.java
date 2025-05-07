package com.hims.patient_care.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hims.patient_care.model.HousekeepingEvent;

@Repository
public interface HousekeepingEventRepository extends JpaRepository<HousekeepingEvent, Long>{

	List<HousekeepingEvent> findByPatientId(Long patientId);

	List<HousekeepingEvent> findByServiceType(String serviceType);

	

}
