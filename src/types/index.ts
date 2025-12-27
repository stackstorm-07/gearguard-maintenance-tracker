// --- 1. EQUIPMENT TYPE ---
export interface Equipment {
  id: string;
  name: string;
  category: string;
  company: string;
  serialNumber: string;
  technician: string;
  employee?: string;
  department?: string;
  maintenanceTeam?: string;
  assignedDate?: string;
  
  // New fields we added recently
  usedBy?: string;
  location?: string;
  status?: string; // e.g., 'Operational', 'Under Maintenance', 'Scrap'
  scrapDate?: string;
  workCenter?: string;
  description?: string;
}

// --- 2. WORK CENTER TYPE ---
export interface WorkCenter {
  id: string;
  name: string;
  code: string;
  tag: string;
  alternativeWorkcenter?: string;
  costPerHour: number;
  capacityEfficiency: number;
  oeeTarget: number;
}

// --- 3. TEAM TYPE ---
export interface Team {
  id: string;
  name: string;
  members: string[]; // Array of member names
  company: string;
}

// --- 4. MAINTENANCE REQUEST TYPE ---
export interface MaintenanceRequest {
  id: string;
  subject: string;
  
  // Who/What
  createdBy: string;
  technicianId?: string;
  teamId?: string;
  company: string;
  
  // Asset Info
  maintenanceFor: 'Equipment' | 'Work Center';
  equipmentId: string; // Stores Name or ID
  category: string;

  // Details
  stage: 'New Request' | 'In Progress' | 'Repaired' | 'Scrap';
  priority: 'Low' | 'Medium' | 'High';
  type: 'Corrective' | 'Preventive';
  description?: string; // <--- THIS WAS MISSING
  
  // Dates & Time
  requestDate: string;
  scheduledDate?: string;
  duration?: number;
}