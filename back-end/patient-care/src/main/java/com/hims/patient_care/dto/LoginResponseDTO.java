package com.hims.patient_care.dto;

public class LoginResponseDTO {

    private String username;
    private String email;
    private String role;
    private String token;

    // Constructor
    public LoginResponseDTO(String username, String email, String role, String token) {
        this.username = username;
        this.email = email;
        this.role = role;
        this.token = token;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
