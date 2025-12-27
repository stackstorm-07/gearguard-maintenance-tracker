import { MaintenanceType, Priority, RequestStatus } from "../../types/enums";

export interface MaintenanceRequest {
  id?: string;
  createdBy: string;
  maintenanceFor: string;
  equipmentId: string;
  categoryId: string;
  requestDate: string;
  maintenanceType: MaintenanceType;
  teamId: string;
  technicianId?: string;
  scheduledDate?: string;
  duration?: number;
  priority: Priority;
  companyId: string;
  status?: RequestStatus;
  createdAt?: number;
}
