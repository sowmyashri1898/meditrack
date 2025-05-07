package com.hims.patient_care.service;



import com.hims.patient_care.model.Users;

import jakarta.servlet.http.HttpServletRequest;

public interface UserService {
	boolean existsByUsernameOrEmail(String usernameOrEmail);

	void saveUser(Users user);


	Users authenticateUser(String email, String password);

//	PatientDTO getPatientDetails(Long userId);

	Users getAuthenticatedUserByUsername(String username);

	String verify(Users user);

	Users getAuthenticatedUser(HttpServletRequest request);
}
