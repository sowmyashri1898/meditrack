package com.hims.patient_care.dto;

import com.hims.patient_care.enums.AppointmentStatus;

import com.hims.patient_care.enums.AppointmentType;
import com.hims.patient_care.model.Appointment;

import java.time.LocalDateTime;
import java.time.LocalTime;

public class AppointmentDTO {
    private Long appointmentId;
    private Long patientId;
    private Long doctorId;
    private String doctorName;
    private String patientName;
    private LocalDateTime appointmentDate;
    private LocalTime appointmentTime;
    private AppointmentStatus status;
    private AppointmentType appointmentType;
    private String location;
    private String hospitalName;
    private String reason;
    private String notes;
    private String speciality;

    // Constructor to initialize from Appointment entity
    public AppointmentDTO(Appointment appointment) {
        this.appointmentId = appointment.getAppointmentId();
        this.patientId = appointment.getPatient() != null ? appointment.getPatient().getId() : null;
        this.doctorId = appointment.getDoctor() != null ? appointment.getDoctor().getId() : null;
        this.appointmentDate = appointment.getAppointmentDate();
        this.appointmentTime = appointment.getAppointmentTime();
        this.status = appointment.getStatus();
        this.appointmentType = appointment.getAppointmentType();
        this.location = appointment.getLocation();
        this.hospitalName = appointment.getHospitalName();
        this.doctorName = appointment.getDoctorName() ; 
        this.patientName = appointment.getPatientName();
        this.reason = appointment.getReason();
        this.notes = appointment.getNotes();
        this.speciality = appointment.getSpeciality();
       
    }

    // Getters and Setters
    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public LocalDateTime getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDateTime appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public LocalTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }

    public AppointmentType getAppointmentType() {
        return appointmentType;
    }

    public void setAppointmentType(AppointmentType appointmentType) {
        this.appointmentType = appointmentType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	
	  public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}
	

	public String getSpeciality() {
		return speciality;
	}

	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}

	public AppointmentDTO() {
	    }
   
}
