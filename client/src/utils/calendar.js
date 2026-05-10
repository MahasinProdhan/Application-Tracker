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
  assessment: {
    dot: "bg-amber-500",
    chip: "border-amber-200 bg-amber-50 text-amber-700",
    card: "border-amber-200 bg-amber-50/70",
    label: "Assessment",
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

export const calendarEvents = [];

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
