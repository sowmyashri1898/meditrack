package com.hims.patient_care.dto;

import org.springframework.security.core.GrantedAuthority;



import org.springframework.security.core.userdetails.UserDetails;

import com.hims.patient_care.model.Users;

import java.util.Collection;

public class UserPrincipal implements UserDetails {

    private Long id;  // User ID
    private String username;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    // Constructor that takes a User entity
    public UserPrincipal(Users user) {
        this.id = user.getId();  // Assuming 'User' has 'id' field
        this.username = user.getUsername();  // Assuming 'User' has 'username' field
        this.password = user.getPassword();  // Assuming 'User' has 'password' field
        this.authorities = user.getAuthorities();  // Assuming 'User' has 'authorities' field
    }

    // Getter for userId
    public Long getId() {
        return id;
    }

    // Other methods from UserDetails interface
    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  // Customize based on your needs
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  // Customize based on your needs
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // Customize based on your needs
    }

    @Override
    public boolean isEnabled() {
        return true;  // Customize based on your needs
    }
}
