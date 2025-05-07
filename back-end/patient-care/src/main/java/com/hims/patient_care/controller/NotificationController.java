package com.hims.patient_care.controller;

import com.hims.patient_care.service.NotificationService;
import com.hims.patient_care.service.UserService;
import com.hims.patient_care.service.serviceImpl.JWTService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.hims.patient_care.dto.NotificationDTO;
import com.hims.patient_care.model.Notification;
import com.hims.patient_care.model.Users;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JWTService jwtUtil;

    @PostMapping("/send/{recipientId}")
    public ResponseEntity<?> sendNotification(@PathVariable Long recipientId, @RequestBody Map<String, String> payload) {
        String message = payload.get("message");

        notificationService.sendNotification(recipientId, message);

//        NotificationEndpoint.sendNotification(recipientId, message);

        return ResponseEntity.ok("Notification sent.");
    }


    @PostMapping("/password-change")
    public ResponseEntity<String> sendPasswordChangeNotification(@RequestBody Users user) {
        try {
            notificationService.sendPasswordChangeNotification(user);
            return ResponseEntity.ok("Password change notification sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error sending password change notification: " + e.getMessage());
        }
    }

    @PostMapping("/profile-update")
    public ResponseEntity<String> sendProfileUpdateNotification(@RequestBody Users user) {
        try {
            notificationService.sendProfileUpdateNotification(user);
            return ResponseEntity.ok("Profile update notification sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error sending profile update notification: " + e.getMessage());
        }
    }
//    @GetMapping
//    public List<Notification> getAllNotifications() {
//        return notificationRepository.findAll(Sort.by(Sort.Direction.DESC, "timestamp"));
//    }
    @GetMapping
    public ResponseEntity<List<NotificationDTO>> getScheduledNotifications(HttpServletRequest request, HttpServletResponse response) {
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

        try {
            if ("PATIENT".equalsIgnoreCase(authenticatedUser.getRole())) {
                List<Notification> notifications = notificationService.getScheduledNotificationsForUser(authenticatedUser);
                if (notifications == null || notifications.isEmpty()) {
                    return ResponseEntity.noContent().build();
                }

                List<NotificationDTO> notificationDTOs = notifications.stream()
                    .map(NotificationDTO::new)
                    .collect(Collectors.toList());

                return ResponseEntity.ok(notificationDTOs);
            }
            
            else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
