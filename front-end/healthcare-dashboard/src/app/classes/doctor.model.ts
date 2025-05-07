// doctor.dto.ts

export class DoctorDTO {
  firstName: string;
  lastName: string;
  specialization: string;
  experienceYears: number;
  email: string;
  phoneNumber: string;
  address: string;
  location: string;
  profilePicture: string; // This can be a URL or base64 string for the profile image
  hospitalName: string;
  gender: 'Male' | 'Female' | 'Other'; // Enum-like type for gender
  isAvailable:Boolean;
  constructor(
    firstName: string = '',
    lastName: string = '',
    specialization: string = '',
    experienceYears: number = 0,
    email: string = '',
    phoneNumber: string = '',
    address: string = '',
    location: string = '',
    profilePicture: string = '',
    hospitalName: string = '',
    gender: 'Male' | 'Female' | 'Other' = 'Male',
    isAvailable:Boolean=false
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.specialization = specialization;
    this.experienceYears = experienceYears;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.location = location;
    this.profilePicture = profilePicture;
    this.hospitalName = hospitalName;
    this.gender = gender;
    this.isAvailable = isAvailable;
  }
}
