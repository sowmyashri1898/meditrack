package com.hims.patient_care.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.hims.patient_care.enums.UserStatus;

public class DoctorDTO {
	 private Long id;
	    private String firstName;
	    private String lastName;
	    private String specialization;
	    private int experienceYears;
	    private String email;  
	    private String phoneNumber;
	    private String address;
	    private LocalDate dob;
	    private String gender;
	    private MultipartFile profilePicture;
	    private String hospitalName;
	    private String location;
		private boolean available;
		private UserStatus status;
//	    private List<Long> symptomIds;
//		private List<DoctorVisitDTO> doctorVisits;
//
//		// Getters and Setters
//		public List<DoctorVisitDTO> getDoctorVisits() {
//		    return doctorVisits;
//		}
//
//		public void setDoctorVisits(List<DoctorVisitDTO> doctorVisits) {
//		    this.doctorVisits = doctorVisits;
//		}
	    private List<LocalDateTime> availableSlots; // Added field for available slots

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
		public String getSpecialization() {
			return specialization;
		}
		public void setSpecialization(String specialization) {
			this.specialization = specialization;
		}
		public int getExperienceYears() {
			return experienceYears;
		}
		public void setExperienceYears(int experienceYears) {
			this.experienceYears = experienceYears;
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
		
		public MultipartFile getProfilePicture() {
			return profilePicture;
		}
		public void setProfilePicture(MultipartFile profilePicture) {
			this.profilePicture = profilePicture;
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
//		public List<Long> getSymptomIds() {
//			return symptomIds;
//		}
//		public void setSymptomIds(List<Long> symptomIds) {
//			this.symptomIds = symptomIds;
//		}
//	    
		public boolean isAvailable() {
			return available;
		}
		public void setAvailable(boolean available) {
			this.available = available;
		}
		public UserStatus getStatus() {
			return status;
		}
		public void setStatus(UserStatus status) {
			this.status = status;
		}
		public List<LocalDateTime> getAvailableSlots() {
			return availableSlots;
		}
		public void setAvailableSlots(List<LocalDateTime> availableSlots) {
			this.availableSlots = availableSlots;
		}
		
		
	    
}
