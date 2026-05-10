export const CALENDAR_FILTERS = [
  { label: "All Events", value: "all" },
  { label: "Interviews", value: "interview" },
  { label: "Follow-ups", value: "follow-up" },
  { label: "Deadlines", value: "deadline" },
];

export const CALENDAR_EVENT_STYLES = {
  interview: {
    dot: "bg-blue-500",
    chip: "border-blue-200 bg-blue-50 text-blue-700",
    card: "border-blue-200 bg-blue-50/70",
    label: "Interview",
  },
  deadline: {
    dot: "bg-red-500",
    chip: "border-red-200 bg-red-50 text-red-700",
    card: "border-red-200 bg-red-50/70",
    label: "Deadline",
  },
  "follow-up": {
    dot: "bg-gray-500",
    chip: "border-app-outline bg-app-surface-container text-app-muted",
    card: "border-app-outline bg-app-surface-low",
    label: "Follow-up",
  },
};

export const calendarEvents = [
  {
    id: "evt-1",
    type: "interview",
    company: "Acme Corp",
    title: "Technical Interview",
    date: "2026-05-12",
    time: "2:00 PM",
  },
  {
    id: "evt-2",
    type: "deadline",
    company: "Northstar Labs",
    title: "Assessment Submission",
    date: "2026-05-13",
    time: "11:59 PM",
  },
  {
    id: "evt-3",
    type: "follow-up",
    company: "Vantage Systems",
    title: "Recruiter Follow-up",
    date: "2026-05-15",
    time: "10:30 AM",
  },
  {
    id: "evt-4",
    type: "interview",
    company: "Orbital AI",
    title: "HR Round",
    date: "2026-05-16",
    time: "4:00 PM",
  },
  {
    id: "evt-5",
    type: "deadline",
    company: "Crest Data",
    title: "Application Closing Date",
    date: "2026-05-19",
    time: "6:00 PM",
  },
  {
    id: "evt-6",
    type: "interview",
    company: "Pixel Foundry",
    title: "Design Portfolio Review",
    date: "2026-05-20",
    time: "1:00 PM",
  },
  {
    id: "evt-7",
    type: "follow-up",
    company: "Helix Cloud",
    title: "Send Thank-you Note",
    date: "2026-05-21",
    time: "9:00 AM",
  },
  {
    id: "evt-8",
    type: "interview",
    company: "Lumina Tech",
    title: "Final Round",
    date: "2026-05-26",
    time: "3:30 PM",
  },
];

export const getMonthLabel = (date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);

export const getShortDateLabel = (value) => {
  const date = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
};

export const getRelativeLabel = (value) => {
  const target = new Date(value);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.round((target - now) / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays > 1 && diffDays < 7) {
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(target);
  }

  return getShortDateLabel(value);
};

export const getCalendarDays = (currentMonth) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return date;
  });
};

export const isSameDay = (left, right) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();
