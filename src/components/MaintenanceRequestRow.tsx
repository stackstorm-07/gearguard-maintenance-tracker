import { MaintenanceRequest } from "../types/maintenance";

type Props = {
  request: MaintenanceRequest;
  onClick: () => void;
};

const MaintenanceRequestRow = ({ request, onClick }: Props) => {
  return (
    <div className="request-row" onClick={onClick}>
      <strong>{request.subject}</strong>
      <span>{request.maintenanceType}</span>
      <span>{request.priority}</span>
      <span>{request.status}</span>
    </div>
  );
};

export default MaintenanceRequestRow;
