package com.hims.patient_care.dto;

import java.time.LocalDateTime;

import com.hims.patient_care.model.Guardian;
import com.hims.patient_care.model.Patient;

import lombok.Data;

@Data
public class FamilyVisitResponseDTO {
    private Long id;
    private String visitType;
    private String visitDetails;
    private LocalDateTime visitDate;
    private boolean isOnline;
    private Patient patient;
    private Guardian guardian;
    private String zoomLink;
	
    
	
	public Patient getPatient() {
		return patient;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	public Guardian getGuardian() {
		return guardian;
	}
	public void setGuardian(Guardian guardian) {
		this.guardian = guardian;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
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

	
	public String getZoomLink() {
		return zoomLink;
	}
	public void setZoomLink(String zoomLink) {
		this.zoomLink = zoomLink;
	}
    
    
}

