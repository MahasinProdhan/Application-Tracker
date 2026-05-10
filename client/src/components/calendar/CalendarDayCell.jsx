import { CALENDAR_EVENT_STYLES, isSameDay } from "../../utils/calendar";

const CalendarDayCell = ({ day, currentMonth, today, events }) => {
  const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
  const isToday = isSameDay(day, today);

  return (
    <div
      className={`min-h-32 border-b border-r border-app-outline p-3 transition hover:bg-app-surface-low ${
        !isCurrentMonth ? "bg-app-surface-low/50" : "bg-app-surface"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${
            isToday
              ? "bg-app-primary text-white"
              : isCurrentMonth
                ? "text-app-text"
                : "text-app-outline-strong"
          }`}
        >
          {day.getDate()}
        </span>
      </div>

      <div className="space-y-1.5">
        {events.slice(0, 3).map((event) => {
          const style = CALENDAR_EVENT_STYLES[event.type];
          return (
            <div
              key={event.id}
              className={`truncate rounded-md border px-2 py-1 text-[11px] font-medium ${style.chip}`}
              title={`${event.company} - ${event.title}`}
            >
              {event.company} · {event.title}
            </div>
          );
        })}
        {events.length > 3 ? (
          <p className="text-[11px] font-medium text-app-muted">+{events.length - 3} more</p>
        ) : null}
      </div>
    </div>
  );
};

export default CalendarDayCell;
