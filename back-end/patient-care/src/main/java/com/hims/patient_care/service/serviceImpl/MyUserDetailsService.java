package com.hims.patient_care.service.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hims.patient_care.model.Users;
import com.hims.patient_care.model.UserPrinciple;
import com.hims.patient_care.repository.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {
	
@Autowired
private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	Users user = userRepository.findByUsername(username);
	if(user == null) {
		System.out.println("User Not Found");
		throw new UsernameNotFoundException("User Not  Found");
	}
		return new UserPrinciple(user);
	}
	


}
