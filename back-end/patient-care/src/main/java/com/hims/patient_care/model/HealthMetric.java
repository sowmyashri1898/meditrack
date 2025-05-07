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
@Table(name = "health_metrics")
public class HealthMetric {
	

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "metric_id")
	    private Long metricId;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "patient_id", referencedColumnName = "user_id")
	    private HealthcareUser patient;

	    @Column(name = "metric_name")
	    private String metricName;  // E.g., Blood Pressure, Heart Rate, Weight

	    @Column(name = "metric_value")
	    private Double metricValue;  // The value of the metric (e.g., 120/80 for Blood Pressure)

	    @Column(name = "unit")
	    private String unit;  // Unit of the metric (e.g., mmHg for Blood Pressure)

	    @Column(name = "recorded_at")
	    private LocalDateTime recordedAt;  // Timestamp when the metric was recorded

	    @Column(name = "created_at", updatable = false)
	    private LocalDateTime createdAt;

	    @Column(name = "updated_at")
	    private LocalDateTime updatedAt;

		public Long getMetricId() {
			return metricId;
		}

		public void setMetricId(Long metricId) {
			this.metricId = metricId;
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

		public Double getMetricValue() {
			return metricValue;
		}

		public void setMetricValue(Double metricValue) {
			this.metricValue = metricValue;
		}

		public String getUnit() {
			return unit;
		}

		public void setUnit(String unit) {
			this.unit = unit;
		}

		public LocalDateTime getRecordedAt() {
			return recordedAt;
		}

		public void setRecordedAt(LocalDateTime recordedAt) {
			this.recordedAt = recordedAt;
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

		public HealthMetric(Long metricId, HealthcareUser patient, String metricName, Double metricValue, String unit,
				LocalDateTime recordedAt, LocalDateTime createdAt, LocalDateTime updatedAt) {
			super();
			this.metricId = metricId;
			this.patient = patient;
			this.metricName = metricName;
			this.metricValue = metricValue;
			this.unit = unit;
			this.recordedAt = recordedAt;
			this.createdAt = createdAt;
			this.updatedAt = updatedAt;
		}

	}


