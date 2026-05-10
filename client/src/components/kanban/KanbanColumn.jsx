import KanbanCard from "./KanbanCard";

const KanbanColumn = ({ title, applications }) => (
  <div className="panel min-h-[320px] p-4">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
        {applications.length}
      </span>
    </div>
    <div className="space-y-3">
      {applications.map((application) => (
        <KanbanCard key={application._id} application={application} />
      ))}
    </div>
  </div>
);

export default KanbanColumn;
