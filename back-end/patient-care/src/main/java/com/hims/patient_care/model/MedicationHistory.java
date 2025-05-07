package com.hims.patient_care.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "medication_history")
public class MedicationHistory {
	

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "med_history_id")
	    private Long medHistoryId;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "patient_id", referencedColumnName = "user_id")
	    private HealthcareUser patient;

	    @Column(name = "medication_name")
	    private String medicationName;

	    @Column(name = "start_date")
	    private LocalDate startDate;

	    @Column(name = "end_date")
	    private LocalDate endDate;

	    @Column(name = "discontinuation_reason")
	    private String discontinuationReason;

		public Long getMedHistoryId() {
			return medHistoryId;
		}

		public void setMedHistoryId(Long medHistoryId) {
			this.medHistoryId = medHistoryId;
		}

		public HealthcareUser getPatient() {
			return patient;
		}

		public void setPatient(HealthcareUser patient) {
			this.patient = patient;
		}

		public String getMedicationName() {
			return medicationName;
		}

		public void setMedicationName(String medicationName) {
			this.medicationName = medicationName;
		}

		public LocalDate getStartDate() {
			return startDate;
		}

		public void setStartDate(LocalDate startDate) {
			this.startDate = startDate;
		}

		public LocalDate getEndDate() {
			return endDate;
		}

		public void setEndDate(LocalDate endDate) {
			this.endDate = endDate;
		}

		public String getDiscontinuationReason() {
			return discontinuationReason;
		}

		public void setDiscontinuationReason(String discontinuationReason) {
			this.discontinuationReason = discontinuationReason;
		}

		public MedicationHistory(Long medHistoryId, HealthcareUser patient, String medicationName, LocalDate startDate,
				LocalDate endDate, String discontinuationReason) {
			super();
			this.medHistoryId = medHistoryId;
			this.patient = patient;
			this.medicationName = medicationName;
			this.startDate = startDate;
			this.endDate = endDate;
			this.discontinuationReason = discontinuationReason;
		}
	    
	    

	}


