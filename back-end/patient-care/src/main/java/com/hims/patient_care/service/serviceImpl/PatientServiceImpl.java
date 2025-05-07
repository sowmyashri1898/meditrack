package com.hims.patient_care.service.serviceImpl;

import java.util.List;



import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hims.patient_care.dto.PatientDTO;
import com.hims.patient_care.dto.PatientResponseDTO;
import com.hims.patient_care.model.Guardian;
import com.hims.patient_care.model.Patient;
import com.hims.patient_care.model.Users;
import com.hims.patient_care.repository.PatientRepository;
import com.hims.patient_care.repository.UserRepository;
import com.hims.patient_care.service.PatientService;

@Service
public class PatientServiceImpl implements PatientService {

	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserRepository userRepository;

	@Override
	public Patient getPatientById(Long patientId) {
		return patientRepository.findById(patientId).orElse(null);
	}

	@Override
	public PatientResponseDTO updatePatient(Long id, PatientDTO patientDTO) {
		if (!patientRepository.existsById(id)) {
			throw new IllegalArgumentException("Patient with ID " + id + " does not exist.");
		}

		// Convert DTO to Entity
		Patient patient = modelMapper.map(patientDTO, Patient.class);
		patient.setId(id);
		Patient updatedPatient = patientRepository.save(patient);

		// Convert Entity back to DTO
		return modelMapper.map(updatedPatient, PatientResponseDTO.class);
	}

	@Override
	public List<PatientResponseDTO> getAllPatients() {
		List<Patient> patients = patientRepository.findAll();
		return patients.stream().map(patient -> modelMapper.map(patient, PatientResponseDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public void deletePatient(Long id) {
		patientRepository.deleteById(id);
	}

	@Override
	public Optional<Patient> getPatient() {
		return patientRepository.findById(1L); // Example: change to actual user-based logic
	}

	@Override
	public Patient registerPatient(Patient patient) {
	    return patientRepository.save(patient);  // Make sure patientRepository is properly handling all fields.
	}

	@Override
	public Patient getPatientDetails(Long userId) {
		return patientRepository.findByUserId(userId);
	}

	@Override
	public Patient getPatientByUser(Users authenticatedUser) {
		return patientRepository.findByUser(authenticatedUser); // Find the Patient associated with the User
	}

	@Override
	public Patient registerPatient(Long userId, PatientDTO patientRegistrationDTO) {
		Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

		Patient patient = new Patient();
		patient.setUser(user);
		patient.setFirstName(patientRegistrationDTO.getFirstName());
		patient.setLastName(patientRegistrationDTO.getLastName());
//		patient.setDob(patientRegistrationDTO.getDob());
		patient.setGender(patientRegistrationDTO.getGender());
		patient.setContactNumber(patientRegistrationDTO.getContactNumber());
		patient.setAddress(patientRegistrationDTO.getAddress());
		patient.setAllergies(patientRegistrationDTO.getAllergies());

		return patientRepository.save(patient);
	}

	@Override
	public Patient getPatient(Long id) {
		return patientRepository.findByUserId(id);
	}

	@Override
	public Patient getLatestPatientByUser(Users authenticatedUser) {
		return patientRepository.findTopByUserIdOrderByCreatedAtDesc(authenticatedUser.getId());
	}

	@Override
	public List<Patient> getHistoricalPatientsByUser(Users authenticatedUser) {
		return patientRepository.findAllByUserIdOrderByCreatedAtAsc(authenticatedUser.getId());
	}

	@Override
	public List<Patient> getPatientsByGuardian(Guardian guardian) {
//		return patientRepository.findByGuardian(guardian);
		return null;
	}

	@Override
	public Patient getPatientByGuardian(Guardian guardian) {
        // Assuming you have a field 'guardian' in the Patient entity and a method in PatientRepository
        return patientRepository.findByGuardian(guardian);
    }

	@Override
	public List<Patient> getHistoricalPatientsByGuardian(Guardian guardian) {
		// TODO Auto-generated method stub
		return patientRepository.findAllByUserIdOrderByCreatedAtAsc(guardian.getId());
	}

	public Patient savePatient(Patient patient) {
	    if (patient.getId() != null) {
	        // If the patient has an ID, it's an update
	        return patientRepository.save(patient); // Save the updated patient
	    } else {
	        // Otherwise, it's a new patient, so save as new
	        return patientRepository.save(patient); // Save new patient
	    }
	}

//	@Override
//	public Optional<Patient> findById(Long id) {
//		// TODO Auto-generated method stub
//        return patientRepository.findById(id);  // Use the JpaRepository's findById method
//	}

	 @Override
	    public Optional<Patient> findByEmail(String email) {
	        return patientRepository.findByEmail(email); // Assuming you have this method in your repository
	    }

}
