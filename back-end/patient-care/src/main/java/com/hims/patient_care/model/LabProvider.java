package com.hims.patient_care.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "lab_providers")
public class LabProvider {
	

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "provider_id")
	    private Long providerId;

	    @Column(name = "provider_name")
	    private String providerName;

	    @Column(name = "contact_details")
	    private String contactDetails;

	    @Column(name = "location")
	    private String location;

		public Long getProviderId() {
			return providerId;
		}

		public void setProviderId(Long providerId) {
			this.providerId = providerId;
		}

		public String getProviderName() {
			return providerName;
		}

		public void setProviderName(String providerName) {
			this.providerName = providerName;
		}

		public String getContactDetails() {
			return contactDetails;
		}

		public void setContactDetails(String contactDetails) {
			this.contactDetails = contactDetails;
		}

		public String getLocation() {
			return location;
		}

		public void setLocation(String location) {
			this.location = location;
		}

		public LabProvider(Long providerId, String providerName, String contactDetails, String location) {
			super();
			this.providerId = providerId;
			this.providerName = providerName;
			this.contactDetails = contactDetails;
			this.location = location;
		}

	}


