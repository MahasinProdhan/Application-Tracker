import { parseCalendarDate } from "../../utils/calendar";

const weekdayLabels = ["Mon", "", "Wed", "", "Fri", "", ""];
const intensityClasses = [
  "bg-app-surface-container",
  "bg-app-secondary-soft",
  "bg-[#b7c8e1]",
  "bg-app-secondary",
  "bg-app-primary",
];

const toDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getGridStart = (today) => {
  const dayIndex = (today.getDay() + 6) % 7;
  const start = new Date(today);
  start.setDate(today.getDate() - dayIndex - 52 * 7);

  return start;
};

const buildWeeks = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = getGridStart(today);

  return Array.from({ length: 53 }, (_, weekIndex) =>
    Array.from({ length: 7 }, (_day, dayIndex) => {
      const date = new Date(start);
      date.setDate(start.getDate() + weekIndex * 7 + dayIndex);

      return {
        date,
        key: toDateKey(date),
        isFuture: date > today,
      };
    })
  );
};

const getMonthLabel = (week) => {
  const firstDay = week[0].date;
  const previousDay = new Date(firstDay);
  previousDay.setDate(firstDay.getDate() - 1);

  if (firstDay.getDate() <= 7 || firstDay.getMonth() !== previousDay.getMonth()) {
    return new Intl.DateTimeFormat("en-US", { month: "short" }).format(firstDay);
  }

  return "";
};

const getStreak = (activityMap) => {
  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  while (activityMap.get(toDateKey(cursor)) > 0) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

const getIntensity = (count, maxCount) => {
  if (!count) {
    return 0;
  }

  if (maxCount <= 1) {
    return 1;
  }

  return Math.min(4, Math.max(1, Math.ceil((count / maxCount) * 4)));
};

const getRangeLabel = (weeks) => {
  const start = weeks[0][0].date;
  const end = weeks[weeks.length - 1][weeks[0].length - 1].date;

  return `${new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(start)} - ${new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(end)}`;
};

const ApplicationActivityHeatmap = ({ activity = [], totalApplications = 0 }) => {
  const weeks = buildWeeks();
  const activityMap = new Map(activity.map((item) => [item.date, item.value]));
  const activeDays = activity.filter((item) => item.value > 0).length;
  const maxCount = Math.max(0, ...activity.map((item) => item.value));
  const currentStreak = getStreak(activityMap);
  const rangeLabel = getRangeLabel(weeks);
  const stats = [
    { label: "Current streak", value: currentStreak },
    { label: "Active days", value: activeDays },
    { label: "Applications", value: totalApplications },
  ];

  return (
    <div className="panel p-4 md:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-app-text">Application Activity</h2>
          <p className="text-sm text-app-muted">Stay consistent with your job applications</p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:items-end">
          <p className="text-xs font-medium text-app-muted">{rangeLabel}</p>
          <div className="grid w-full grid-cols-3 gap-3 sm:w-[360px] sm:gap-5">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-0 text-center">
                <p className="text-lg font-semibold leading-6 text-app-text">{stat.value}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase leading-4 tracking-[0.12em] text-app-muted sm:text-[11px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto pb-1">
        <div className="min-w-[760px]">
          <div className="ml-8 grid grid-cols-[repeat(53,minmax(0,1fr))] gap-1 text-[10px] text-app-muted">
            {weeks.map((week) => (
              <span key={week[0].key} className="h-4">
                {getMonthLabel(week)}
              </span>
            ))}
          </div>

          <div className="mt-1 flex gap-2">
            <div className="grid grid-rows-7 gap-1 text-[10px] leading-3 text-app-muted">
              {weekdayLabels.map((label, index) => (
                <span key={`${label}-${index}`} className="h-3">
                  {label}
                </span>
              ))}
            </div>

            <div className="grid flex-1 grid-cols-[repeat(53,minmax(0,1fr))] gap-1">
              {weeks.map((week) => (
                <div key={week[0].key} className="grid grid-rows-7 gap-1">
                  {week.map((day) => {
                    const count = activityMap.get(day.key) || 0;
                    const intensity = day.isFuture ? 0 : getIntensity(count, maxCount);
                    const label = new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(parseCalendarDate(day.key));

                    return (
                      <div
                        key={day.key}
                        className={`h-3 rounded-[3px] border border-app-outline/70 transition hover:ring-1 hover:ring-app-secondary ${intensityClasses[intensity]}`}
                        title={`${label}: ${count} application${count === 1 ? "" : "s"}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-end gap-2 text-[11px] text-app-muted">
            <span>Less</span>
            {intensityClasses.map((className, index) => (
              <span
                key={className}
                className={`h-3 w-3 rounded-[3px] border border-app-outline/70 ${className}`}
                aria-label={`Activity level ${index}`}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationActivityHeatmap;
