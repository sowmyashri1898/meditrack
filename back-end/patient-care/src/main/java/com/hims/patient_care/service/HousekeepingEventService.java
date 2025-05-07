package com.hims.patient_care.service;

import java.util.List;


import com.hims.patient_care.dto.HousekeepingEventDTO;
import com.hims.patient_care.model.HousekeepingEvent;

public interface HousekeepingEventService {

	void deleteHousekeepingEvent(Long id);

	HousekeepingEventDTO updateHousekeepingEvent(Long id, HousekeepingEventDTO eventDTO);

	List<HousekeepingEventDTO> getAllHousekeepingEvents();

	HousekeepingEventDTO createHousekeepingEvent(HousekeepingEventDTO eventDTO);

	List<HousekeepingEventDTO> getHousekeepingEventsByServiceType(String serviceType);

	List<HousekeepingEventDTO> getHousekeepingEventsByPatient(Long patientId);

	HousekeepingEvent getEventById(Long id);

}
