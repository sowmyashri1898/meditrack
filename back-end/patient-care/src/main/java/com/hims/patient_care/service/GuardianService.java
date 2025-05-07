package com.hims.patient_care.service;

import com.hims.patient_care.model.Guardian;
import com.hims.patient_care.model.Users;

public interface GuardianService {

	Guardian saveGuardian(Guardian guardian);

	Guardian getGuardianById(Long id);

	Guardian getGuardianByUser(Users authenticatedUser);

}
