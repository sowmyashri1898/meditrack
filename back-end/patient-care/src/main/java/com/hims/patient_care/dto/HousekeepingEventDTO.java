package com.hims.patient_care.dto;


import java.util.Date;
import java.util.List;

public class HousekeepingEventDTO {

    private Long id;
    private List<Long> patientIds;
    private String serviceType;  // Cleaning, Maintenance, Laundry, Gardening
    private Date startTime;
    private Date endTime;
    private String frequency;  // One-time, Recurring
    private String residentRoomDetails;  // Room #101 - John Doe
    private String commonArea;  // Dining Hall
    private String specialRequests;  // Notes like eco-friendly, deep cleaning
    private String priorityLevel;  // Urgent, Scheduled, Routine
    private String supervisor;  // Assigned staff
    private String checklist; 
    private boolean isActive = true; // Default value

    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public List<Long> getPatientIds() {
		return patientIds;
	}
	public void setPatientIds(List<Long> patientIds) {
		this.patientIds = patientIds;
	}
	public String getServiceType() {
		return serviceType;
	}
	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
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
	public String getFrequency() {
		return frequency;
	}
	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}
	public String getResidentRoomDetails() {
		return residentRoomDetails;
	}
	public void setResidentRoomDetails(String residentRoomDetails) {
		this.residentRoomDetails = residentRoomDetails;
	}
	public String getCommonArea() {
		return commonArea;
	}
	public void setCommonArea(String commonArea) {
		this.commonArea = commonArea;
	}
	public String getSpecialRequests() {
		return specialRequests;
	}
	public void setSpecialRequests(String specialRequests) {
		this.specialRequests = specialRequests;
	}
	public String getPriorityLevel() {
		return priorityLevel;
	}
	public void setPriorityLevel(String priorityLevel) {
		this.priorityLevel = priorityLevel;
	}
	public String getSupervisor() {
		return supervisor;
	}
	public void setSupervisor(String supervisor) {
		this.supervisor = supervisor;
	}
	public String getChecklist() {
		return checklist;
	}
	public void setChecklist(String checklist) {
		this.checklist = checklist;
	}
	public boolean isActive() {
		return isActive;
	}
	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}


}

