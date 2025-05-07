package com.hims.patient_care.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hims.patient_care.model.Patient;

import lombok.Data;

@Data
public class FamilyVisitRequestDTO {
    private String visitType;
    private String visitDetails;
    private LocalDateTime visitDate;
    private boolean isOnline;
    private String zoomLink;
    @JsonManagedReference("familyVisits-backref")
    private Patient patient;

   
	public String getVisitType() {
		return visitType;
	}
	public void setVisitType(String visitType) {
		this.visitType = visitType;
	}
	public String getVisitDetails() {
		return visitDetails;
	}
	public void setVisitDetails(String visitDetails) {
		this.visitDetails = visitDetails;
	}
	public LocalDateTime getVisitDate() {
		return visitDate;
	}
	public void setVisitDate(LocalDateTime visitDate) {
		this.visitDate = visitDate;
	}
	public boolean isOnline() {
		return isOnline;
	}
	public void setOnline(boolean isOnline) {
		this.isOnline = isOnline;
	}
	
	
	public Patient getPatient() {
		return patient;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	public String getZoomLink() {
		return zoomLink;
	}
	public void setZoomLink(String zoomLink) {
		this.zoomLink = zoomLink;
	}
    
}

