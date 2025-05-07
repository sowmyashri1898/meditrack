//package com.hims.patient_care.util;
//
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.context.annotation.Bean;
//import org.springframework.stereotype.Component;
//
//import jakarta.annotation.PostConstruct;
//
//import java.security.SecureRandom;
//import java.util.Base64;
//
//@Component
//@ConfigurationProperties(prefix = "jwt")
//public class JwtConfig {
//	
//	 @Value("${jwt.secret}")
//	    private String jwtSecretKey;
//
//	    @Bean
//	    public String jwtSecretKey() {
//	        return jwtSecretKey;  // Return the secret key as a String bean
//	    }
//
//    // Properties loaded from application.properties or application.yml
//    private String secret;
//    private long expiration;
//
//    // Getter and Setter methods
//    public String getSecret() {
//        return secret;
//    }
//
//    public void setSecret(String secret) {
//        this.secret = secret;
//    }
//
//    public long getExpiration() {
//        return expiration;
//    }
//
//    public void setExpiration(long expiration) {
//        this.expiration = expiration;
//    }
//
//    @PostConstruct
//    public void init() {
//        // Dynamically generate the secret key if it's not set in the properties file
//        if (this.secret == null || this.secret.isEmpty()) {
//            this.secret = generateSecretKey();
//        }
//    }
//
//    // Method to generate a 256-bit secret key (32 bytes)
//    private String generateSecretKey() {
//        SecureRandom secureRandom = new SecureRandom();
//        byte[] key = new byte[32]; // 32 bytes = 256 bits
//        secureRandom.nextBytes(key);
//        return Base64.getEncoder().encodeToString(key);
//    }
//}
