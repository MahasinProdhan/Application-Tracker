import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import CalendarGrid from "../../components/calendar/CalendarGrid";
import CalendarToolbar from "../../components/calendar/CalendarToolbar";
import EventFilters from "../../components/calendar/EventFilters";
import ScheduleEventModal from "../../components/calendar/ScheduleEventModal";
import UpcomingEventsList from "../../components/calendar/UpcomingEventsList";
import { calendarEvents, parseCalendarDate } from "../../utils/calendar";
import {
  createCalendarEventRequest,
  getCalendarEventsRequest,
} from "../../services/calendarEventService";

const formatEventTime = (time) => {
  if (!time) {
    return "Flexible time";
  }

  return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

const normalizeEvent = (event) => ({
  ...event,
  id: event._id,
  time: formatEventTime(event.time),
});

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 1));
  const [activeFilter, setActiveFilter] = useState("all");
  const [events, setEvents] = useState(calendarEvents);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadEvents = async () => {
    const data = await getCalendarEventsRequest();
    setEvents(data.events.map(normalizeEvent));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    if (activeFilter === "all") {
      return events;
    }

    return events.filter((event) => event.type === activeFilter);
  }, [activeFilter, events]);

  const upcomingEvents = useMemo(
    () =>
      [...filteredEvents]
        .sort((left, right) => parseCalendarDate(left.date) - parseCalendarDate(right.date))
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
      const data = await createCalendarEventRequest(formData);

      setEvents((current) => [...current, normalizeEvent(data.event)]);
      const eventDate = parseCalendarDate(formData.date);
      setCurrentMonth(
        new Date(eventDate.getFullYear(), eventDate.getMonth(), 1)
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
