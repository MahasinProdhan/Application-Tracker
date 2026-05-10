import { STATUS_COLORS } from "../../utils/constants";
import { cn } from "../../utils/classNames";

const StatusBadge = ({ status }) => (
  <span
    className={cn(
      "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
      STATUS_COLORS[status]
    )}
  >
    {status}
  </span>
);

export default StatusBadge;
