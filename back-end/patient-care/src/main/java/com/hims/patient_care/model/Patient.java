package com.hims.patient_care.model;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;

@Entity
@JsonIgnoreProperties({"doctors","familyVisits","appointments","guardian"})  
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    private Long id;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

//    @NotNull
//    private LocalDate dob;

    @NotNull
    private String gender;

    @NotNull
    private String contactNumber;

    @NotNull
    private String email;

    @NotNull
    private String address;

    @Lob
    @Column(name = "profile_picture")
    private byte[] patientImage;

    @NotNull
    private Double height;

    @NotNull
    private Double weight;

    @NotNull
    private String bloodPressure;

    @NotNull
    private Integer heartRate;

    @NotNull
    private Double temperature;

    private String allergies;
    private String previousDiseases;
    private String currentMedications;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToOne
    @JsonIgnore  
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private Users user;

    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY)
    @JsonBackReference("appointments-backref")
	private List<Appointment> appointments;
    
    @ManyToMany
    @JoinTable(
        name = "patient_doctor",
        joinColumns = @JoinColumn(name = "patient_id"),
        inverseJoinColumns = @JoinColumn(name = "doctor_id")
    )
    @JsonManagedReference  
    private Set<Doctor> doctors;

    private Boolean isResident; 

    private String roomNumber; 

    private String dietaryPreferences; 

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "guardian_id")
    private Guardian guardian;

    @ManyToMany
    @JoinTable(
        name = "resident_event",
        joinColumns = @JoinColumn(name = "resident_id"),
        inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    private Set<Event> preferredEvents; 
    
    @JsonBackReference("familyVisits-backref")
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<FamilyVisit> familyVisits;


    @ManyToMany(mappedBy = "patient")
    private List<Event> events = new ArrayList<>();
    
    @ManyToMany(mappedBy = "patient")
    private List<HousekeepingEvent> houseKeepingEvents = new ArrayList<>();
    
    public Patient() {
    }


    public byte[] getPatientImage() {
        return patientImage;
    }

    public void setPatientImage(byte[] patientImage) {
        this.patientImage = patientImage;
    }

    public Boolean getIsResident() {
        return isResident;
    }

    public void setIsResident(Boolean isResident) {
        this.isResident = isResident;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getDietaryPreferences() {
        return dietaryPreferences;
    }

    public void setDietaryPreferences(String dietaryPreferences) {
        this.dietaryPreferences = dietaryPreferences;
    }

    public Guardian getGuardian() {
        return guardian;
    }

    public void setGuardian(Guardian guardian) {
        this.guardian = guardian;
    }

    public Set<Event> getPreferredEvents() {
        return preferredEvents;
    }

    public void setPreferredEvents(Set<Event> preferredEvents) {
        this.preferredEvents = preferredEvents;
    }

    public List<FamilyVisit> getFamilyVisits() {
        return familyVisits;
    }

    public void setFamilyVisits(List<FamilyVisit> familyVisits) {
        this.familyVisits = familyVisits;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

//	public LocalDate getDob() {
//		return dob;
//	}
//
//	public void setDob(LocalDate dob) {
//		this.dob = dob;
//	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Double getHeight() {
		return height;
	}

	public void setHeight(Double height) {
		this.height = height;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public String getBloodPressure() {
		return bloodPressure;
	}

	public void setBloodPressure(String bloodPressure) {
		this.bloodPressure = bloodPressure;
	}

	public Integer getHeartRate() {
		return heartRate;
	}

	public void setHeartRate(Integer heartRate) {
		this.heartRate = heartRate;
	}

	public Double getTemperature() {
		return temperature;
	}

	public void setTemperature(Double temperature) {
		this.temperature = temperature;
	}

	public String getAllergies() {
		return allergies;
	}

	public void setAllergies(String allergies) {
		this.allergies = allergies;
	}

	public String getPreviousDiseases() {
		return previousDiseases;
	}

	public void setPreviousDiseases(String previousDiseases) {
		this.previousDiseases = previousDiseases;
	}

	public String getCurrentMedications() {
		return currentMedications;
	}

	public void setCurrentMedications(String currentMedications) {
		this.currentMedications = currentMedications;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}



	public List<Appointment> getAppointments() {
		return appointments;
	}


	public void setAppointments(List<Appointment> appointments) {
		this.appointments = appointments;
	}


	public Set<Doctor> getDoctors() {
		return doctors;
	}

	public void setDoctors(Set<Doctor> doctors) {
		this.doctors = doctors;
	}


	public List<Event> getEvents() {
		return events;
	}


	public void setEvents(List<Event> events) {
		this.events = events;
	}


	public List<HousekeepingEvent> getHouseKeepingEvents() {
		return houseKeepingEvents;
	}


	public void setHouseKeepingEvents(List<HousekeepingEvent> houseKeepingEvents) {
		this.houseKeepingEvents = houseKeepingEvents;
	}
	
}
