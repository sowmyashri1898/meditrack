import { GuardianDTO } from "./guardian.model";

export class Patient {
  firstName: string;
  lastName: string;
  dob: string; // Ideally, use Date, but string works for ISO formatted dates
  address: string;
  allergies: string;
  bloodPressure: string;
  contactNumber: number | null;
  currentMedications: string;
  gender: string;
  heartRate: number | null;
  height: number | null;
  temperature: number | null;
  weight: number | null;
  email: string;
  patientImage: string;
  previousDiseases: string;
  isResident: boolean;
  roomNumber: string;
  dietaryPreferences: string;
  guardian: GuardianDTO;
  preferredEvents: Event[];

  constructor(
    firstName: string,
    lastName: string,
    dob: string,
    address: string,
    allergies: string,
    bloodPressure: string,
    contactNumber: number | null,
    currentMedications: string,
    gender: string,
    heartRate: number | null,
    height: number | null,
    temperature: number | null,
    weight: number | null,
    email: string,
    patientImage: string,
    previousDiseases: string,
    isResident: boolean,
    roomNumber: string,
    dietaryPreferences: string,
    guardian: GuardianDTO,
    preferredEvents: Event[]
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.address = address;
    this.allergies = allergies;
    this.bloodPressure = bloodPressure;
    this.contactNumber = contactNumber;
    this.currentMedications = currentMedications;
    this.gender = gender;
    this.heartRate = heartRate;
    this.height = height;
    this.temperature = temperature;
    this.weight = weight;
    this.email = email;
    this.patientImage = patientImage;
    this.previousDiseases = previousDiseases;
    this.isResident = isResident;
    this.roomNumber = roomNumber;
    this.dietaryPreferences = dietaryPreferences;
    this.guardian = guardian;
    this.preferredEvents = preferredEvents;
  }
}
