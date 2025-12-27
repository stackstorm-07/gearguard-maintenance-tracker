import { MaintenanceRequest } from "../types/maintenance";
import "./maintenance-dialog.css";

type Props = {
  request: MaintenanceRequest;
  onClose: () => void;
};

const MaintenanceRequestDialog = ({ request, onClose }: Props) => {
  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog-card" onClick={e => e.stopPropagation()}>
        <h2>{request.subject}</h2>

        <div className="dialog-grid">
          <Field label="Status" value={request.status} />
          <Field label="Priority" value={request.priority} />
          <Field label="Maintenance Type" value={request.maintenanceType} />
          <Field label="Maintenance For" value={request.maintenanceFor} />
          <Field label="Equipment" value={request.equipmentId} />
          <Field label="Category" value={request.categoryId} />
          <Field label="Team" value={request.teamId} />
          <Field label="Technician" value={request.technicianId} />
          <Field label="Created By" value={request.createdBy} />
          <Field label="Request Date" value={request.requestDate} />
          <Field label="Scheduled Date" value={request.scheduledDate} />
          <Field label="Duration (hrs)" value={String(request.duration)} />
          <Field label="Company ID" value={request.companyId} />
        </div>

        <div className="dialog-section">
          <h4>Notes</h4>
          <p>{request.notes || "—"}</p>
        </div>

        <div className="dialog-section">
          <h4>Instructions</h4>
          <p>{request.instructions || "—"}</p>
        </div>

        <button className="primary-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="dialog-field">
    <span className="label">{label}</span>
    <span className="value">{value}</span>
  </div>
);

export default MaintenanceRequestDialog;
