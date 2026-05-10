import { CALENDAR_FILTERS } from "../../utils/calendar";

const EventFilters = ({ activeFilter, onChange }) => (
  <div className="panel p-5">
    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-app-muted">
      Event Filters
    </h3>
    <div className="mt-4 space-y-2">
      {CALENDAR_FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onChange(filter.value)}
          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
            activeFilter === filter.value
              ? "bg-app-secondary-soft text-app-secondary"
              : "text-app-secondary hover:bg-app-surface-low"
          }`}
        >
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  </div>
);

export default EventFilters;
