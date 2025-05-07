package com.hims.patient_care.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hims.patient_care.dto.BotResponse;
import com.hims.patient_care.service.serviceImpl.RasaService;

@CrossOrigin(origins = "http://localhost:4200")  // Allow CORS from Angular app
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private RasaService rasaService;

    @GetMapping("/chat")
    public String chatWithRasa(@RequestParam String message) {
        return rasaService.sendMessageToRasa(message);
    }

    
    @PostMapping("/send")
    public BotResponse getDoctorRecommendation(@RequestBody BotResponse symptomRequest) {
        System.out.println("Received symptom: " + symptomRequest.getText());
        
        return rasaService.getDoctorRecommendation(symptomRequest.getText());
    }
}
