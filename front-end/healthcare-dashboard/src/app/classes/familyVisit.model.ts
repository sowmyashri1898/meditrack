import { Patient } from "./patients.model";

// family-visit.model.ts
export interface FamilyVisit {
  id: number;
  visitType: string;
  visitDetails: string;
  visitDate: string;
  isOnline: boolean;
  zoomLink: string;
  patient:Patient | null;
}
