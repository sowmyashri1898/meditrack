export class Provider {
    id: number;
    name: string;
    specialties: string[];  // Assuming specialties are an array of strings
    location: string;  // Add location
    hospital: string;  // Add hospital
    symptoms: string[]; // Add symptoms (this could be a list of symptom codes or names)
  
    constructor(id: number, name: string, specialties: string[], location: string, hospital: string, symptoms: string[]) {
      this.id = id;
      this.name = name;
      this.specialties = specialties;
      this.location = location;
      this.hospital = hospital;
      this.symptoms = symptoms;
    }
  }
  