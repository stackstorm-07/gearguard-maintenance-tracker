export type PriorityLevel = 'Low' | 'Medium' | 'High';
export type MaintenanceType = 'Corrective' | 'Preventive';
export type RequestStage = 'New Request' | 'In Progress' | 'Repaired' | 'Scrap';

export interface MaintenanceRequest {
  id: string;
  // 1. Created by
  createdBy: string; 
  // 2. Maintenance for (Dropdown)
  maintenanceFor: 'Equipment' | 'Work Center';
  // 3. Equipment (Popup trigger - storing ID/Name for now)
  equipmentId: string;
  // 4. Category
  category: string;
  // 5. Request Date
  requestDate: string; // ISO Date String
  // 6. Maintenance Type
  type: MaintenanceType;
  // 7. Team (Popup trigger)
  teamId: string;
  // 8. Technician
  technicianId: string;
  // 9. Scheduled Date
  scheduledDate: string; // ISO DateTime String
  // 10. Duration
  duration: number; // in hours
  // 11. Priority (Low/Med/High)
  priority: PriorityLevel;
  // 12. Company
  company: string;
  // 13. Subject (Title)
  subject: string;
  
  // Extra tabs
  notes?: string;
  instructions?: string;
  
  // Lifecycle
  stage: RequestStage;
}