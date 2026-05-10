import { CALENDAR_EVENT_STYLES, isSameDay } from "../../utils/calendar";

const CalendarDayCell = ({ day, currentMonth, today, events }) => {
  const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
  const isToday = isSameDay(day, today);

  return (
    <div
      className={`min-h-24 border-b border-r border-app-outline p-2.5 transition hover:bg-app-surface-low ${
        !isCurrentMonth ? "bg-app-surface-low/50" : "bg-app-surface"
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
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

      <div className="space-y-1">
        {events.slice(0, 2).map((event) => {
          const style = CALENDAR_EVENT_STYLES[event.type];
          return (
            <div
              key={event.id}
              className={`truncate rounded-md border px-2 py-1 text-[10px] font-medium leading-none ${style.chip}`}
              title={`${event.company} - ${event.title}`}
            >
              {event.company} | {event.title}
            </div>
          );
        })}
        {events.length > 2 ? (
          <p className="text-[10px] font-medium text-app-muted">+{events.length - 2} more</p>
        ) : null}
      </div>
    </div>
  );
};

export default CalendarDayCell;
