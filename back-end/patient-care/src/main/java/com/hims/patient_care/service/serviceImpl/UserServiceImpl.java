package com.hims.patient_care.service.serviceImpl;



import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hims.patient_care.dto.PatientDTO;
import com.hims.patient_care.model.Patient;
import com.hims.patient_care.model.Users;
import com.hims.patient_care.repository.PatientRepository;
import com.hims.patient_care.repository.UserRepository;
import com.hims.patient_care.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import java.util.Base64;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired(required= true)
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private PatientRepository patientRepository;
    
    @Autowired
    private JWTService jwtUtil; 
    
    @Autowired
    AuthenticationManager authManager;

    @Override
    public boolean existsByUsernameOrEmail(String usernameOrEmail) {
        return userRepository.existsByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
    }

    @Override
    public void saveUser(Users user) {
    	
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override

    public Users authenticateUser(String usernameOrEmail, String password) {
        Users user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }
    @Override
    public Users getAuthenticatedUser(HttpServletRequest request) {
        String token = jwtUtil.extractTokenFromRequest(request);
        if (token != null && jwtUtil.validateToken(token)) {
            String username = jwtUtil.extractUserName(token);
            return userRepository.findByUsername(username);  // or similar method to get the user from DB
        }
        return null;  // If no valid user is found
    }



//@Transactional
//public PatientDTO getPatientDetails(Long userId) {
//    Patient patient = patientRepository.findByUserId(userId);  // Assuming you fetch the patient based on userId
//    
//    if (patient != null) {
//        // Map Patient entity to PatientDTO
//        PatientDTO patientDTO = new PatientDTO();
//        patientDTO.setFirstName(patient.getFirstName());
//        patientDTO.setLastName(patient.getLastName());
//        patientDTO.setDob(patient.getDob());
//        patientDTO.setGender(patient.getGender());
//        patientDTO.setContactNumber(patient.getContactNumber());
//        patientDTO.setEmail(patient.getEmail());
//        patientDTO.setAddress(patient.getAddress());
//        patientDTO.setHeight(patient.getHeight());
//        patientDTO.setWeight(patient.getWeight());
//        patientDTO.setBloodPressure(patient.getBloodPressure());
//        patientDTO.setHeartRate(patient.getHeartRate());
//        patientDTO.setTemperature(patient.getTemperature());
//        patientDTO.setAllergies(patient.getAllergies());
//        patientDTO.setPreviousDiseases(patient.getPreviousDiseases());
//        patientDTO.setPatientImage(patient.getPatientImage());
//
//        return patientDTO;
//    }
//    return null;
//}
public Users getAuthenticatedUserByUsername(String username) {
    return userRepository.findByUsername(username);

}
public String verify(Users user) {
    Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
    if (authentication.isAuthenticated()) {
    	List<String> roles = Arrays.asList("ROLE_PATIENT", "ROLE_ADMIN","ROLE_DOCTOR");
        return jwtUtil.generateToken(user.getUsername(),roles);
    } else {
        return "fail";
    }
}
}





	

