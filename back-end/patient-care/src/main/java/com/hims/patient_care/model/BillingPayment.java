package com.hims.patient_care.model;

import java.time.LocalDateTime;

import com.hims.patient_care.enums.PaymentStatus;

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
@Table(name = "billing_payments")
public class BillingPayment {
	


	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "billing_id")
	    private Long billingId;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "patient_id", referencedColumnName = "user_id")
	    private HealthcareUser patient;

	    @Column(name = "amount")
	    private Double amount;

	    @Column(name = "insurance_details")
	    private String insuranceDetails;

	    @Enumerated(EnumType.STRING)
	    @Column(name = "payment_status")
	    private PaymentStatus paymentStatus;

	    @Column(name = "payment_date")
	    private LocalDateTime paymentDate;

	    @Column(name = "created_at", updatable = false)
	    private LocalDateTime createdAt;

	    @Column(name = "updated_at")
	    private LocalDateTime updatedAt;

		public Long getBillingId() {
			return billingId;
		}

		public void setBillingId(Long billingId) {
			this.billingId = billingId;
		}

		public HealthcareUser getPatient() {
			return patient;
		}

		public void setPatient(HealthcareUser patient) {
			this.patient = patient;
		}

		public Double getAmount() {
			return amount;
		}

		public void setAmount(Double amount) {
			this.amount = amount;
		}

		public String getInsuranceDetails() {
			return insuranceDetails;
		}

		public void setInsuranceDetails(String insuranceDetails) {
			this.insuranceDetails = insuranceDetails;
		}

		public PaymentStatus getPaymentStatus() {
			return paymentStatus;
		}

		public void setPaymentStatus(PaymentStatus paymentStatus) {
			this.paymentStatus = paymentStatus;
		}

		public LocalDateTime getPaymentDate() {
			return paymentDate;
		}

		public void setPaymentDate(LocalDateTime paymentDate) {
			this.paymentDate = paymentDate;
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

		public BillingPayment(Long billingId, HealthcareUser patient, Double amount, String insuranceDetails,
				PaymentStatus paymentStatus, LocalDateTime paymentDate, LocalDateTime createdAt,
				LocalDateTime updatedAt) {
			super();
			this.billingId = billingId;
			this.patient = patient;
			this.amount = amount;
			this.insuranceDetails = insuranceDetails;
			this.paymentStatus = paymentStatus;
			this.paymentDate = paymentDate;
			this.createdAt = createdAt;
			this.updatedAt = updatedAt;
		}
	    

	}




