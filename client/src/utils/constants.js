export const APPLICATION_STATUSES = [
  "Applied",
  "OA Scheduled",
  "OA Cleared",
  "Shortlisted",
  "Interview Scheduled",
  "HR Round",
  "Technical Round",
  "Final Round",
  "Rejected",
  "Ghosted",
  "Offer Received",
  "Accepted",
];

export const STATUS_COLORS = {
  Applied: "border border-app-outline bg-app-surface-container text-app-muted",
  "OA Scheduled": "border border-amber-200 bg-amber-50 text-amber-700",
  "OA Cleared": "border border-amber-200 bg-amber-50 text-amber-700",
  Shortlisted: "border border-amber-200 bg-amber-50 text-amber-700",
  "Interview Scheduled": "border border-amber-200 bg-amber-50 text-amber-700",
  "HR Round": "border border-amber-200 bg-amber-50 text-amber-700",
  "Technical Round": "border border-amber-200 bg-amber-50 text-amber-700",
  "Final Round": "border border-amber-200 bg-amber-50 text-amber-700",
  Rejected: "border border-red-200 bg-red-50 text-red-700",
  Ghosted: "border border-app-outline bg-app-surface-variant text-app-muted",
  "Offer Received": "border border-blue-200 bg-blue-50 text-blue-700",
  Accepted: "border border-green-200 bg-green-50 text-green-700",
};

export const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Applications", path: "/applications" },
  { label: "Kanban", path: "/kanban" },
  { label: "Calendar", path: "/calendar" },
];
