import StatusBadge from "../common/StatusBadge";
import { formatDate } from "../../utils/date";

const RecentApplications = ({ items }) => (
  <div className="panel overflow-hidden">
    <div className="flex items-center justify-between border-b border-app-outline bg-app-surface-low px-4 py-4 md:px-6">
      <div>
        <h2 className="text-lg font-semibold text-app-text">Recent Applications</h2>
        <p className="text-sm text-app-muted">Latest activity across your pipeline</p>
      </div>
    </div>
    <div className="divide-y divide-app-outline">
      {items.map((application) => (
        <div
          key={application._id}
          className="flex flex-col gap-3 px-4 py-4 transition hover:bg-app-surface-low md:flex-row md:items-center md:justify-between md:px-6"
        >
          <div>
            <p className="font-medium text-app-text">{application.companyName}</p>
            <p className="text-sm text-app-muted">
              {application.role} • {application.location || "Remote / Flexible"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm text-app-muted">{formatDate(application.appliedDate)}</p>
            <StatusBadge status={application.status} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentApplications;
