// src/components/maintenance/MaintenanceTypes.ts

export interface MaintenanceRequest {
  id: string;
  teamName: string; // Team assigned to this task (e.g., Mechanics, Electricians)
  technician: string; // Technician assigned to this task
  subject: string; // What is wrong (e.g., "Leaking Oil")
  equipment: string; // Equipment affected
  scheduledDate: string; // When should the work happen
  duration: string; // How long did the repair take (e.g., "2 hours")
  requestType: 'Corrective' | 'Preventive'; // Type of maintenance request
}
