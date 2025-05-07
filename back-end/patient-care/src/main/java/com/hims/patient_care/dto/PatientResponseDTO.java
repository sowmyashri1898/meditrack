package com.hims.patient_care.dto;



import com.hims.patient_care.model.Patient;
import java.util.Base64;

public class PatientResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
//    private LocalDate dob;
    private String gender;
    private String contactNumber;
    private String email;
    private String address;
    private String patientImage;
    private Double height;
    private Double weight;
    private String bloodPressure;
    private Integer heartRate;
    private Double temperature;
    private String allergies;
    private String previousDiseases;
    private String currentMedications;

    // Constructor for initializing response DTO from Patient entity
    public PatientResponseDTO(Patient savedPatient) {
        this.id = savedPatient.getId();
        this.firstName = savedPatient.getFirstName();
        this.lastName = savedPatient.getLastName();
//        this.dob = savedPatient.getDob();
        this.gender = savedPatient.getGender();
        this.contactNumber = savedPatient.getContactNumber();
        this.email = savedPatient.getEmail();
        this.address = savedPatient.getAddress();
        if (savedPatient.getPatientImage() != null) {
            this.patientImage = Base64.getEncoder().encodeToString(savedPatient.getPatientImage());
        }        this.height = savedPatient.getHeight();
        this.weight = savedPatient.getWeight();
        this.bloodPressure = savedPatient.getBloodPressure();
        this.heartRate = savedPatient.getHeartRate();
        this.temperature = savedPatient.getTemperature();
        this.allergies = savedPatient.getAllergies();
        this.previousDiseases = savedPatient.getPreviousDiseases();
        this.currentMedications = savedPatient.getCurrentMedications();
    }

    // Default constructor
    public PatientResponseDTO() {
        // Optionally set default values or leave it empty
    }


	// Getters and setters for all fields
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

//    public LocalDate getDob() {
//        return dob;
//    }
//
//    public void setDob(LocalDate dob) {
//        this.dob = dob;
//    }

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

    public String getPatientImage() {
        return patientImage;
    }

    public void setPatientImage(String patientImage) {
        this.patientImage = patientImage;
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
}
