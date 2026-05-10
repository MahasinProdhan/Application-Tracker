import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../../utils/constants";
import { cn } from "../../utils/classNames";

const MobileSidebar = ({ open, onClose }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 xl:hidden">
      <div className="absolute inset-0 bg-app-primary/10" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-72 border-r border-app-outline bg-app-surface-low p-6">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-lg font-semibold text-app-primary">CareerTrack</p>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-app-surface-container">
            <X size={18} className="text-app-secondary" />
          </button>
        </div>
        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "block rounded-full px-4 py-3 text-sm font-semibold transition",
                  isActive
                    ? "bg-app-secondary-soft text-app-secondary"
                    : "text-app-secondary hover:bg-app-surface-container"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileSidebar;
