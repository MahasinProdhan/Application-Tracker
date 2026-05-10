import { BriefcaseBusiness, CalendarDays, Clock3 } from "lucide-react";
import {
  CALENDAR_EVENT_STYLES,
  getRelativeLabel,
  getShortDateLabel,
} from "../../utils/calendar";

const UpcomingEventCard = ({ event }) => {
  const style = CALENDAR_EVENT_STYLES[event.type];

  return (
    <div className={`rounded-xl border p-3.5 transition hover:bg-app-surface-low ${style.card}`}>
      <div className="flex items-center justify-between gap-3">
        <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${style.chip}`}>
          {style.label}
        </span>
        <span className="text-xs text-app-muted">{getShortDateLabel(event.date)}</span>
      </div>

      <div className="mt-2.5">
        <p className="text-sm font-semibold text-app-text">{event.title}</p>
        <p className="mt-1 text-sm text-app-secondary">{event.company}</p>
      </div>

      <div className="mt-3 space-y-1.5 text-xs text-app-muted">
        <div className="flex items-center gap-2">
          <CalendarDays size={14} />
          <span>{getRelativeLabel(event.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock3 size={14} />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <BriefcaseBusiness size={14} />
          <span>{style.label}</span>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventCard;
