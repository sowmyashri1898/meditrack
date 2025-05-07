package com.hims.patient_care.dto;

import java.util.Date;
import java.util.List;

public class EventDTO {
	private Long id;
    private String eventName;
    private String description;
    private List<String> tags;
    private Date startTime;
    private Date endTime;
    private String category;
    private String accessOptions;
    private List<String> notificationPreferences;
    private Boolean rsvpRequired;
    private Integer participantLimit;
    private List<Long> patientIds;
    private List<Long> guardianIds;
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
	public List<Long> getPatientIds() {
		return patientIds;
	}
	public void setPatientIds(List<Long> patientIds) {
		this.patientIds = patientIds;
	}
	public List<Long> getGuardianIds() {
		return guardianIds;
	}
	public void setGuardianIds(List<Long> guardianIds) {
		this.guardianIds = guardianIds;
	}
	public boolean isActive() {
		return isActive;
	}
	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
    
    
}
