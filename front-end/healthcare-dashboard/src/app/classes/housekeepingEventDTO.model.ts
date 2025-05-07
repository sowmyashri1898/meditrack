export interface HousekeepingEventDTO {
    id: number;
    patientId: number;
    serviceType: string;
    startTime: string;  // Consider using Date if needed
    endTime: string;
    frequency: string;
    residentRoomDetails: string;
    commonArea: string;
    specialRequests: string;
    priorityLevel: string;
    supervisor: string;
    checklist: string;
  }
  