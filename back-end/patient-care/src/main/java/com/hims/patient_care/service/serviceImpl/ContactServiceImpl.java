package com.hims.patient_care.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hims.patient_care.dto.ContactDTO;
import com.hims.patient_care.model.Contact;
import com.hims.patient_care.repository.ContactRepository;
import com.hims.patient_care.service.ContactService;
@Service
public class ContactServiceImpl implements ContactService {
	 @Autowired
	    private ContactRepository contactRepository;

	    @Override
	    public void saveContact(ContactDTO contactDTO) {
	        Contact contact = new Contact();
	        contact.setName(contactDTO.getName());
	        contact.setEmail(contactDTO.getEmail());
	        contact.setMessage(contactDTO.getMessage());

	        contactRepository.save(contact);
	    }

	    @Override
	    public List<Contact> getAllContacts() {
	        return contactRepository.findAll();
	    }
}
