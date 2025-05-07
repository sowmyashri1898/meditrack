package com.hims.patient_care.model;

import java.time.LocalDateTime;

import com.hims.patient_care.enums.TestResultStatus;

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
@Table(name = "test_results")
public class TestResult {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "test_result_id")
	    private Long testResultId;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "patient_id")
	    private Patient patient;

	    @Column(name = "test_type")
	    private String testType;

	    @Column(name = "test_date")
	    private LocalDateTime testDate;

	    @Enumerated(EnumType.STRING)
	    @Column(name = "result_status")
	    private TestResultStatus resultStatus;

	    @Column(name = "result_summary")
	    private String resultSummary;

	    @Column(name = "provider_name")
	    private String providerName;

	    @Column(name = "created_at", updatable = false)
	    private LocalDateTime createdAt;

	    @Column(name = "updated_at")
	    private LocalDateTime updatedAt;

		public Long getTestResultId() {
			return testResultId;
		}

		public void setTestResultId(Long testResultId) {
			this.testResultId = testResultId;
		}

		public Patient getPatient() {
			return patient;
		}

		public void setPatient(Patient patient) {
			this.patient = patient;
		}

		public String getTestType() {
			return testType;
		}

		public void setTestType(String testType) {
			this.testType = testType;
		}

		public LocalDateTime getTestDate() {
			return testDate;
		}

		public void setTestDate(LocalDateTime testDate) {
			this.testDate = testDate;
		}

		public TestResultStatus getResultStatus() {
			return resultStatus;
		}

		public void setResultStatus(TestResultStatus resultStatus) {
			this.resultStatus = resultStatus;
		}

		public String getResultSummary() {
			return resultSummary;
		}

		public void setResultSummary(String resultSummary) {
			this.resultSummary = resultSummary;
		}

		public String getProviderName() {
			return providerName;
		}

		public void setProviderName(String providerName) {
			this.providerName = providerName;
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

		public TestResult(Long testResultId, Patient patient, String testType, LocalDateTime testDate,
				TestResultStatus resultStatus, String resultSummary, String providerName, LocalDateTime createdAt,
				LocalDateTime updatedAt) {
			super();
			this.testResultId = testResultId;
			this.patient = patient;
			this.testType = testType;
			this.testDate = testDate;
			this.resultStatus = resultStatus;
			this.resultSummary = resultSummary;
			this.providerName = providerName;
			this.createdAt = createdAt;
			this.updatedAt = updatedAt;
		}
	    
	    

	}



