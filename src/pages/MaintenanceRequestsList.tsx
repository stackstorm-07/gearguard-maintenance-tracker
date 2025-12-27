import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MaintenanceAPI } from "../api/maintenance.api";
import { MaintenanceRequest } from "../types/maintenance";
import MaintenanceRequestRow from "../components/MaintenanceRequestRow";
import MaintenanceRequestDialog from "../components/MaintenanceRequestDialog";
import "./maintenance-list.css";

const MaintenanceRequestsList = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [selected, setSelected] = useState<MaintenanceRequest | null>(null);

  useEffect(() => {
    MaintenanceAPI.getAll("my-company-id").then(res =>
      setRequests(res.data)
    );
  }, []);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="list-header">
        <h1>Maintenance Requests</h1>

        <Link to="/requests/new" className="primary-btn">
          + New Request
        </Link>
      </div>

      <div className="card">
        {/* Column headers */}
        <div className="request-row header">
          <span>Subject</span>
          <span>Type</span>
          <span>Priority</span>
          <span>Status</span>
        </div>

        {requests.length === 0 && (
          <p className="empty">No maintenance requests found.</p>
        )}

        {requests.map(req => (
          <MaintenanceRequestRow
            key={req.id}
            request={req}
            onClick={() => setSelected(req)}
          />
        ))}
      </div>

      {selected && (
        <MaintenanceRequestDialog
          request={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default MaintenanceRequestsList;
