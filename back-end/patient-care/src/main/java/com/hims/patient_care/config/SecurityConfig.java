package com.hims.patient_care.config;

import java.util.Arrays;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter; 

    @Autowired
    private UserDetailsService userDetailsService; 

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(request -> request
                        // Publicly accessible endpoints
                        .requestMatchers(
                        		"/api/contact",
                                "/api/auth/signup", "/api/auth/login",
                                "/api/healthcare/symptoms",
                                "/api/healthcare/doctor",
                                "/api/chat/chat", "/api/chat/send",
                                "/api/patients/specialties",
                                "/api/prescriptions/medications",
                                "/api/prescriptions/dosages",
                                "/api/patients/doctors",
                                "/api/prescriptions",
                                "/notifications",
                                "/api/healthcare/create/symptoms",
                                "/api/healthcare/symptoms/{symptomId}",
                                "/api/healthcare/doctors/{symptomId}",
                                "/api/upload", "/api/appointments/{id}/status",
                                "/api/messages/send",
                                "/api/messages/archive/{messageId}",
                                "/api/messages/outbox",
                                "/api/messages/inbox",
                                "/api/messages/{id}/unread",
                                "/api/messages/{id}/read",
                                "/api/auth/{userEmail}/update-password",
                                "/api/auth/{userEmail}/update-profile",
                                "/api/notifications/send/{recipientId}",
                                "/api/notifications")
                        .permitAll()
                        
                        // Patient-specific endpoints
                        .requestMatchers(
                                "/api/patients/register", "/api/family-visits/patient",
                                "/api/patients/details", "/api/appointments",
                                "/api/appointments/patient", "/api/appointments/",
                                "/api/appointments/send-notification",
                                "/api/prescriptions/patient",
                                "/api/events/join/{eventId}", // Allow patients to join events
                                "/api/events/similar/{eventId}",
                                "/api/notifications/send/{recipientId}"// Allow patients to view similar events
                        ).hasRole("PATIENT")
                        
                        // Doctor-specific endpoints
                        .requestMatchers(
                                "/api/healthcare/doctor/register",
                                "/api/healthcare/doctor/details",
                                "/api/healthcare/doctor/update",
                                "/api/prescriptions",
                                "/notifications",
                                "/api/appointments/doctor",
                                "/api/prescriptions/doctor"
                        ).hasRole("DOCTOR")
                        
                        // Guardian-specific endpoints
                        .requestMatchers(
                                "/api/guardians/**", "/api/guardians/register",
                                "/api/guardians/patients", "/api/family-visits/schedule",
                                "/api/events/join/{eventId}", // Allow guardians to join events
                                "/api/events/similar/{eventId}" ,
                                "/api/family-visits/guardian"// Allow guardians to view similar events
                        ).hasRole("GUARDIAN")
                        
                        .requestMatchers(
                                "/api/admin/**",
                                "/api/events/create", 
                                "/api/events/update/{id}", 
                                "/api/events/delete/{id}", 
                                "/api/events" ,
                                "/api/housekeeping-events/create",
                                "/api/housekeeping-events/update/{id}",
                                "/api/housekeeping-events/delete/{id}",
                                "/api/housekeeping-events/all",
                                "/api/messages/send",
                                "/api/messages/archive/{messageId}",
                                "/api/messages/outbox/{userId}",
                                "/api/messages/inbox/{userId}"
                        ).hasRole("ADMIN")
                        
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .cors(Customizer.withDefaults())
                .build();
    }


    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder()); 
        provider.setUserDetailsService(userDetailsService); 
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12); 
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); 
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true); 

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); 
        return source;
    }
  
}
