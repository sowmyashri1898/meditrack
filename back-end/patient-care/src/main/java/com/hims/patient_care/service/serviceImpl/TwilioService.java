package com.hims.patient_care.service.serviceImpl;



import org.springframework.stereotype.Service;

import com.hims.patient_care.config.TwilioConfig;
import com.twilio.Twilio;

@Service

public class TwilioService {
//	public static final String ACCOUNT_SID = "your_account_sid";
//    public static final String AUTH_TOKEN = "your_auth_token";
//    public static final String TWILIO_PHONE_NUMBER = "your_twilio_phone_number";
//	@Value("${twilio.account-sid}")
//	private String accountSid;
//
//	@Value("${twilio.auth-token}")
//	private String authToken;
//
//	@Value("${twilio.phone-number}")
//	private String twilioPhoneNumber;
//
//	    public TwilioService() {
//	        Twilio.init(accountSid, authToken);
//	    }
//
//	    public void sendSMS(String to, String messageBody) {
//	        Message message = Message.creator(
//	                new PhoneNumber(to),
//	                new PhoneNumber(twilioPhoneNumber),
//	                messageBody
//	        ).create();
//
//	        System.out.println("Message SID: " + message.getSid());
//	    }
	private final TwilioConfig twilioConfig;

    public TwilioService(TwilioConfig twilioConfig) {
        this.twilioConfig = twilioConfig;
        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
    }
}
