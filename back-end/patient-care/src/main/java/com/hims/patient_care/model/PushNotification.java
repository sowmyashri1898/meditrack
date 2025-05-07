package com.hims.patient_care.model;

import java.time.LocalDateTime;

import com.hims.patient_care.enums.NotificationType;
import com.hims.patient_care.enums.SentStatus;

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
@Table(name = "push_notifications")
public class PushNotification {


	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "notification_id")
	    private Long notificationId;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "patient_id", referencedColumnName = "user_id")
	    private HealthcareUser patient;

	    @Column(name = "message")
	    private String message;

	    @Enumerated(EnumType.STRING)
	    @Column(name = "notification_type")
	    private NotificationType notificationType;

	    @Enumerated(EnumType.STRING)
	    @Column(name = "sent_status")
	    private SentStatus sentStatus;

	    @Column(name = "sent_at")
	    private LocalDateTime sentAt;

	    @Column(name = "created_at", updatable = false)
	    private LocalDateTime createdAt;

		public Long getNotificationId() {
			return notificationId;
		}

		public void setNotificationId(Long notificationId) {
			this.notificationId = notificationId;
		}

		public HealthcareUser getPatient() {
			return patient;
		}

		public void setPatient(HealthcareUser patient) {
			this.patient = patient;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}

		public NotificationType getNotificationType() {
			return notificationType;
		}

		public void setNotificationType(NotificationType notificationType) {
			this.notificationType = notificationType;
		}

		public SentStatus getSentStatus() {
			return sentStatus;
		}

		public void setSentStatus(SentStatus sentStatus) {
			this.sentStatus = sentStatus;
		}

		public LocalDateTime getSentAt() {
			return sentAt;
		}

		public void setSentAt(LocalDateTime sentAt) {
			this.sentAt = sentAt;
		}

		public LocalDateTime getCreatedAt() {
			return createdAt;
		}

		public void setCreatedAt(LocalDateTime createdAt) {
			this.createdAt = createdAt;
		}

		public PushNotification(Long notificationId, HealthcareUser patient, String message, NotificationType notificationType,
				SentStatus sentStatus, LocalDateTime sentAt, LocalDateTime createdAt) {
			super();
			this.notificationId = notificationId;
			this.patient = patient;
			this.message = message;
			this.notificationType = notificationType;
			this.sentStatus = sentStatus;
			this.sentAt = sentAt;
			this.createdAt = createdAt;
		}
		

	}


