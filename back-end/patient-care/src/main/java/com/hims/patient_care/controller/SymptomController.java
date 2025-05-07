package com.hims.patient_care.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.hims.patient_care.model.Symptom;
import com.hims.patient_care.service.SymptomService;
@CrossOrigin(origins = "http://localhost:4200") 
@RestController
@RequestMapping("/api/healthcare")
public class SymptomController {
	
	@Autowired
	private SymptomService symptomService;
	
	
	@GetMapping("/symptoms")
	public ResponseEntity<List<Symptom>> getAllSymptoms() {
	    List<Symptom> symptoms = symptomService.getAllSymptoms(); 
	    if (symptoms.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	    }
	    return ResponseEntity.ok(symptoms); 
	}

	@PostMapping("/create/symptoms")
	public ResponseEntity<Symptom> createSymptom(@RequestBody Symptom symptom) {
	    Symptom createdSymptom = symptomService.saveSymptom(symptom);
	    return ResponseEntity.status(HttpStatus.CREATED).body(createdSymptom);
	}

	@GetMapping("/symptoms/{symptomId}")
	public ResponseEntity<Symptom> getSymptomById(@PathVariable Long symptomId) {
	    Symptom symptom = symptomService.findSymptomById(symptomId);
	    if (symptom != null) {
	        return ResponseEntity.ok(symptom);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	    }
	}
	
	private final String FASTAPI_URL = "http://localhost:8000/api/healthcare/process-symptom/";

    @PostMapping("/process-symptom")
    public ResponseEntity<String> processSymptom(@RequestBody Map<String, String> body) {
        String symptom = body.get("symptom");

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(FASTAPI_URL, 
            new HttpEntity<>(Map.of("symptom", symptom)), 
            String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return ResponseEntity.ok(response.getBody());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing symptom");
        }
    }
}
