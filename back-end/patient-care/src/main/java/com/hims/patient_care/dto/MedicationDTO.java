package com.hims.patient_care.dto;

public class MedicationDTO {

    private Long medicationId;
    private String dosageName; // Add dosage name field
    private String medicationName; // Add name field

    public String getDosageName() {
		return dosageName;
	}

	public void setDosageName(String dosageName) {
		this.dosageName = dosageName;
	}

	public String getMedicationName() {
		return medicationName;
	}

	public void setMedicationName(String medicationName) {
		this.medicationName = medicationName;
	}

	private Long dosageId;
    private Integer quantity;
    private Boolean morningBeforeFood;
    private Boolean morningAfterFood;
    private Boolean afternoonBeforeFood;
    private Boolean afternoonAfterFood;
    private Boolean nightBeforeFood;
    private Boolean nightAfterFood;
    private String note;

    // Getters and Setters
    public Long getMedicationId() {
        return medicationId;
    }

    public void setMedicationId(Long medicationId) {
        this.medicationId = medicationId;
    }

    public Long getDosageId() {
        return dosageId;
    }

    public void setDosageId(Long dosageId) {
        this.dosageId = dosageId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
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
}
