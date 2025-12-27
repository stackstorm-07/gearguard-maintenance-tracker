import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MaintenanceAPI } from "../api/maintenance.api";
import "./MaintenanceRequestPage.css";

const COMPANY_ID = "my-company-id";

const MaintenanceRequestPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "Test activity",
    createdBy: "Mitchell Admin",
    maintenanceFor: "Equipment",
    equipmentId: "Acer Laptop/LP/203/19281928",
    category: "Computers",
    requestDate: new Date().toISOString().split("T")[0],
    type: "Corrective",
    teamId: "Internal Maintenance",
    technicianId: "Aka Foster",
    scheduledDate: "2025-12-28T14:30",
    duration: 0,
    priority: "Medium",
    stage: "New Request",
    notes: "",
    instructions: "",
  });

  const [activeTab, setActiveTab] =
    useState<"notes" | "instructions">("notes");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePriorityClick = (level: "Low" | "Medium" | "High") => {
    setFormData(prev => ({ ...prev, priority: level }));
  };

  const submit = async () => {
    await MaintenanceAPI.create({
      subject: formData.subject,
      createdBy: formData.createdBy,
      maintenanceFor:
        formData.maintenanceFor === "Equipment"
          ? "EQUIPMENT"
          : "WORK_CENTER",
      equipmentId: formData.equipmentId,
      categoryId: formData.category,
      requestDate: formData.requestDate,
      maintenanceType:
        formData.type === "Corrective" ? "CORRECTIVE" : "PREVENTIVE",
      teamId: formData.teamId,
      technicianId: formData.technicianId,
      scheduledDate: formData.scheduledDate,
      duration: Number(formData.duration),
      priority: formData.priority.toUpperCase(),
      status: "NEW",
      notes: formData.notes,
      instructions: formData.instructions,
      companyId: "my-company-id",
    });

    alert("Request created successfully");
    navigate("/requests");
  };


  return (
    <div className="page-container">
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>
            Maintenance Requests / {formData.subject}
          </div>
          <h1 style={{ marginTop: "4px" }}>{formData.subject}</h1>
        </div>
      </div>

      {/* MAIN FORM CARD — YOUR FULL FORM IS HERE */}
      <div className="card">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          
          {/* LEFT COLUMN */}
          <div>
            <div className="form-group">
              <label className="form-label">Created By</label>
              <input name="createdBy" value={formData.createdBy} onChange={handleChange} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Maintenance For</label>
              <select name="maintenanceFor" value={formData.maintenanceFor} onChange={handleChange} className="form-select">
                <option value="Equipment">Equipment</option>
                <option value="Work Center">Work Center</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Equipment</label>
              <div className="form-input">{formData.equipmentId}</div>
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <input name="category" value={formData.category} onChange={handleChange} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Request Date</label>
              <input type="date" value={formData.requestDate} disabled className="form-input" />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <div className="form-group">
              <label className="form-label">Technician</label>
              <input name="technicianId" value={formData.technicianId} onChange={handleChange} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Scheduled Date</label>
              <input type="datetime-local" name="scheduledDate" value={formData.scheduledDate} onChange={handleChange} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Duration</label>
              <input type="number" name="duration" value={formData.duration} onChange={handleChange} className="form-input" />
            </div>
          </div>
        </div>

        {/* NOTES / INSTRUCTIONS */}
        <div style={{ marginTop: "40px" }}>
          <div className="tab-header">
            <button className={`tab-btn ${activeTab === "notes" ? "active" : ""}`} onClick={() => setActiveTab("notes")}>
              Notes
            </button>
            <button className={`tab-btn ${activeTab === "instructions" ? "active" : ""}`} onClick={() => setActiveTab("instructions")}>
              Instructions
            </button>
          </div>

          <textarea
            name={activeTab}
            value={activeTab === "notes" ? formData.notes : formData.instructions}
            onChange={handleChange}
            className="form-input"
            rows={4}
          />
        </div>

        {/* SAVE BUTTON */}
        <div style={{ marginTop: "32px" }}>
          <button className="primary-btn" onClick={submit}>
            Save Maintenance Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceRequestPage;
