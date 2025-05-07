package com.hims.patient_care.dto;



import lombok.NoArgsConstructor;
@NoArgsConstructor

public class GuardianDTO {

    private Long id;
    private String guardianFirstName;
    private String guardianLastName;
    private String phoneNumber;
    private String  guardianEmail;
    private String relationship;
    private PatientDTO patient;
    public GuardianDTO() {
    }


    // Getters and Setters
    public Long getId() {
        return id;
    }

    public GuardianDTO(Long id, String guardianFirstName, String guardianLastName, String phoneNumber, String guardianEmail,
			String relationship, PatientDTO patient) {
		super();
		this.id = id;
		this.guardianFirstName = guardianFirstName;
		this.guardianLastName = guardianLastName;
		this.phoneNumber = phoneNumber;
		this.guardianEmail = guardianEmail;
		this.relationship = relationship;
		this.patient = patient;
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


	public PatientDTO getPatient() {
		return patient;
	}


	public void setPatient(PatientDTO patient) {
		this.patient = patient;
	}

	
    
}

