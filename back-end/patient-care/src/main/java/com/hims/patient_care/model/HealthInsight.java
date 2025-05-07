package com.hims.patient_care.model;

import java.time.LocalDateTime;

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
@Table(name = "health_insights")
public class HealthInsight {


	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "health_insight_id")
	    private Long healthInsightId;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "patient_id", referencedColumnName = "user_id")
	    private HealthcareUser patient;

	    @Column(name = "metric_name")
	    private String metricName;  // e.g., Blood Pressure, Cholesterol

	    @Column(name = "value")
	    private Double value;

	    @Column(name = "last_checked_date")
	    private LocalDateTime lastCheckedDate;

	    @Column(name = "personalized_recommendations")
	    private String personalizedRecommendations;

	    @Column(name = "created_at", updatable = false)
	    private LocalDateTime createdAt;

	    @Column(name = "updated_at")
	    private LocalDateTime updatedAt;

		public Long getHealthInsightId() {
			return healthInsightId;
		}

		public void setHealthInsightId(Long healthInsightId) {
			this.healthInsightId = healthInsightId;
		}

		public HealthcareUser getPatient() {
			return patient;
		}

		public void setPatient(HealthcareUser patient) {
			this.patient = patient;
		}

		public String getMetricName() {
			return metricName;
		}

		public void setMetricName(String metricName) {
			this.metricName = metricName;
		}

		public Double getValue() {
			return value;
		}

		public void setValue(Double value) {
			this.value = value;
		}

		public LocalDateTime getLastCheckedDate() {
			return lastCheckedDate;
		}

		public void setLastCheckedDate(LocalDateTime lastCheckedDate) {
			this.lastCheckedDate = lastCheckedDate;
		}

		public String getPersonalizedRecommendations() {
			return personalizedRecommendations;
		}

		public void setPersonalizedRecommendations(String personalizedRecommendations) {
			this.personalizedRecommendations = personalizedRecommendations;
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

		public HealthInsight(Long healthInsightId, HealthcareUser patient, String metricName, Double value,
				LocalDateTime lastCheckedDate, String personalizedRecommendations, LocalDateTime createdAt,
				LocalDateTime updatedAt) {
			super();
			this.healthInsightId = healthInsightId;
			this.patient = patient;
			this.metricName = metricName;
			this.value = value;
			this.lastCheckedDate = lastCheckedDate;
			this.personalizedRecommendations = personalizedRecommendations;
			this.createdAt = createdAt;
			this.updatedAt = updatedAt;
		}

	}


