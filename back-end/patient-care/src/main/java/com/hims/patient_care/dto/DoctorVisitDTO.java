package com.hims.patient_care.dto;

import java.time.LocalDateTime;

public class DoctorVisitDTO {

    private Long visitId;
    private LocalDateTime visitDate;
    private String patientName;
    private String purpose;
    private String status;

    // Default constructor
    public DoctorVisitDTO() {}

    // Parameterized constructor
    public DoctorVisitDTO(Long visitId, LocalDateTime visitDate, String patientName, String purpose, String status) {
        this.visitId = visitId;
        this.visitDate = visitDate;
        this.patientName = patientName;
        this.purpose = purpose;
        this.status = status;
    }

    // Getters and Setters
    public Long getVisitId() {
        return visitId;
    }

    public void setVisitId(Long visitId) {
        this.visitId = visitId;
    }

    public LocalDateTime getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(LocalDateTime visitDate) {
        this.visitDate = visitDate;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // toString method
    @Override
    public String toString() {
        return "DoctorVisitDTO{" +
                "visitId=" + visitId +
                ", visitDate=" + visitDate +
                ", patientName='" + patientName + '\'' +
                ", purpose='" + purpose + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
