package com.hims.patient_care.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
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

import com.hims.patient_care.dto.HousekeepingEventDTO;
import com.hims.patient_care.model.HousekeepingEvent;
import com.hims.patient_care.service.HousekeepingEventService;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/housekeeping-events")
public class HousekeepingEventController {
	

	    @Autowired
	    private HousekeepingEventService housekeepingEventService;

	    @GetMapping("/all")
	    public List<HousekeepingEventDTO> getAllHousekeepingEvents() {
	        return housekeepingEventService.getAllHousekeepingEvents();
	    }
	    
	    @PreAuthorize("hasAnyRole('ADMIN', 'PATIENT', 'GUARDIAN')")
	    @GetMapping("/patient/{patientId}")
	    public List<HousekeepingEventDTO> getHousekeepingEventsByPatient(@PathVariable Long patientId) {
	        return housekeepingEventService.getHousekeepingEventsByPatient(patientId);
	    }

	    @GetMapping("/service-type/{serviceType}")
	    public List<HousekeepingEventDTO> getHousekeepingEventsByServiceType(@PathVariable String serviceType) {
	        return housekeepingEventService.getHousekeepingEventsByServiceType(serviceType);
	    }
	    
	    @PreAuthorize("hasRole('ADMIN')")
	    @PostMapping("/create")
	    public HousekeepingEventDTO createHousekeepingEvent(@RequestBody HousekeepingEventDTO eventDTO) {
	        return housekeepingEventService.createHousekeepingEvent(eventDTO);
	    }

	    @PreAuthorize("hasRole('ADMIN')")
	    @PutMapping("/update/{id}")
	    public HousekeepingEventDTO updateHousekeepingEvent(@PathVariable Long id, @RequestBody HousekeepingEventDTO eventDTO) {
	        return housekeepingEventService.updateHousekeepingEvent(id, eventDTO);
	    }
	    
	    @PreAuthorize("hasRole('ADMIN')")
	    @DeleteMapping("/delete/{id}")
	    public void deleteHousekeepingEvent(@PathVariable Long id) {
	        housekeepingEventService.deleteHousekeepingEvent(id);
	    }
	
	    @PreAuthorize("hasAnyRole('ADMIN', 'PATIENT', 'GUARDIAN')")
	    @GetMapping("/{id}")
	    public HousekeepingEvent getEventById(@PathVariable Long id) {
	        return housekeepingEventService.getEventById(id);
	    }
}
