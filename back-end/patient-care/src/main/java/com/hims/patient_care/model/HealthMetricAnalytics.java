package com.hims.patient_care.model;

import java.time.LocalDate;
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
@Table(name = "health_metrics_analytics")
public class HealthMetricAnalytics {


	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "analytics_id")
	    private Long analyticsId;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "patient_id", referencedColumnName = "user_id")
	    private HealthcareUser patient;

	    @Column(name = "average_value")
	    private Double averageValue;  // Average value of the metric over a period

	    @Column(name = "max_value")
	    private Double maxValue;  // Maximum value recorded

	    @Column(name = "min_value")
	    private Double minValue;  // Minimum value recorded

	    @Column(name = "trend")
	    private String trend;  // E.g., Increasing, Decreasing, Stable

	    @Column(name = "period_start")
	    private LocalDate periodStart;  // Start date of the period being analyzed

	    @Column(name = "period_end")
	    private LocalDate periodEnd;  // End date of the period being analyzed

	    @Column(name = "created_at", updatable = false)
	    private LocalDateTime createdAt;

		public Long getAnalyticsId() {
			return analyticsId;
		}

		public void setAnalyticsId(Long analyticsId) {
			this.analyticsId = analyticsId;
		}

		public HealthcareUser getPatient() {
			return patient;
		}

		public void setPatient(HealthcareUser patient) {
			this.patient = patient;
		}

		public Double getAverageValue() {
			return averageValue;
		}

		public void setAverageValue(Double averageValue) {
			this.averageValue = averageValue;
		}

		public Double getMaxValue() {
			return maxValue;
		}

		public void setMaxValue(Double maxValue) {
			this.maxValue = maxValue;
		}

		public Double getMinValue() {
			return minValue;
		}

		public void setMinValue(Double minValue) {
			this.minValue = minValue;
		}

		public String getTrend() {
			return trend;
		}

		public void setTrend(String trend) {
			this.trend = trend;
		}

		public LocalDate getPeriodStart() {
			return periodStart;
		}

		public void setPeriodStart(LocalDate periodStart) {
			this.periodStart = periodStart;
		}

		public LocalDate getPeriodEnd() {
			return periodEnd;
		}

		public void setPeriodEnd(LocalDate periodEnd) {
			this.periodEnd = periodEnd;
		}

		public LocalDateTime getCreatedAt() {
			return createdAt;
		}

		public void setCreatedAt(LocalDateTime createdAt) {
			this.createdAt = createdAt;
		}

		public HealthMetricAnalytics(Long analyticsId, HealthcareUser patient, Double averageValue, Double maxValue,
				Double minValue, String trend, LocalDate periodStart, LocalDate periodEnd, LocalDateTime createdAt) {
			super();
			this.analyticsId = analyticsId;
			this.patient = patient;
			this.averageValue = averageValue;
			this.maxValue = maxValue;
			this.minValue = minValue;
			this.trend = trend;
			this.periodStart = periodStart;
			this.periodEnd = periodEnd;
			this.createdAt = createdAt;
		}
	    
	    

	}


