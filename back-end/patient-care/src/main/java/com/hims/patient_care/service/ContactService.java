package com.hims.patient_care.service;

import java.util.List;


import com.hims.patient_care.dto.ContactDTO;
import com.hims.patient_care.model.Contact;
public interface ContactService {
	 void saveContact(ContactDTO contactDTO);
	    List<Contact> getAllContacts();
}
