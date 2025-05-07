package com.hims.patient_care.repository;

import com.hims.patient_care.model.Users;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
	  Users findByUsername(String username);
	    Optional<Users> findByEmail(String email);
    boolean existsByUsernameOrEmail(String username, String email);
	Users findByUsernameOrEmail(String usernameOrEmail, String usernameOrEmail2);
	

//	Optional<User> findByUser(String username);


}
