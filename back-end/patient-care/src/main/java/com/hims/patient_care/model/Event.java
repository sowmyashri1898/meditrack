package com.hims.patient_care.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventName;
    private String description;

    @ElementCollection
    private List<String> tags;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startTime;

    @Temporal(TemporalType.TIMESTAMP)
    private Date endTime;

    private String category; 

    private String accessOptions; 

    @ElementCollection
    private List<String> notificationPreferences; 

    private Boolean rsvpRequired; 
    private Integer participantLimit; 

    @ManyToMany
    @JoinTable(
        name = "event_patient",
        joinColumns = @JoinColumn(name = "event_id"),
        inverseJoinColumns = @JoinColumn(name = "patient_id")
    )
    private List<Patient> patient = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "event_guardians",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "guardian_id")
        )
    private List<Guardian> guardians = new ArrayList<>();
    private boolean isActive = true; // Default value

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getAccessOptions() {
		return accessOptions;
	}

	public void setAccessOptions(String accessOptions) {
		this.accessOptions = accessOptions;
	}

	public List<String> getNotificationPreferences() {
		return notificationPreferences;
	}

	public void setNotificationPreferences(List<String> notificationPreferences) {
		this.notificationPreferences = notificationPreferences;
	}

	public Boolean getRsvpRequired() {
		return rsvpRequired;
	}

	public void setRsvpRequired(Boolean rsvpRequired) {
		this.rsvpRequired = rsvpRequired;
	}

	public Integer getParticipantLimit() {
		return participantLimit;
	}

	public void setParticipantLimit(Integer participantLimit) {
		this.participantLimit = participantLimit;
	}

	public List<Patient> getPatient() {
		return patient;
	}

	public void setPatient(List<Patient> patient) {
		this.patient = patient;
	}

	public List<Guardian> getGuardians() {
		return guardians;
	}

	public void setGuardians(List<Guardian> guardians) {
		this.guardians = guardians;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
    
    
}
