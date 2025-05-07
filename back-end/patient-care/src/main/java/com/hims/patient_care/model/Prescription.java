package com.hims.patient_care.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prescription_id")
    private Long prescriptionId;  // Make sure the property name matches the column name

    @ManyToOne
    @JoinColumn(name = "doctor_id", referencedColumnName = "doctor_id")
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "patient_id", referencedColumnName = "patient_id")
    private Patient patient;

    @OneToMany(mappedBy = "prescription", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    private List<PrescriptionItem> prescriptionItems = new ArrayList<>();  // Initialize the list to avoid NullPointerException

//    private PrescriptionStatus status;  // Changed to PrescriptionStatus enum
    private Integer refillCount;
    private String startDate;
    private String endDate;

    // Getters and Setters
    public Long getPrescriptionId() {
        return prescriptionId;
    }

    public void setPrescriptionId(Long prescriptionId) {
        this.prescriptionId = prescriptionId;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public List<PrescriptionItem> getPrescriptionItems() {
        return prescriptionItems;
    }

    public void setPrescriptionItems(List<PrescriptionItem> prescriptionItems) {
        this.prescriptionItems = prescriptionItems;
    }

//    public PrescriptionStatus getStatus() {
//        return status;
//    }
//
//    public void setStatus(PrescriptionStatus status) {
//        this.status = status;
//    }

    public Integer getRefillCount() {
        return refillCount;
    }

    public void setRefillCount(Integer refillCount) {
        this.refillCount = refillCount;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    // Helper method to add PrescriptionItem
    public void addPrescriptionItem(PrescriptionItem item) {
        if (this.prescriptionItems == null) {
            this.prescriptionItems = new ArrayList<>(); // Ensure the list is initialized if null
        }
        this.prescriptionItems.add(item);
        item.setPrescription(this);
    }
}
