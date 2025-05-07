package com.hims.patient_care.dto;

import javax.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserDTO {

	@NotBlank
	private String name; // Username

	@NotBlank
	private String email;

	@NotBlank
	@Size(min = 6, message = "Password should be at least 6 characters")
	private String password;
	@NotBlank
	private String role;

	public UserDTO(@NotBlank String name, @NotBlank String email,
			@NotBlank @Size(min = 6, message = "Password should be at least 6 characters") String password,
			@NotBlank String role) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.role = role;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

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
