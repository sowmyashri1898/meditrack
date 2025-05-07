package com.hims.patient_care.service;


import java.util.List;



import com.hims.patient_care.model.DoctorVisit;

public interface DoctorVisitService {


	List<DoctorVisit> getVisitsByDoctorId(Long doctorId);

	DoctorVisit createVisit(DoctorVisit visit);

}
