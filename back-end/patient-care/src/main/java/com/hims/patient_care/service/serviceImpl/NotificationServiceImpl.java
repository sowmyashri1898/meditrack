package com.hims.patient_care.service.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hims.patient_care.repository.DoctorRepository;
import com.hims.patient_care.repository.NotificationRepository;
import com.hims.patient_care.repository.PatientRepository;
import com.hims.patient_care.service.NotificationService;
import com.hims.patient_care.model.Doctor;
import com.hims.patient_care.model.Notification;
import com.hims.patient_care.model.Patient;
import com.hims.patient_care.model.Users;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationServiceImpl implements NotificationService {

    private static final Logger logger = LoggerFactory.getLogger(NotificationServiceImpl.class);

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private WebSocketService webSocketService;

    @Value("${notification.api.url}") 
    private String notificationApiUrl;
    
    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void sendNotification(Long recipientId, String message) {
        try {
            boolean exists = notificationRepository.existsByRecipientIdAndMessage(recipientId, message);
            if (exists) {
                logger.warn("Duplicate notification not saved for recipient ID: {}", recipientId);
                return; 
            }

            Notification notification = new Notification();
            notification.setRecipientId(recipientId);
            notification.setMessage(message);
            notification.setTimestamp(LocalDateTime.now());
            notificationRepository.save(notification);
            logger.info("Notification successfully saved for recipient ID: {}", recipientId);

            String recipientEmail = getRecipientEmailById(recipientId);
            SimpleMailMessage emailMessage = new SimpleMailMessage();
            emailMessage.setTo(recipientEmail);
            emailMessage.setSubject("Notification");
            emailMessage.setText(message);
            emailSender.send(emailMessage);
            logger.info("Email successfully sent to: {}", recipientEmail);

            webSocketService.sendNotificationToAll(message);
            logger.info("WebSocket notification sent for recipient ID: {}", recipientId);

        } catch (Exception e) {
            logger.error("Error sending notification to recipient ID: {}", recipientId, e);
            throw new RuntimeException("Failed to send notification", e);
        }
    }



    private String getRecipientEmailById(Long recipientId) {
        Optional<Patient> patient = patientRepository.findById(recipientId);
        if (patient.isPresent()) {
            String email = patient.get().getEmail();
            if (email == null || email.isEmpty()) {
                throw new RuntimeException("Email not found for recipient ID: " + recipientId);
            }
            return email;
        }
        Optional<Doctor> doctor = doctorRepository.findById(recipientId);
        if (doctor.isPresent()) {
            String email = doctor.get().getEmail();
            if (email == null || email.isEmpty()) {
                throw new RuntimeException("Email not found for doctor ID: " + recipientId);
            }
            return email;
        }

        throw new RuntimeException("Recipient not found with ID: " + recipientId);
    }

    @Override
    public void sendPasswordChangeNotification(Users user) {
        // Send Email
        String emailSubject = "Password Changed Successfully";
        String emailBody = "Hello " + user.getUsername() + ",\n\nYour password has been updated successfully.";
        emailService.sendEmail(user.getEmail(), emailSubject, emailBody);

        // Send SMS (Uncomment if SMS is required)
        // String smsMessage = "Your password has been updated successfully.";
        // smsService.sendSms(user.getPhoneNumber(), smsMessage);

        logger.info("Password change notification sent for user: {}", user.getUsername());
    }

    @Override
    public void sendProfileUpdateNotification(Users user) {
        String emailSubject = "Profile Update Notification";
        String emailBody = "Hello " + user.getUsername() + ",\n\nYour profile has been successfully updated.";
        emailService.sendEmail(user.getEmail(), emailSubject, emailBody);

        // SMS notification (Uncomment if SMS is required)
        // String smsMessage = "Your profile has been successfully updated.";
        // smsService.sendSms(user.getPhoneNumber(), smsMessage);

        logger.info("Profile update notification sent for user: {}", user.getUsername());
    }
    
    @Override
    public List<Notification> getScheduledNotificationsForUser(Users user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null.");
        }

        if ("PATIENT".equalsIgnoreCase(user.getRole())) {
            Patient patient = patientRepository.findByUser(user);
            if (patient == null) {
                throw new IllegalArgumentException("Patient not found.");
            }
            return notificationRepository.findByRecipientId(patient.getId());
        }

        throw new IllegalArgumentException("Access denied. Only patients can access this endpoint.");
    }

}
