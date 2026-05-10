import CalendarDayCell from "./CalendarDayCell";
import { getCalendarDays, isSameDay } from "../../utils/calendar";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CalendarGrid = ({ currentMonth, events }) => {
  const today = new Date();
  const days = getCalendarDays(currentMonth);

  return (
    <div className="panel overflow-hidden">
      <div className="grid grid-cols-7 border-b border-app-outline bg-app-surface-low">
        {weekdays.map((day) => (
          <div
            key={day}
            className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-app-muted"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 border-l border-t border-app-outline">
        {days.map((day) => {
          const dayEvents = events.filter((event) => isSameDay(new Date(event.date), day));
          return (
            <CalendarDayCell
              key={day.toISOString()}
              day={day}
              currentMonth={currentMonth}
              today={today}
              events={dayEvents}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
