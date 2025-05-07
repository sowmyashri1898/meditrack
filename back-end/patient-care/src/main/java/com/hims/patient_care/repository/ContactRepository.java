package com.hims.patient_care.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hims.patient_care.model.Contact;
@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

}
