package com.hims.patient_care.controller;

import java.util.List;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hims.patient_care.dto.AppointmentDTO;
import com.hims.patient_care.dto.NotificationDTO;
import com.hims.patient_care.enums.AppointmentStatus;
import com.hims.patient_care.model.Appointment;
import com.hims.patient_care.model.Users;
import com.hims.patient_care.service.AppointmentService;
import com.hims.patient_care.service.UserService;
import com.hims.patient_care.service.serviceImpl.JWTService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;



@CrossOrigin(origins = "http://localhost:4200") // Allow CORS from Angular app
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

	@Autowired
	private AppointmentService appointmentService;
	
	
	 @Autowired
	    private UserService userService;
	    
	    @Autowired
	    private JWTService jwtUtil;
	
	@PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentDTO appointmentDTO,HttpServletRequest request) {
        Appointment appointment = appointmentService.createAppointment(appointmentDTO, request);
        return ResponseEntity.ok(appointment);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentById(id));
    }
    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @RequestBody AppointmentDTO appointmentDTO) {
        return ResponseEntity.ok(appointmentService.updateAppointment(id, appointmentDTO));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id, @RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            appointmentService.deleteAppointment(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            // Log error and return a suitable response
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/patient")
    public ResponseEntity<List<AppointmentDTO>> getPatientAppointments(HttpServletRequest request, HttpServletResponse response) {
        String token = jwtUtil.extractTokenFromRequest(request);
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));

        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        String username = jwtUtil.extractUserName(token);
        if (username == null || username.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        Users authenticatedUser = userService.getAuthenticatedUserByUsername(username);
        if (authenticatedUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        if ("PATIENT".equalsIgnoreCase(authenticatedUser.getRole())) {
            try {
                List<Appointment> appointments = appointmentService.getAppointmentsForPatient(username);
                if (appointments == null || appointments.isEmpty()) {
                    return ResponseEntity.noContent().build();
                }

                List<AppointmentDTO> appointmentDTOs = appointments.stream()
                    .map(appointment -> new AppointmentDTO(appointment))
                    .collect(Collectors.toList());

                return ResponseEntity.ok(appointmentDTOs);
            } catch (Exception e) {
                e.printStackTrace(); 
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }

    @GetMapping("/doctor")
    public ResponseEntity<List<Appointment>> getDoctorAppointments(HttpServletRequest request, HttpServletResponse response) {
        String token = jwtUtil.extractTokenFromRequest(request);
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));

        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        String username = jwtUtil.extractUserName(token);
        if (username == null || username.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        Users authenticatedUser = userService.getAuthenticatedUserByUsername(username);
        if (authenticatedUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        if ("DOCTOR".equalsIgnoreCase(authenticatedUser.getRole())) {
            try {
                List<Appointment> appointments = appointmentService.getAppointmentsForDoctor(username);
                if (appointments == null || appointments.isEmpty()) {
                    return ResponseEntity.noContent().build(); 
                }
                return ResponseEntity.ok(appointments);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }
    @PostMapping("/send-notification")
    public ResponseEntity<String> sendNotification(@RequestBody NotificationDTO notificationDTO, HttpServletRequest request) {
        String token = jwtUtil.extractTokenFromRequest(request);

        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }

        String username = jwtUtil.extractUserName(token);
        if (username == null || username.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token: no username found");
        }

        Users authenticatedUser = userService.getAuthenticatedUserByUsername(username);
        if (authenticatedUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        if (!"PATIENT".equalsIgnoreCase(authenticatedUser.getRole())) { // Adjust the role as needed
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied. Insufficient permissions");
        }

        try {
            appointmentService.sendNotification(notificationDTO);
            return ResponseEntity.ok("Notification sent successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending notification");
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Appointment> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusRequest) {

        String statusString = statusRequest.get("status");
        
        AppointmentStatus status = AppointmentStatus.valueOf(statusString.toUpperCase());
        
        Appointment updatedAppointment = appointmentService.updateAppointmentStatus(id, status);
        return ResponseEntity.ok(updatedAppointment);
    }
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Appointment> cancelAppointment(@PathVariable Long id) {
        Appointment appointment = appointmentService.getAppointmentById(id);
        if (appointment == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        
        appointment.setStatus(AppointmentStatus.CANCELED);
        appointment.setActive(false);  
        
        Appointment updatedAppointment = appointmentService.saveAppointment(appointment);
        
        return ResponseEntity.ok(updatedAppointment);
    }

}
