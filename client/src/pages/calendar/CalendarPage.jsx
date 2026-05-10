import { useMemo, useState } from "react";
import CalendarGrid from "../../components/calendar/CalendarGrid";
import CalendarToolbar from "../../components/calendar/CalendarToolbar";
import EventFilters from "../../components/calendar/EventFilters";
import UpcomingEventsList from "../../components/calendar/UpcomingEventsList";
import { calendarEvents } from "../../utils/calendar";

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 1));
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredEvents = useMemo(() => {
    if (activeFilter === "all") {
      return calendarEvents;
    }

    return calendarEvents.filter((event) => event.type === activeFilter);
  }, [activeFilter]);

  const upcomingEvents = useMemo(
    () =>
      [...filteredEvents]
        .sort((left, right) => new Date(left.date) - new Date(right.date))
        .slice(0, 5),
    [filteredEvents]
  );

  const handlePrevious = () => {
    setCurrentMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1)
    );
  };

  const handleNext = () => {
    setCurrentMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1)
    );
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  return (
    <div className="space-y-6">
      <CalendarToolbar
        currentMonth={currentMonth}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <CalendarGrid currentMonth={currentMonth} events={filteredEvents} />

        <div className="space-y-4">
          <EventFilters activeFilter={activeFilter} onChange={setActiveFilter} />
          <UpcomingEventsList events={upcomingEvents} />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
