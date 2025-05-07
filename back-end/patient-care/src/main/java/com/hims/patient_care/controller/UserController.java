package com.hims.patient_care.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.hims.patient_care.dto.LoginRequestDTO;
import com.hims.patient_care.dto.LoginResponseDTO;
import com.hims.patient_care.dto.UserDTO;
import com.hims.patient_care.model.PasswordUpdateRequest;
import com.hims.patient_care.model.ProfileUpdateRequest;
import com.hims.patient_care.model.Users;
import com.hims.patient_care.repository.UserRepository;
import com.hims.patient_care.service.NotificationService;
import com.hims.patient_care.service.UserService;
import com.hims.patient_care.service.serviceImpl.JWTService;
import com.hims.patient_care.service.serviceImpl.SmsService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = { "http://localhost:4200" }, methods = { RequestMethod.OPTIONS, RequestMethod.GET,
		RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.POST })
@RestController
@RequestMapping("/api/auth")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private JWTService jwtUtil; // Inject JwtUtil to generate JWT tokens

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private NotificationService notificationService;

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Validated @RequestBody UserDTO signupRequest, HttpServletResponse response,
			HttpServletRequest request) {
		response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));

		try {
			if (userService.existsByUsernameOrEmail(signupRequest.getName())) {
				return ResponseEntity.badRequest().body("Username or email is already taken.");
			}

			Users newUser = new Users();
			newUser.setEmail(signupRequest.getEmail());
			newUser.setPassword(signupRequest.getPassword());
			newUser.setUsername(signupRequest.getName());
			newUser.setRole(signupRequest.getRole());
			userService.saveUser(newUser);

			return ResponseEntity.ok("User registered successfully.");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Error: " + e.getMessage());
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@Validated @RequestBody LoginRequestDTO loginRequest, HttpSession session,
			HttpServletResponse response, HttpServletRequest request) {
		response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin")); // CORS header (optional)
		response.setHeader("Access-Control-Allow-Credentials", "true");

		try {
			Users user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

			if (user != null) {
				if (user.getRole().equalsIgnoreCase(loginRequest.getRole())) {
					List<String> roles = Arrays.asList("ROLE_PATIENT", "ROLE_ADMIN", "ROLE_DOCTOR", "ROLE_GUARDIAN");
					String token = jwtUtil.generateToken(user.getUsername(), roles);
					session.setAttribute("username", user.getUsername());
					System.out.println("Session: " + session);
					response.setHeader("Authorization", "Bearer " + token);

					LoginResponseDTO responseDTO = new LoginResponseDTO(user.getUsername(), user.getEmail(),
							user.getRole(), token);

					return ResponseEntity.ok(responseDTO);
				}

				else {
					return ResponseEntity.badRequest()
							.body("Role mismatch. You are not authorized to log in as " + loginRequest.getRole() + ".");
				}
			}

			else {
				return ResponseEntity.badRequest().body("Invalid credentials.");
			}

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
		}

	}

	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session) {
		session.invalidate();
		return ResponseEntity.ok("Logged out successfully.");
	}

	@PutMapping("/{userEmail}/update-password")
	public ResponseEntity<?> updatePassword(@PathVariable String userEmail, @RequestBody PasswordUpdateRequest request) {
	    String oldPassword = request.getOldPassword();
	    String newPassword = request.getNewPassword();

	    // Validate old password
	    if (oldPassword == null || oldPassword.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Old password is required.");
	    }

	    // Validate new password
	    if (newPassword == null || newPassword.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("New password is required.");
	    }

	    // Fetch user by email
	    Optional<Users> userOptional = userRepository.findByEmail(userEmail);
	    if (userOptional.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with the given email not found.");
	    }

	    Users user = userOptional.get();

	    // Validate old password
	    if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Old password is incorrect.");
	    }

	    // Check if new password is different from the old password
	    if (passwordEncoder.matches(newPassword, user.getPassword())) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                .body("New password must be different from the old password.");
	    }

	    // Update the password
	    user.setPassword(passwordEncoder.encode(newPassword));
	    userRepository.save(user);

	    // Send email and SMS notifications
	    try {
	        notificationService.sendPasswordChangeNotification(user);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Password updated, but failed to send notification.");
	    }

	    return ResponseEntity.ok("Password updated successfully.");
	}


	@PutMapping("/{userEmail}/update-profile")
	public ResponseEntity<?> updateProfile(@PathVariable String userEmail, @RequestBody ProfileUpdateRequest request) {

	    if (userEmail == null || userEmail.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User email is required.");
	    }

	    Optional<Users> userOptional = userRepository.findByEmail(userEmail);
	    if (userOptional.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with the given email not found.");
	    }

	    Users user = userOptional.get();

	    if (request.getName() != null && !request.getName().isEmpty()) {
	        user.setUsername(request.getName());
	    }
	    if (request.getEmail() != null && !request.getEmail().isEmpty()) {
	        user.setEmail(request.getEmail());
	    }

	    // Save updated user
	    userRepository.save(user);

	    // Send email/SMS notification
	    try {
	        notificationService.sendProfileUpdateNotification(user);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Profile updated, but failed to send notification.");
	    }

	    return ResponseEntity.ok("Profile updated successfully.");
	}
}