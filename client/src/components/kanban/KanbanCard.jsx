import StatusBadge from "../common/StatusBadge";
import { formatDate } from "../../utils/date";

const KanbanCard = ({ application }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="space-y-2">
      <p className="font-semibold text-gray-900">{application.companyName}</p>
      <p className="text-sm text-gray-500">{application.role}</p>
      <p className="text-xs text-gray-500">Applied {formatDate(application.appliedDate)}</p>
    </div>
    <div className="mt-4">
      <StatusBadge status={application.status} />
    </div>
  </div>
);

export default KanbanCard;
