package com.hims.patient_care.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hims.patient_care.dto.EventDTO;
import com.hims.patient_care.model.Event;
import com.hims.patient_care.service.EventService;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:4200")

public class EventController {
	 private final EventService eventService;

	    public EventController(EventService eventService) {
	        this.eventService = eventService;
	    }

	    @PreAuthorize("hasRole('ADMIN')")
	    @PostMapping("/create")
	    public Event createEvent(@RequestBody EventDTO eventDTO) {
	        return eventService.createEvent(eventDTO);
	    }

	    @PreAuthorize("hasRole('ADMIN')")
	    @PutMapping("/update/{id}")
	    public Event updateEvent(@PathVariable Long id, @RequestBody EventDTO eventDTO) {
	        return eventService.updateEvent(id, eventDTO);
	    }

	    @PreAuthorize("hasRole('ADMIN')")
	    @DeleteMapping("/delete/{id}")
	    public void deleteEvent(@PathVariable Long id) {
	        eventService.deleteEvent(id);
	    }

	    @PreAuthorize("hasAnyRole('ADMIN', 'PATIENT', 'GUARDIAN')")
	    @GetMapping
	    public List<Event> getAllEvents() {
	        return eventService.getAllEvents();
	    }

	    @PreAuthorize("hasAnyRole('ADMIN', 'PATIENT', 'GUARDIAN')")
	    @GetMapping("/{id}")
	    public Event getEventById(@PathVariable Long id) {
	        return eventService.getEventById(id);
	    }

	    @PreAuthorize("hasAnyRole('PATIENT', 'GUARDIAN')")
	    @PostMapping("/{id}/join")
	    public String joinEvent(@PathVariable Long id, @RequestBody Long userId) {
	        return eventService.joinEvent(id, userId);
	    }

	    @PreAuthorize("hasAnyRole('PATIENT', 'GUARDIAN')")
	    @GetMapping("/{id}/similar")
	    public List<Event> getSimilarEvents(@PathVariable Long id) {
	        return eventService.getSimilarEvents(id);
	    }

}
