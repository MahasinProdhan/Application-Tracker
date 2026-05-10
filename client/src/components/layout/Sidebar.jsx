import { BriefcaseBusiness } from "lucide-react";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../../utils/constants";
import { cn } from "../../utils/classNames";

const Sidebar = () => (
  <aside className="hidden w-72 flex-col border-r border-app-outline bg-app-surface-low px-5 py-8 xl:flex">
    <div className="mb-10 flex items-center gap-4 px-3">
      <div className="rounded-full bg-app-primary p-2.5 text-white">
        <BriefcaseBusiness size={18} />
      </div>
      <div>
        <p className="text-lg font-semibold tracking-tight text-app-primary">CareerTrack</p>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-app-secondary">
          Career Pipeline
        </p>
      </div>
    </div>

    <nav className="space-y-1">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              "flex rounded-full px-4 py-3 text-sm font-semibold transition",
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
  </aside>
);

export default Sidebar;
