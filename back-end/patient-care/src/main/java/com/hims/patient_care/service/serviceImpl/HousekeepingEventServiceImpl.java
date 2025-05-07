package com.hims.patient_care.service.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hims.patient_care.dto.HousekeepingEventDTO;
import com.hims.patient_care.exception.ResourceNotFoundException;
import com.hims.patient_care.model.Event;
import com.hims.patient_care.model.HousekeepingEvent;
import com.hims.patient_care.repository.HousekeepingEventRepository;
import com.hims.patient_care.repository.PatientRepository;
import com.hims.patient_care.service.HousekeepingEventService;

@Service
public class HousekeepingEventServiceImpl implements HousekeepingEventService {

    @Autowired
    private HousekeepingEventRepository housekeepingEventRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public List<HousekeepingEventDTO> getAllHousekeepingEvents() {
        return housekeepingEventRepository.findAll().stream()
            .map(this::convertToDTO)  // Convert HousekeepingEvent to HousekeepingEventDTO
            .collect(Collectors.toList());
    }

    @Override
    public List<HousekeepingEventDTO> getHousekeepingEventsByPatient(Long patientId) {
        List<HousekeepingEvent> events = housekeepingEventRepository.findByPatientId(patientId);
        List<HousekeepingEventDTO> eventDTOs = new ArrayList<>();
        for (HousekeepingEvent event : events) {
            eventDTOs.add(convertToDTO(event));
        }
        return eventDTOs;
    }

    @Override
    public List<HousekeepingEventDTO> getHousekeepingEventsByServiceType(String serviceType) {
        List<HousekeepingEvent> events = housekeepingEventRepository.findByServiceType(serviceType);
        List<HousekeepingEventDTO> eventDTOs = new ArrayList<>();
        for (HousekeepingEvent event : events) {
            eventDTOs.add(convertToDTO(event));
        }
        return eventDTOs;
    }


    @Override
    public HousekeepingEventDTO createHousekeepingEvent(HousekeepingEventDTO eventDTO) {
        HousekeepingEvent event = new HousekeepingEvent();
//        event.setPatient(patientRepository.findById(eventDTO.getPatientId()).orElseThrow());
        event.setServiceType(eventDTO.getServiceType());
        event.setStartTime(eventDTO.getStartTime());
        event.setEndTime(eventDTO.getEndTime());
        event.setFrequency(eventDTO.getFrequency());
        event.setResidentRoomDetails(eventDTO.getResidentRoomDetails());
        event.setCommonArea(eventDTO.getCommonArea());
        event.setSpecialRequests(eventDTO.getSpecialRequests());
        event.setPriorityLevel(eventDTO.getPriorityLevel());
        event.setSupervisor(eventDTO.getSupervisor());
        event.setChecklist(eventDTO.getChecklist());
        event.setActive(true);
        housekeepingEventRepository.save(event);

        // Call convertToDTO with HousekeepingEvent object (not HousekeepingEventDTO)
        return convertToDTO(event);  
    }

    @Override
    public HousekeepingEventDTO updateHousekeepingEvent(Long eventId, HousekeepingEventDTO eventDTO) {
        HousekeepingEvent event = housekeepingEventRepository.findById(eventId).orElseThrow();
        event.setServiceType(eventDTO.getServiceType());
        event.setStartTime(eventDTO.getStartTime());
        event.setEndTime(eventDTO.getEndTime());
        event.setFrequency(eventDTO.getFrequency());
        event.setResidentRoomDetails(eventDTO.getResidentRoomDetails());
        event.setCommonArea(eventDTO.getCommonArea());
        event.setSpecialRequests(eventDTO.getSpecialRequests());
        event.setPriorityLevel(eventDTO.getPriorityLevel());
        event.setSupervisor(eventDTO.getSupervisor());
        event.setChecklist(eventDTO.getChecklist());
        event.setActive(true);

        housekeepingEventRepository.save(event);

        // Call convertToDTO with HousekeepingEvent object (not HousekeepingEventDTO)
        return convertToDTO(event);  // Convert HousekeepingEvent to HousekeepingEventDTO
    }

    @Override
    public void deleteHousekeepingEvent(Long id) {
   
    	HousekeepingEvent event = housekeepingEventRepository.findById(id)
    	                .orElseThrow(() -> new RuntimeException("Event not found"));
    	            event.setActive(false); 
    	            housekeepingEventRepository.save(event);
    	    }
    

    private HousekeepingEventDTO convertToDTO(HousekeepingEvent event) {
        HousekeepingEventDTO dto = new HousekeepingEventDTO();
        dto.setId(event.getId());
//        dto.setPatientId(event.getPatient().getId());  // Linking patient ID
        dto.setServiceType(event.getServiceType());
        dto.setStartTime(event.getStartTime());
        dto.setEndTime(event.getEndTime());
        dto.setFrequency(event.getFrequency());
        dto.setResidentRoomDetails(event.getResidentRoomDetails());
        dto.setCommonArea(event.getCommonArea());
        dto.setSpecialRequests(event.getSpecialRequests());
        dto.setPriorityLevel(event.getPriorityLevel());
        dto.setSupervisor(event.getSupervisor());
        dto.setChecklist(event.getChecklist());
        dto.setActive(event.isActive());  // Ensure the correct value is being mapped
        return dto;
    }
    @Override
    public HousekeepingEvent getEventById(Long id) {
        return housekeepingEventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
    }
}
