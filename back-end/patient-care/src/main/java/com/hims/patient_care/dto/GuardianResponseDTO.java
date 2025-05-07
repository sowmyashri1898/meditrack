package com.hims.patient_care.dto;


import com.hims.patient_care.model.Guardian;

public class GuardianResponseDTO {

    private Long id;
    private String guardianFirstName;
    private String guardianLastName;
    private String phoneNumber;
    private String guardianEmail;
    private String relationship;

    // Constructor to initialize from Guardian entity
    public GuardianResponseDTO(Guardian guardian) {
        this.id = guardian.getId();
        this.guardianFirstName = guardian.getGuardianFirstName();
        this.guardianLastName = guardian.getGuardianLastName();
        this.phoneNumber = guardian.getPhoneNumber();
        this.guardianEmail = guardian.getGuardianEmail();
        this.relationship = guardian.getRelationship();
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

  

   

    public String getGuardianFirstName() {
		return guardianFirstName;
	}

	public void setGuardianFirstName(String guardianFirstName) {
		this.guardianFirstName = guardianFirstName;
	}

	public String getGuardianLastName() {
		return guardianLastName;
	}

	public void setGuardianLastName(String guardianLastName) {
		this.guardianLastName = guardianLastName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	

    public String getGuardianEmail() {
		return guardianEmail;
	}

	public void setGuardianEmail(String guardianEmail) {
		this.guardianEmail = guardianEmail;
	}

	public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }
}

