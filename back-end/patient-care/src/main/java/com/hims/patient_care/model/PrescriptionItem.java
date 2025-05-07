package com.hims.patient_care.model;

import jakarta.persistence.*;

@Entity
public class PrescriptionItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    @ManyToOne
    @JoinColumn(name = "prescription_id", referencedColumnName = "prescription_id")  // Ensure this matches the column in the Prescription entity
    private Prescription prescription;

    @ManyToOne
    @JoinColumn(name = "medication_id", referencedColumnName = "id")
    private Medication medication;

    @ManyToOne
    @JoinColumn(name = "dosage_id", referencedColumnName = "id")
    private Dosage dosage;

    private Integer quantity;
    private String frequency;
    private Boolean morningBeforeFood;
    private Boolean morningAfterFood;
    private Boolean afternoonBeforeFood;
    private Boolean afternoonAfterFood;
    private Boolean nightBeforeFood;
    private Boolean nightAfterFood;
    private String note;
    private String dosageName; 
    private String medicationName;
    // Getters and Setters
    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public Prescription getPrescription() {
        return prescription;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
    }
    
    public String getMedicationName() {
        return medication != null ? medication.getName() : null;
    }

    public String getDosageName() {
        return dosage != null ? dosage.getDosage() : null;
    }

    public Medication getMedication() {
        return medication;
    }

    public void setMedication(Medication medication) {
        this.medication = medication;
    }

    public Dosage getDosage() {
        return dosage;
    }

    public void setDosage(Dosage dosage) {
        this.dosage = dosage;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public Boolean getMorningBeforeFood() {
        return morningBeforeFood;
    }

    public void setMorningBeforeFood(Boolean morningBeforeFood) {
        this.morningBeforeFood = morningBeforeFood;
    }

    public Boolean getMorningAfterFood() {
        return morningAfterFood;
    }

    public void setMorningAfterFood(Boolean morningAfterFood) {
        this.morningAfterFood = morningAfterFood;
    }

    public Boolean getAfternoonBeforeFood() {
        return afternoonBeforeFood;
    }

    public void setAfternoonBeforeFood(Boolean afternoonBeforeFood) {
        this.afternoonBeforeFood = afternoonBeforeFood;
    }

    public Boolean getAfternoonAfterFood() {
        return afternoonAfterFood;
    }

    public void setAfternoonAfterFood(Boolean afternoonAfterFood) {
        this.afternoonAfterFood = afternoonAfterFood;
    }

    public Boolean getNightBeforeFood() {
        return nightBeforeFood;
    }

    public void setNightBeforeFood(Boolean nightBeforeFood) {
        this.nightBeforeFood = nightBeforeFood;
    }

    public Boolean getNightAfterFood() {
        return nightAfterFood;
    }

    public void setNightAfterFood(Boolean nightAfterFood) {
        this.nightAfterFood = nightAfterFood;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

	public void setDosageName(String dosageName) {
		this.dosageName = dosageName;
	}

	public void setMedicationName(String medicationName) {
		this.medicationName = medicationName;
	}
    
}
