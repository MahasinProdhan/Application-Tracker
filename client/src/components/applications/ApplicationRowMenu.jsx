import { EllipsisVertical, Eye, PencilLine, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ApplicationRowMenu = ({ application, onView, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (callback) => {
    setOpen(false);
    callback();
  };

  return (
    <div className="relative flex justify-center" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="rounded-lg p-2 text-app-outline-strong opacity-0 transition-opacity duration-200 hover:bg-app-surface-container hover:text-app-secondary group-hover:opacity-100 focus:opacity-100 focus:outline-none"
        aria-label={`Open actions for ${application.companyName}`}
      >
        <EllipsisVertical size={16} />
      </button>

      <div
        className={`absolute right-0 top-[calc(100%+6px)] z-20 w-48 origin-top-right rounded-xl border border-app-outline bg-app-surface p-1.5 shadow-panel transition duration-150 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => handleAction(() => onView(application))}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-app-secondary transition hover:bg-app-surface-low"
        >
          <Eye size={15} />
          View Details
        </button>
        <button
          type="button"
          onClick={() => handleAction(() => onEdit(application))}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-app-secondary transition hover:bg-app-surface-low"
        >
          <PencilLine size={15} />
          Edit Application
        </button>
        <button
          type="button"
          onClick={() => handleAction(() => onDelete(application._id))}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <Trash2 size={15} />
          Delete Application
        </button>
      </div>
    </div>
  );
};

export default ApplicationRowMenu;
