package com.hims.patient_care.service.serviceImpl;

import com.hims.patient_care.dto.MedicationDTO;

import com.hims.patient_care.dto.PrescriptionDTO;
import com.hims.patient_care.model.*;
import com.hims.patient_care.repository.*;
import com.hims.patient_care.service.PrescriptionService;
import com.hims.patient_care.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    @Autowired
    private MedicationRepository medicationRepository;

    @Autowired
    private DosageRepository dosageRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserService userService;
  

 
    @Override
    public PrescriptionDTO createPrescription(PrescriptionDTO prescriptionDTO) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        if (username == null) {
            throw new IllegalArgumentException("User not authenticated.");
        }

        Users authenticatedUser = userService.getAuthenticatedUserByUsername(username);
        if (authenticatedUser == null) {
            throw new IllegalArgumentException("Authenticated user not found.");
        }

        if (!authenticatedUser.getRole().equals("DOCTOR")) {
            throw new IllegalArgumentException("Only doctors can create prescriptions.");
        }

        Doctor doctor = doctorRepository.findById(prescriptionDTO.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Patient patient = patientRepository.findById(prescriptionDTO.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Prescription prescription = new Prescription();
        prescription.setPatient(patient);
        prescription.setDoctor(doctor);
        prescription.setStartDate(prescriptionDTO.getStartDate());
        prescription.setEndDate(prescriptionDTO.getEndDate());
//        prescription.setStatus(PrescriptionStatus.valueOf(prescriptionDTO.getStatus()));
        prescription.setRefillCount(prescriptionDTO.getRefillCount());

        for (MedicationDTO medicationDTO : prescriptionDTO.getMedications()) {
            Medication medication = medicationRepository.findById(medicationDTO.getMedicationId())
                    .orElseThrow(() -> new RuntimeException("Medication not found"));

            Dosage dosage = dosageRepository.findById(medicationDTO.getDosageId())
                    .orElseThrow(() -> new RuntimeException("Dosage not found"));

            PrescriptionItem item = new PrescriptionItem();
            item.setMedication(medication);
            item.setDosage(dosage);
            item.setQuantity(medicationDTO.getQuantity());
            
            item.setMorningBeforeFood(medicationDTO.getMorningBeforeFood());
            item.setMorningAfterFood(medicationDTO.getMorningAfterFood());
            item.setAfternoonBeforeFood(medicationDTO.getAfternoonBeforeFood());
            item.setAfternoonAfterFood(medicationDTO.getAfternoonAfterFood());
            item.setNightBeforeFood(medicationDTO.getNightBeforeFood());
            item.setNightAfterFood(medicationDTO.getNightAfterFood());
            item.setNote(medicationDTO.getNote());
            item.setMedicationName(medicationDTO.getMedicationName());
            item.setDosageName(medicationDTO.getDosageName());
            prescription.addPrescriptionItem(item);
        }

        prescriptionRepository.save(prescription);

        return convertToDTO(prescription);
    }

    
    @Override
    public List<PrescriptionDTO> getAllPrescriptions() {
        List<Prescription> prescriptions = prescriptionRepository.findAll();
        return prescriptions.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public PrescriptionDTO getPrescriptionById(Long id) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));
        return convertToDTO(prescription);
    }

    @Override
    public PrescriptionDTO updatePrescription(Long id, PrescriptionDTO prescriptionDTO) {
        // Retrieve prescription by id
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));

//        prescription.setStatus(PrescriptionStatus.valueOf(prescriptionDTO.getStatus()));
        prescription.setStartDate(prescriptionDTO.getStartDate());
        prescription.setEndDate(prescriptionDTO.getEndDate());
        prescription.setRefillCount(prescriptionDTO.getRefillCount());

        prescriptionRepository.save(prescription);

        return convertToDTO(prescription);
    }

    @Override
    public void deletePrescription(Long id) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));

        prescriptionRepository.delete(prescription);
    }

    private PrescriptionDTO convertToDTO(Prescription prescription) {
        PrescriptionDTO dto = new PrescriptionDTO();
        dto.setPrescriptionId(prescription.getPrescriptionId());
        dto.setDoctorId(prescription.getDoctor().getId());
        dto.setPatientId(prescription.getPatient().getId());
//        dto.setStatus(prescription.getStatus().toString());
        dto.setStartDate(prescription.getStartDate());
        dto.setEndDate(prescription.getEndDate());
        dto.setRefillCount(prescription.getRefillCount());

        List<MedicationDTO> medicationDTOList = prescription.getPrescriptionItems().stream()
                .map(item -> {
                    MedicationDTO medDTO = new MedicationDTO();
                    medDTO.setMedicationId(item.getMedication().getId());
                    medDTO.setDosageId(item.getDosage().getId());
                    medDTO.setQuantity(item.getQuantity());
                    medDTO.setMorningBeforeFood(item.getMorningBeforeFood());
                    medDTO.setMorningAfterFood(item.getMorningAfterFood());
                    medDTO.setAfternoonBeforeFood(item.getAfternoonBeforeFood());
                    medDTO.setAfternoonAfterFood(item.getAfternoonAfterFood());
                    medDTO.setNightBeforeFood(item.getNightBeforeFood());
                    medDTO.setNightAfterFood(item.getNightAfterFood());
                    medDTO.setNote(item.getNote());
                    medDTO.setMedicationName(item.getMedicationName());
                    medDTO.setDosageName(item.getDosageName());
                    return medDTO;
                }).collect(Collectors.toList());
        
        dto.setMedications(medicationDTOList);

        return dto;
    }

    public List<Medication> getMedications() {
        return medicationRepository.findAll();
    }

    public List<Dosage> getDosages() {
        return dosageRepository.findAll();
    }


    @Override
    public List<PrescriptionDTO> getPrescriptionsForDoctor(String username) {
        Users authenticatedUser = userService.getAuthenticatedUserByUsername(username);

        if (authenticatedUser == null) {
            throw new IllegalArgumentException("Authenticated user not found.");
        }

        if (authenticatedUser.getRole().equals("DOCTOR")) {
            Optional<Doctor> doctor = doctorRepository.findByUser(authenticatedUser);
            if (doctor.isEmpty()) {
                throw new IllegalArgumentException("Doctor not found.");
            }

            List<Prescription> prescriptions = prescriptionRepository.findByDoctor(doctor.get());
            
            return prescriptions.stream()
                                .map(this::convertToDTO)  
                                .collect(Collectors.toList());  
        } else {
            throw new IllegalArgumentException("Access denied. Only doctors can access this endpoint.");
        }
    }

    @Override
    public List<PrescriptionDTO> getPrescriptionsForPatient(String username) {
        Users authenticatedUser = userService.getAuthenticatedUserByUsername(username);

        if (authenticatedUser == null) {
            throw new IllegalArgumentException("Authenticated user not found.");
        }

        if (authenticatedUser.getRole().equals("PATIENT")) {

            Optional<Patient> patient = Optional.of(patientRepository.findByUser(authenticatedUser));
            if (patient.isEmpty()) {
                throw new IllegalArgumentException("Patient not found.");
            }

            List<Prescription> prescriptions = prescriptionRepository.findByPatient(patient.get());

            return prescriptions.stream()
                                .map(this::convertToDTO)  
                                .collect(Collectors.toList());  
        } else {
            throw new IllegalArgumentException("Access denied. Only patients can access this endpoint.");
        }
    }

}
