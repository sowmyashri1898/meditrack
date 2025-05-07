package com.hims.patient_care.service.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hims.patient_care.dto.EventDTO;
import com.hims.patient_care.exception.ResourceNotFoundException;
import com.hims.patient_care.model.Event;
import com.hims.patient_care.repository.EventRepository;
import com.hims.patient_care.service.EventService;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public Event createEvent(EventDTO eventDTO) {
        Event event = new Event();
        event.setEventName(eventDTO.getEventName());
        event.setDescription(eventDTO.getDescription());
        event.setCategory(eventDTO.getCategory());
        event.setTags(eventDTO.getTags());
        event.setStartTime(eventDTO.getStartTime());
        event.setEndTime(eventDTO.getEndTime());
        event.setAccessOptions(eventDTO.getAccessOptions());
        event.setNotificationPreferences(eventDTO.getNotificationPreferences());
        event.setRsvpRequired(eventDTO.getRsvpRequired());
        event.setParticipantLimit(eventDTO.getParticipantLimit());
        event.setActive(true);
        return eventRepository.save(event);
    }

    @Override
    public Event updateEvent(Long id, EventDTO eventDTO) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        event.setEventName(eventDTO.getEventName());
        event.setDescription(eventDTO.getDescription());
        event.setCategory(eventDTO.getCategory());
        event.setTags(eventDTO.getTags());
        event.setStartTime(eventDTO.getStartTime());
        event.setEndTime(eventDTO.getEndTime());
        event.setAccessOptions(eventDTO.getAccessOptions());
        event.setNotificationPreferences(eventDTO.getNotificationPreferences());
        event.setRsvpRequired(eventDTO.getRsvpRequired());
        event.setParticipantLimit(eventDTO.getParticipantLimit());
        event.setActive(true);
        return eventRepository.save(event);
    }

    @Override
    public void deleteEvent(Long id) {
    	Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
            event.setActive(false); // Mark as inactive
            eventRepository.save(event);
    }

    @Override
    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public String joinEvent(Long id, Long userId) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        if (event.getParticipantLimit() != null && event.getParticipantLimit() > 0) {
            long currentParticipants = event.getPatient().size() + event.getGuardians().size();
            if (currentParticipants >= event.getParticipantLimit()) {
                return "Event is full. Cannot join.";
            }
        }

        return "User with ID " + userId + " successfully joined event: " + event.getEventName();
    }

    @Override
    public List<Event> getSimilarEvents(Long id) {
        Event currentEvent = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        String category = currentEvent.getCategory();

        return eventRepository.findAll().stream()
                .filter(event -> event.getCategory().equalsIgnoreCase(category) && !event.getId().equals(id))
                .collect(Collectors.toList());
    }
}
