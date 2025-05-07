export interface EventDTO {
    id?: number;
    eventName: string;
    description: string;
    startTime: string | Date; 
    endTime: string | Date;   
    category: string;
    tags: string[];
    accessOptions: string;
    notificationPreferences: string[];
    rsvpRequired: boolean;
    participantLimit?: number;
    patientIds?: number[];
    guardianIds?: number[];
  }
  