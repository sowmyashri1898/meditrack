package com.hims.patient_care.controller;


import com.hims.patient_care.model.DoctorVisit;
import com.hims.patient_care.service.DoctorVisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/doctor-visits")

public class DoctorVisitController {

    @Autowired
    private DoctorVisitService doctorVisitService;

    @GetMapping("/doctor/{doctorId}")
    public List<DoctorVisit> getVisitsByDoctorId(@PathVariable Long doctorId) {
        return doctorVisitService.getVisitsByDoctorId(doctorId);
    }

    @PostMapping
    public DoctorVisit createVisit(@RequestBody DoctorVisit visit) {
        return doctorVisitService.createVisit(visit);
    }
    

}

