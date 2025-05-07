package com.hims.patient_care.model;



import java.util.ArrayList;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "guardian")
public class Guardian {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "guardian_id")
    private Long id;

    @NotNull
    private String guardianFirstName;

    @NotNull
    private String guardianLastName;

    @NotNull
    private String phoneNumber;

    @NotNull
    private String guardianEmail;

    private String relationship;

    @ManyToOne
    @JoinColumn(name = "user_id")  
    private Users user;
    
    @JsonIgnore 
    @OneToMany(mappedBy = "guardian", cascade = CascadeType.ALL)
    private List<Patient> patients;
    
    @OneToMany(mappedBy = "guardian", cascade = CascadeType.ALL)
    private List<FamilyVisit> familyVisits;

    @ManyToMany(mappedBy = "guardians")
    private List<Event> events = new ArrayList<>();
    
    
    public Guardian() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

   

   

    public String getGuardianFirstName() {
		return guardianFirstName;
	}

	public void setGuardianFirstName(String guardianFirstName) {
		this.guardianFirstName = guardianFirstName;
	}

	public String getGuardianLastName() {
		return guardianLastName;
	}

	public void setGuardianLastName(String guardianLastName) {
		this.guardianLastName = guardianLastName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	

    public String getGuardianEmail() {
		return guardianEmail;
	}

	public void setGuardianEmail(String guardianEmail) {
		this.guardianEmail = guardianEmail;
	}

	public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }



	public List<Patient> getPatients() {
		return patients;
	}

	public void setPatients(List<Patient> patients) {
		this.patients = patients;
	}

	public List<FamilyVisit> getFamilyVisits() {
		return familyVisits;
	}

	public void setFamilyVisits(List<FamilyVisit> familyVisits) {
		this.familyVisits = familyVisits;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public List<Event> getEvents() {
		return events;
	}

	public void setEvents(List<Event> events) {
		this.events = events;
	}



	

 
}

