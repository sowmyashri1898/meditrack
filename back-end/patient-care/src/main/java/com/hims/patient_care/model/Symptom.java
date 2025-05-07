package com.hims.patient_care.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "symptoms")
public class Symptom {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "symptom_id")
	private Long id; // Ensure this is named 'id' or adjust your repository method accordingly.

	@Column(name = "symptom_name")
	private String symptomName;

//	@ManyToMany(mappedBy = "symptoms")
//	private Set<Appointment> appointments;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSymptomName() {
		return symptomName;
	}

	public void setSymptomName(String symptomName) {
		this.symptomName = symptomName;
	}

//	public Set<Appointment> getAppointments() {
//		return appointments;
//	}
//
//	public void setAppointments(Set<Appointment> appointments) {
//		this.appointments = appointments;
//	}

	public Symptom(Long id, String symptomName) {
		super();
		this.id = id;
		this.symptomName = symptomName;
//		this.appointments = appointments;
	}
	  public Symptom() {
	        // Default constructor for Hibernate
	    }
}
