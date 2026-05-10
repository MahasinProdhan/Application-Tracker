import UpcomingEventCard from "./UpcomingEventCard";

const UpcomingEventsList = ({ events }) => (
  <div className="panel p-4">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-app-muted">
        Upcoming Events
      </h3>
      <span className="text-xs text-app-outline-strong">{events.length} scheduled</span>
    </div>

    {events.length ? (
      <div className="mt-3 space-y-3">
        {events.map((event) => (
          <UpcomingEventCard key={event.id} event={event} />
        ))}
      </div>
    ) : (
      <div className="mt-3 rounded-xl border border-dashed border-app-outline bg-app-surface-low px-4 py-5">
        <p className="text-sm font-medium text-app-text">No scheduled events yet</p>
        <p className="mt-1 text-sm text-app-muted">
          Create your first interview or assessment event.
        </p>
      </div>
    )}
  </div>
);

export default UpcomingEventsList;
