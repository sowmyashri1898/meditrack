package com.hims.patient_care.service;

import java.util.List;

import com.hims.patient_care.dto.EventDTO;
import com.hims.patient_care.model.Event;

public interface EventService {

	Event createEvent(EventDTO eventDTO);

	Event updateEvent(Long id, EventDTO eventDTO);

	void deleteEvent(Long id);

	Event getEventById(Long id);

	List<Event> getAllEvents();

	String joinEvent(Long id, Long userId);

	List<Event> getSimilarEvents(Long id);

}
