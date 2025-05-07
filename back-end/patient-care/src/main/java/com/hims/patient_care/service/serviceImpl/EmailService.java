package com.hims.patient_care.service.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendGuardianCredentials(String email, String password) {
        // Create the email message
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your Guardian Account Details");

        String emailContent = "Dear Guardian,\n\n" +
                              "Your login details are as follows:\n\n" +
                              "Username: " + email + "\n" +
                              "Password: " + password + "\n\n" +
                              "Please keep your login details secure.\n\n" +
                              "Regards,\n" +
                              "The Patient Care Team";

        message.setText(emailContent);

        // Send the email
        mailSender.send(message);
    }

	public void sendEmail(String email, String emailSubject, String emailBody) {
		// TODO Auto-generated method stub
		
	}
}
