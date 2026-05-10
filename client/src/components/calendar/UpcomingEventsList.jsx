import UpcomingEventCard from "./UpcomingEventCard";

const UpcomingEventsList = ({ events }) => (
  <div className="panel p-5">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-app-muted">
        Upcoming Events
      </h3>
      <span className="text-xs text-app-outline-strong">{events.length} scheduled</span>
    </div>

    <div className="mt-4 space-y-3">
      {events.map((event) => (
        <UpcomingEventCard key={event.id} event={event} />
      ))}
    </div>
  </div>
);

export default UpcomingEventsList;
