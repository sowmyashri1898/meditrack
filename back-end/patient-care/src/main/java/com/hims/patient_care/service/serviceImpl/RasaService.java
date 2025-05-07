package com.hims.patient_care.service.serviceImpl;

import org.springframework.http.HttpEntity;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.hims.patient_care.dto.BotResponse;
import org.json.JSONArray;
import org.json.JSONObject;

@Service
public class RasaService {

	 private final String RASA_API_URL = "http://localhost:5005/webhooks/rest/webhook";

	    public String sendMessageToRasa(String message) {
	        RestTemplate restTemplate = new RestTemplate();

	        JSONObject payload = new JSONObject();
	        payload.put("message", message);

	        String response = restTemplate.postForObject(RASA_API_URL, payload.toString(), String.class);
	        return response;
	    }

	    public BotResponse getDoctorRecommendation(String symptom) {
	        String rasaResponse = sendMessageToRasa(symptom);

	        try {
	            JSONArray jsonResponse = new JSONArray(rasaResponse);

	            if (jsonResponse.length() > 0) {
	                JSONObject firstMessage = jsonResponse.getJSONObject(0);
	                if (firstMessage.has("text")) {
	                    return new BotResponse(firstMessage.getString("text"));
	                }
	            }

	            return new BotResponse("Sorry, I couldn't determine the appropriate response.");
	        } catch (Exception e) {
	            e.printStackTrace();
	            return new BotResponse("Error processing symptom data. Please try again later.");
	        }
	    }
    private String getDoctorsByIntent(String intent) {
        switch (intent) {
            case "headache":
                return "Dr. John Doe (Neurologist)";
            case "fever":
                return "Dr. Jane Smith (General Physician)";
            case "cough":
                return "Dr. Michael Brown (Pulmonologist)";
            default:
                return "Sorry, no doctor found for this symptom.";
        }
    }
}
