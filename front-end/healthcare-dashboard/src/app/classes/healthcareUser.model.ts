// export class HealthcareUser {
//     userId!: number;
//     name!: string;
//     specialization!: string;
//   }
  export class HealthcareUser {
    userId!: number ;
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    phoneNumber: string = '';
    address: string = '';
    dob: string = ''; // Use string to represent date in the UI. Can be converted to Date if necessary.
    gender: string = '';
    profilePicture: string = '';
    status: string = ''; // This can be either 'ACTIVE', 'INACTIVE', or other statuses as per your backend
    role: string = ''; // 'doctor' or 'admin'
    createdAt: string = ''; // Store as a string for easier display in UI
    updatedAt: string = ''; // Same as createdAt
    appointments: any[] = []; // Array of appointments, if needed
    patient: any; // One-to-one relationship with Patient, use an object or model if needed
    symptoms: any[] = []; // Array of symptoms, can be defined if required
    user: any; // Reference to User model, optional depending on the design
  
    constructor() {}
  }
  