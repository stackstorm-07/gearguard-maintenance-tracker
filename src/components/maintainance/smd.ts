// src/components/maintenance/sampleMaintenanceData.ts

import { MaintenanceRequest } from './mt';

export const sampleMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: "1",
    teamName: "Mechanics",
    technician: "John Doe",
    subject: "Leaking Oil",
    equipment: "CNC Machine",
    scheduledDate: "2022-10-10",
    duration: "3 hours",
    requestType: "Corrective",
  },
  {
    id: "2",
    teamName: "Electricians",
    technician: "Jane Smith",
    subject: "Power Failure",
    equipment: "Laser Cutter",
    scheduledDate: "2022-12-01",
    duration: "2 hours",
    requestType: "Preventive",
  },
  {
    id: "3",
    teamName: "IT Support",
    technician: "Alice Brown",
    subject: "System Crash",
    equipment: "Laptop",
    scheduledDate: "2022-11-15",
    duration: "1 hour",
    requestType: "Corrective",
  },
  {
    id: "4",
    teamName: "Mechanics",
    technician: "Bob Johnson",
    subject: "Engine Check",
    equipment: "Forklift",
    scheduledDate: "2023-01-05",
    duration: "2 hours",
    requestType: "Preventive",
  },
  {
    id: "5",
    teamName: "Electricians",
    technician: "Charlie Green",
    subject: "Wiring Issue",
    equipment: "3D Printer",
    scheduledDate: "2023-02-12",
    duration: "4 hours",
    requestType: "Corrective",
  },
];
