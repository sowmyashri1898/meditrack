//package com.hims.patient_care.util;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.authentication.AbstractAuthenticationToken;
//import org.springframework.stereotype.Component;
//
//@Component
//public class JwtAuthentication extends AbstractAuthenticationToken {
//
//    private final String username;
//
//    // Use @Value to inject the username from application.properties or application.yml
//    public JwtAuthentication(@Value("${jwt.username}") String username) {
//        super(null);  // No authorities are assigned
//        this.username = username;
//        setAuthenticated(true);  // Mark as authenticated
//    }
//
//    @Override
//    public Object getCredentials() {
//        return null;  // No credentials in the context
//    }
//
//    @Override
//    public Object getPrincipal() {
//        return username;
//    }
//}
