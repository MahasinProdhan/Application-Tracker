import KanbanColumn from "./KanbanColumn";

const columnGroups = [
  { title: "Applied", statuses: ["Applied", "OA Scheduled", "OA Cleared"] },
  { title: "In Progress", statuses: ["Shortlisted", "Interview Scheduled", "HR Round", "Technical Round", "Final Round"] },
  { title: "Closed", statuses: ["Rejected", "Ghosted", "Offer Received", "Accepted"] },
];

const KanbanBoard = ({ applications }) => (
  <div className="grid gap-6 xl:grid-cols-3">
    {columnGroups.map((group) => (
      <KanbanColumn
        key={group.title}
        title={group.title}
        applications={applications.filter((application) =>
          group.statuses.includes(application.status)
        )}
      />
    ))}
  </div>
);

export default KanbanBoard;
