package com.hims.patient_care.service.serviceImpl;

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hims.patient_care.model.Users;
import com.hims.patient_care.repository.UserRepository;

@Service
public class CustomUserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class); // Initialize logger

    @Autowired
    private UserRepository userRepository;

    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        logger.info("Attempting to load user by username/email: {}", usernameOrEmail); // Log the search input
        
        Users user = userRepository.findByUsername(usernameOrEmail); // Get the user object
        
        if (user == null) {
            logger.warn("User not found for username/email: {}", usernameOrEmail); // Log the failed search
            throw new UsernameNotFoundException("User not found for " + usernameOrEmail);
        }

        // Log the user details (excluding sensitive information like password)
        logger.info("User found: {}", user.getUsername());

        // Assuming User implements UserDetails or you have a custom implementation to wrap the User entity
        return user; // If User implements UserDetails, return user directly
    }
}
