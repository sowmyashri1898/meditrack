package com.hims.patient_care.dto;

import jakarta.validation.constraints.NotEmpty;

public class LoginRequestDTO {
	@NotEmpty
    private String email;
	@NotEmpty
    private String password;
    @NotEmpty(message = "Role is required.")
    private String role;
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
    
}
