package com.hims.patient_care.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class FamilyVisit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String visitType;

    @Column(length = 500)
    private String visitDetails;

    private LocalDateTime visitDate;

    private boolean isOnline;
    
    private String zoomLink;


    @ManyToOne    
    @JsonManagedReference("familyVisits-backref")
 
//    @JoinColumn(name = "patient_id")
    private Patient patient; 

    @JsonIgnore 
    @ManyToOne
    @JoinColumn(name = "guardian_id", nullable = true)
    private Guardian guardian; // Optional, guardian scheduling visit

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

	

	public String getZoomLink() {
		return zoomLink;
	}

	public void setZoomLink(String zoomLink) {
		this.zoomLink = zoomLink;
	}

	public FamilyVisit() {
        // Initialize with default values if needed
    }

	public FamilyVisit(Long id, String visitType, String visitDetails, LocalDateTime visitDate, boolean isOnline,
			String zoomLink, Patient patient, Guardian guardian) {
		super();
		this.id = id;
		this.visitType = visitType;
		this.visitDetails = visitDetails;
		this.visitDate = visitDate;
		this.isOnline = isOnline;
		this.zoomLink = zoomLink;
		this.patient = patient;
		this.guardian = guardian;
	}
	
}

