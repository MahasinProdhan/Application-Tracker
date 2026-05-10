import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Button from "../common/Button";
import { getMonthLabel } from "../../utils/calendar";

const CalendarToolbar = ({ currentMonth, onPrevious, onNext, onToday }) => (
  <div className="panel flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-app-text">
        {getMonthLabel(currentMonth)}
      </h2>
      <p className="mt-1 text-sm text-app-muted">
        Track interviews, assessments, follow-ups, and closing dates.
      </p>
    </div>

    <div className="flex flex-wrap items-center gap-2">
      <Button variant="secondary" onClick={onToday}>
        Today
      </Button>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          className="rounded-lg border border-app-outline bg-app-surface p-2 text-app-secondary transition hover:bg-app-surface-low"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-lg border border-app-outline bg-app-surface p-2 text-app-secondary transition hover:bg-app-surface-low"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <Button className="gap-2">
        <Plus size={16} />
        Schedule Event
      </Button>
    </div>
  </div>
);

export default CalendarToolbar;
