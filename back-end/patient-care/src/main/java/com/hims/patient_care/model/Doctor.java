package com.hims.patient_care.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hims.patient_care.enums.UserStatus;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "doctors")

public class Doctor {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "doctor_id")
	private Long id;

	@OneToOne
    @JsonIgnore  

	@JoinColumn(name = "user_id", nullable = false, unique = true)
	private Users user; 
	
//    @ManyToOne
//    @JoinColumn(name = "speciality_id", nullable = false)
//
//    private Speciality speciality;
	@Column(name="specialization")
private String speciality;
	   
	@Column(name = "experience_years")
	private int experienceYears;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "doctor_symptoms", joinColumns = @JoinColumn(name = "doctor_id"), inverseJoinColumns = @JoinColumn(name = "symptom_id"))
	private List<Symptom> symptoms; // List of symptoms the doctor can treat

	@OneToMany(mappedBy = "doctor", fetch = FetchType.LAZY)
	@JsonBackReference
	private List<Appointment> appointments; // List of appointments the doctor has

	@Column(name = "email", unique = true)
	private String email;

	@Column(name = "phone_number")
	private String phoneNumber;

	@Column(name = "address")
	private String address;

	@Column(name = "dob")
	private LocalDate dob;

	@Column(name = "gender")
	private String gender;
	@Lob
	@Column(name = "profile_picture")
	private byte[] profilePicture;

	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private UserStatus status;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "hospital_name")
	private String hospitalName;

	@Column(name = "location")
	private String location; // Location of the doctor's practice
	@Column(name = "available_status")
	private boolean available;
	
	@ElementCollection
    @CollectionTable(name = "doctor_available_slots", joinColumns = @JoinColumn(name = "doctor_id"))
    @Column(name = "available_slot")
    private List<LocalDateTime> availableSlots;
	@ManyToMany(mappedBy = "doctors")
    @JsonIgnore  // Prevents circular reference in doctor-patient relationship
    private Set<Patient> patients;
//	@OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
//	@JsonBackReference
//	private List<DoctorVisit> visits;
//
//	// Getters and Setters
//	public List<DoctorVisit> getVisits() {
//	    return visits;
//	}
//
//	public void setVisits(List<DoctorVisit> visits) {
//	    this.visits = visits;
//	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}



//	public Speciality getSpeciality() {
//		return speciality;
//	}
//
//	public void setSpeciality(Speciality speciality) {
//		this.speciality = speciality;
//	}

	public String getSpeciality() {
		return speciality;
	}

	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}

	public int getExperienceYears() {
		return experienceYears;
	}

	public void setExperienceYears(int experienceYears) {
		this.experienceYears = experienceYears;
	}

	public List<Symptom> getSymptoms() {
		return symptoms;
	}

	public void setSymptoms(List<Symptom> symptoms) {
		this.symptoms = symptoms;
	}

	public List<Appointment> getAppointments() {
		return appointments;
	}

	public void setAppointments(List<Appointment> appointments) {
		this.appointments = appointments;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public byte[] getProfilePicture() {
		return profilePicture;
	}

	public Set<Patient> getPatients() {
		return patients;
	}

	public void setPatients(Set<Patient> patients) {
		this.patients = patients;
	}

	public void setProfilePicture(byte[] profilePicture) {
		this.profilePicture = profilePicture;
	}

	public UserStatus getStatus() {
		return status;
	}

	public void setStatus(UserStatus status) {
		this.status = status;
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

	public String getHospitalName() {
		return hospitalName;
	}

	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}

	public Doctor() {
		super();
		// TODO Auto-generated constructor stub
	}

	public List<LocalDateTime> getAvailableSlots() {
		return availableSlots;
	}

	public void setAvailableSlots(List<LocalDateTime> availableSlots) {
		this.availableSlots = availableSlots;
	}

	public Doctor(Long id, Users user, String speciality, int experienceYears, List<Symptom> symptoms,
			List<Appointment> appointments, String email, String phoneNumber, String address, LocalDate dob,
			String gender, byte[] profilePicture, UserStatus status, String firstName, String lastName,
			String hospitalName, String location, boolean available, List<LocalDateTime> availableSlots) {
		super();
		this.id = id;
		this.user = user;
		this.speciality = speciality;
		this.experienceYears = experienceYears;
		this.symptoms = symptoms;
		this.appointments = appointments;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.dob = dob;
		this.gender = gender;
		this.profilePicture = profilePicture;
		this.status = status;
		this.firstName = firstName;
		this.lastName = lastName;
		this.hospitalName = hospitalName;
		this.location = location;
		this.available = available;
		this.availableSlots = availableSlots;
	}

	


	

}
