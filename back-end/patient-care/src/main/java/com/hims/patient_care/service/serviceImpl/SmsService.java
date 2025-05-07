package com.hims.patient_care.service.serviceImpl;

import org.springframework.stereotype.Service;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

@Service
public class SmsService {

    private static final String ACCOUNT_SID = "your_account_sid";
    private static final String AUTH_TOKEN = "your_auth_token";
    private static final String FROM_PHONE = "your_twilio_phone_number";

    public SmsService() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    public void sendSms(String toPhone, String messageBody) {
        Message message = Message.creator(
                new com.twilio.type.PhoneNumber(toPhone), // Recipient phone number
                new com.twilio.type.PhoneNumber(FROM_PHONE), // Twilio phone number
                messageBody
        ).create();

        System.out.println("SMS sent: " + message.getSid());
    }
}

