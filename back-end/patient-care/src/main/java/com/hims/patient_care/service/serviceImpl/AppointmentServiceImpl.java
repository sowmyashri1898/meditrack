package com.hims.patient_care.service.serviceImpl;

import com.hims.patient_care.dto.AppointmentDTO;
import com.hims.patient_care.dto.NotificationDTO;
import com.hims.patient_care.enums.AppointmentStatus;
import com.hims.patient_care.model.Appointment;
import com.hims.patient_care.model.Doctor;
import com.hims.patient_care.model.Patient;
import com.hims.patient_care.model.Users;
import com.hims.patient_care.repository.AppointmentRepository;
import com.hims.patient_care.repository.DoctorRepository;
import com.hims.patient_care.repository.PatientRepository;
import com.hims.patient_care.service.AppointmentService;
import com.hims.patient_care.service.NotificationService;
import com.hims.patient_care.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentServiceImpl implements AppointmentService {

	@Autowired
	private NotificationService notificationService;

	@Autowired
	private AppointmentRepository appointmentRepository;

	@Autowired
	private DoctorRepository doctorRepository;

	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private UserService userService;

	@Override
	public Appointment createAppointment(AppointmentDTO appointmentDTO, HttpServletRequest request) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		if (username == null) {
			throw new IllegalArgumentException("User not authenticated.");
		}

		Users authenticatedUser = userService.getAuthenticatedUserByUsername(username);
		if (authenticatedUser == null) {
			throw new IllegalArgumentException("Authenticated user not found.");
		}

		Patient patient = patientRepository.findByUser(authenticatedUser);
		if (patient == null) {
			throw new IllegalArgumentException("Patient not found for the authenticated user.");
		}

		System.out.println("Patient ID: " + patient.getId());

		if (patient.getId() == null) {
			throw new IllegalArgumentException("Patient ID must not be null.");
		}

		Appointment appointment = new Appointment();
		appointment.setPatient(patient);
		appointment.setDoctor(doctorRepository.findById(appointmentDTO.getDoctorId()).orElse(null));
		appointment.setAppointmentDate(appointmentDTO.getAppointmentDate());
		appointment.setStatus(appointmentDTO.getStatus());
		appointment.setAppointmentType(appointmentDTO.getAppointmentType());
		appointment.setLocation(appointmentDTO.getLocation());
		appointment.setHospitalName(appointmentDTO.getHospitalName());
		appointment.setAppointmentTime(appointmentDTO.getAppointmentTime());
		appointment.setDoctorName(appointmentDTO.getDoctorName());
		appointment.setPatientName(patient.getFirstName());
		appointment.setReason(appointmentDTO.getReason());
		appointment.setNotes(appointmentDTO.getNotes());
		appointment.setSpeciality(appointmentDTO.getSpeciality());

		appointment = appointmentRepository.save(appointment);
		if (patient != null) {

		String notificationMessage = "Your appointment with Dr. " + appointment.getDoctorName() + " on "
				+ appointment.getAppointmentDate() + " at " + appointment.getAppointmentTime() + " has been scheduled.";
		notificationService.sendNotification(patient.getId(), notificationMessage);
		}
		Doctor doctor = doctorRepository.findById(appointmentDTO.getDoctorId()).orElse(null);
		if (doctor != null) {
			String doctorNotificationMessage = "You have an upcoming appointment with " + patient.getFirstName()
					+ " on " + appointment.getAppointmentDate() + " at " + appointment.getAppointmentTime() + ".";
			notificationService.sendNotification(doctor.getId(), doctorNotificationMessage);
		}

		return appointment;
	}

	@Override
	public Appointment getAppointmentById(Long id) {
		return appointmentRepository.findById(id).orElse(null);
	}

	@Override
	public List<Appointment> getAllAppointments() {
		return appointmentRepository.findAll();
	}

	@Override
	public Appointment updateAppointment(Long id, AppointmentDTO appointmentDTO) {
		Appointment appointment = appointmentRepository.findById(id).orElse(null);
		if (appointment != null) {
			appointment.setPatient(patientRepository.findById(appointmentDTO.getPatientId()).orElse(null));
			appointment.setDoctor(doctorRepository.findById(appointmentDTO.getDoctorId()).orElse(null));
			appointment.setAppointmentDate(appointmentDTO.getAppointmentDate());
			appointment.setAppointmentTime(appointmentDTO.getAppointmentTime());
			appointment.setStatus(appointmentDTO.getStatus());
			appointment.setAppointmentType(appointmentDTO.getAppointmentType());
			appointment.setLocation(appointmentDTO.getLocation());
			appointment.setHospitalName(appointmentDTO.getHospitalName());
//            if (appointmentDTO.getSymptomIds() != null) {
//                appointment.setSymptoms(appointmentDTO.getSymptomIds().stream()
//                        .map(symptomRepository::findById)
//                        .filter(Optional::isPresent)
//                        .map(Optional::get)
//                        .collect(Collectors.toSet()));
//            }
			return appointmentRepository.save(appointment);
		}
		return null;
	}

	@Override
	@Transactional
	public void deleteAppointment(Long id) {
		// Check if the appointment exists before trying to delete it
		Optional<Appointment> appointmentOptional = appointmentRepository.findById(id);
		if (appointmentOptional.isPresent()) {
			appointmentRepository.deleteById(id);
		} else {
			throw new RuntimeException("Appointment not found with ID: " + id);
		}
	}

	public List<Appointment> getAppointmentsForPatient(String username) {
		// Retrieve the authenticated user
		Users authenticatedUser = userService.getAuthenticatedUserByUsername(username);

		if (authenticatedUser == null) {
			throw new IllegalArgumentException("Authenticated user not found.");
		}

		if (authenticatedUser.getRole().equals("PATIENT")) {
			Patient patient = patientRepository.findByUser(authenticatedUser);
			if (patient == null) {
				throw new IllegalArgumentException("Patient not found.");
			}
			return appointmentRepository.findByPatient(patient);
		} else {
			throw new IllegalArgumentException("Access denied. Only patients can access this endpoint.");
		}
	}

	public List<Appointment> getAppointmentsForDoctor(String username) {
		Users authenticatedUser = userService.getAuthenticatedUserByUsername(username);

		if (authenticatedUser == null) {
			throw new IllegalArgumentException("Authenticated user not found.");
		}

		if (authenticatedUser.getRole().equals("DOCTOR")) {
			Optional<Doctor> doctor = doctorRepository.findByUser(authenticatedUser);
			if (doctor == null) {
				throw new IllegalArgumentException("Doctor not found.");
			}
			return appointmentRepository.findByDoctor(doctor);
		} else {
			throw new IllegalArgumentException("Access denied. Only doctors can access this endpoint.");
		}
	}

	@Override
	public void sendNotification(NotificationDTO notificationDTO) {
		notificationService.sendNotification(notificationDTO.getId(), notificationDTO.getMessage());
	}

	  public Appointment updateAppointmentStatus(Long appointmentId, AppointmentStatus status) {
	        Appointment appointment = appointmentRepository.findById(appointmentId)
	                .orElseThrow(() -> new RuntimeException("Appointment not found"));

	        appointment.setStatus(status);

	        return appointmentRepository.save(appointment);
	    }

	@Override
	public Appointment saveAppointment(Appointment appointment) {
		// TODO Auto-generated method stub
	    return appointmentRepository.save(appointment); // Assuming you're using a repository like JPA or MongoDB
	}
}
