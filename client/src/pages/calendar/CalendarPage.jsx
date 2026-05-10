import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import CalendarGrid from "../../components/calendar/CalendarGrid";
import CalendarToolbar from "../../components/calendar/CalendarToolbar";
import EventFilters from "../../components/calendar/EventFilters";
import ScheduleEventModal from "../../components/calendar/ScheduleEventModal";
import UpcomingEventsList from "../../components/calendar/UpcomingEventsList";
import { calendarEvents } from "../../utils/calendar";

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 1));
  const [activeFilter, setActiveFilter] = useState("all");
  const [events, setEvents] = useState(calendarEvents);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const filteredEvents = useMemo(() => {
    if (activeFilter === "all") {
      return events;
    }

    return events.filter((event) => event.type === activeFilter);
  }, [activeFilter, events]);

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

  const handleScheduleEvent = async (formData) => {
    setSubmitting(true);
    try {
      const nextEvent = {
        id: `evt-${Date.now()}`,
        type: formData.type,
        company: formData.company,
        title: formData.title,
        date: formData.date,
        time: formData.time
          ? new Date(`1970-01-01T${formData.time}`).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })
          : "Flexible time",
        notes: formData.notes,
      };

      setEvents((current) => [...current, nextEvent]);
      setCurrentMonth(
        new Date(
          new Date(formData.date).getFullYear(),
          new Date(formData.date).getMonth(),
          1
        )
      );
      setIsScheduleModalOpen(false);
      toast.success("Event scheduled");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <CalendarToolbar
        currentMonth={currentMonth}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
        onScheduleEvent={() => setIsScheduleModalOpen(true)}
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <CalendarGrid currentMonth={currentMonth} events={filteredEvents} />

        <div className="space-y-4">
          <EventFilters activeFilter={activeFilter} onChange={setActiveFilter} />
          <UpcomingEventsList events={upcomingEvents} />
        </div>
      </div>

      <ScheduleEventModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSubmit={handleScheduleEvent}
        submitting={submitting}
      />
    </div>
  );
};

export default CalendarPage;
