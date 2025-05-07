package com.hims.patient_care.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {

	@Bean
	public JavaMailSender getJavaMailSender() {
	    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
	    mailSender.setHost("smtp.gmail.com");
	    mailSender.setPort(587);
	    mailSender.setUsername("sowmyashrishubha@gmail.com");
	    mailSender.setPassword("kvem umzm berc jlrf");
	    mailSender.getJavaMailProperties().put("mail.smtp.auth", "true");
	    mailSender.getJavaMailProperties().put("mail.smtp.starttls.enable", "true");
	    mailSender.getJavaMailProperties().put("mail.smtp.ssl.trust", "smtp.gmail.com");
	    return mailSender;
	}

}

