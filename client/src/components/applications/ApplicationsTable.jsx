import Button from "../common/Button";
import StatusBadge from "../common/StatusBadge";
import { formatDate } from "../../utils/date";

const ApplicationsTable = ({ applications, onEdit, onDelete }) => (
  <div className="panel overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-app-outline">
        <thead className="bg-app-surface-low">
          <tr className="text-left text-xs uppercase tracking-[0.14em] text-app-muted">
            <th className="px-6 py-4 font-semibold">Company</th>
            <th className="px-6 py-4 font-semibold">Role</th>
            <th className="px-6 py-4 font-semibold">Applied</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Platform</th>
            <th className="px-6 py-4 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-app-outline">
          {applications.map((application) => (
            <tr key={application._id} className="group transition hover:bg-app-surface-low">
              <td className="px-6 py-4">
                <p className="font-medium text-app-text">{application.companyName}</p>
                <p className="text-sm text-app-muted">
                  {application.location || "Location not set"}
                </p>
              </td>
              <td className="px-6 py-4 text-app-text">{application.role}</td>
              <td className="px-6 py-4 text-app-muted">
                {formatDate(application.appliedDate)}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={application.status} />
              </td>
              <td className="px-6 py-4 text-app-muted">
                {application.platform || "Direct"}
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
                  <Button variant="secondary" onClick={() => onEdit(application)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => onDelete(application._id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ApplicationsTable;
