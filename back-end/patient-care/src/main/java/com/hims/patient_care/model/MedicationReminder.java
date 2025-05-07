package com.hims.patient_care.model;

import java.time.LocalDateTime;
import java.time.LocalTime;

import com.hims.patient_care.enums.ReminderFrequency;
import com.hims.patient_care.enums.ReminderStatus;
import com.hims.patient_care.enums.ReminderType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "medication_reminders")
public class MedicationReminder {


	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "reminder_id")
	    private Long reminderId;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "patient_id", referencedColumnName = "user_id")
	    private HealthcareUser patient;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "prescription_id", referencedColumnName = "prescription_id")
	    private Prescription prescription;

	    @Column(name = "reminder_time")
	    private LocalTime reminderTime;  // Time for the reminder

	    @Enumerated(EnumType.STRING)
	    @Column(name = "reminder_frequency")
	    private ReminderFrequency reminderFrequency;

	    @Enumerated(EnumType.STRING)
	    @Column(name = "reminder_type")
	    private ReminderType reminderType;

	    @Enumerated(EnumType.STRING)
	    @Column(name = "status")
	    private ReminderStatus status;

	    @Column(name = "created_at", updatable = false)
	    private LocalDateTime createdAt;

	    @Column(name = "updated_at")
	    private LocalDateTime updatedAt;

		public Long getReminderId() {
			return reminderId;
		}

		public void setReminderId(Long reminderId) {
			this.reminderId = reminderId;
		}

		public HealthcareUser getPatient() {
			return patient;
		}

		public void setPatient(HealthcareUser patient) {
			this.patient = patient;
		}

		public Prescription getPrescription() {
			return prescription;
		}

		public void setPrescription(Prescription prescription) {
			this.prescription = prescription;
		}

		public LocalTime getReminderTime() {
			return reminderTime;
		}

		public void setReminderTime(LocalTime reminderTime) {
			this.reminderTime = reminderTime;
		}

		public ReminderFrequency getReminderFrequency() {
			return reminderFrequency;
		}

		public void setReminderFrequency(ReminderFrequency reminderFrequency) {
			this.reminderFrequency = reminderFrequency;
		}

		public ReminderType getReminderType() {
			return reminderType;
		}

		public void setReminderType(ReminderType reminderType) {
			this.reminderType = reminderType;
		}

		public ReminderStatus getStatus() {
			return status;
		}

		public void setStatus(ReminderStatus status) {
			this.status = status;
		}

		public LocalDateTime getCreatedAt() {
			return createdAt;
		}

		public void setCreatedAt(LocalDateTime createdAt) {
			this.createdAt = createdAt;
		}

		public LocalDateTime getUpdatedAt() {
			return updatedAt;
		}

		public void setUpdatedAt(LocalDateTime updatedAt) {
			this.updatedAt = updatedAt;
		}

		public MedicationReminder(Long reminderId, HealthcareUser patient, Prescription prescription, LocalTime reminderTime,
				ReminderFrequency reminderFrequency, ReminderType reminderType, ReminderStatus status,
				LocalDateTime createdAt, LocalDateTime updatedAt) {
			super();
			this.reminderId = reminderId;
			this.patient = patient;
			this.prescription = prescription;
			this.reminderTime = reminderTime;
			this.reminderFrequency = reminderFrequency;
			this.reminderType = reminderType;
			this.status = status;
			this.createdAt = createdAt;
			this.updatedAt = updatedAt;
		}

	}


