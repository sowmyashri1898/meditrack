package com.hims.patient_care.service;


import java.util.List;

import com.hims.patient_care.dto.AppointmentDTO;
import com.hims.patient_care.dto.NotificationDTO;
import com.hims.patient_care.enums.AppointmentStatus;
import com.hims.patient_care.model.Appointment;

import jakarta.servlet.http.HttpServletRequest;

public interface AppointmentService {
	    Appointment getAppointmentById(Long id);
	    List<Appointment> getAllAppointments();
	    Appointment updateAppointment(Long id, AppointmentDTO appointmentDTO);
	    void deleteAppointment(Long id);
		Appointment createAppointment(AppointmentDTO appointmentDTO, HttpServletRequest request);
		List<Appointment> getAppointmentsForPatient(String username);
		List<Appointment> getAppointmentsForDoctor(String username);
	    void sendNotification(NotificationDTO notificationDTO);
		Appointment updateAppointmentStatus(Long id, AppointmentStatus status);
		Appointment saveAppointment(Appointment appointment);

}
