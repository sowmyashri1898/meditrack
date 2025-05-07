import { DoctorDTO } from "./doctor.model";
import { Patient } from "./patients.model";
import { Prescription } from "./prescription.model";

export class AppointmentDTO {
  specialty!:string
  appointmentId!: number;
  patientId!: number;
  doctorId!: number;
  symptomId!: number;
  location!: string;
  hospitalName!: string;
  appointmentType!: string;  // e.g., "ONLINE" or "OFFLINE"
  appointmentDate!: string;  // ISO Date String, e.g., "2024-12-07"
  appointmentTime!: string;  // ISO Time String, e.g., "14:30:00"
  reasonForVisit!: string;   // Brief explanation of why the patient is visiting
  status!: string;   
  patientName!:string;
  doctorName!:string;
reason!: string;
notes!: string;
patient!:Patient;
doctor!:DoctorDTO;
  active!: boolean;
  prescription!: Prescription[]; // Array of Prescription objects

}
