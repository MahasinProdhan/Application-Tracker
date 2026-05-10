import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import AvatarMenu from "./AvatarMenu";

const TITLES = {
  "/dashboard": {
    eyebrow: "Overview",
    title: "Dashboard",
  },
  "/applications": {
    eyebrow: "Pipeline",
    title: "Applications",
  },
  "/kanban": {
    eyebrow: "Workflow",
    title: "Kanban",
  },
  "/analytics": {
    eyebrow: "Insights",
    title: "Analytics",
  },
  "/calendar": {
    eyebrow: "Schedule",
    title: "Calendar",
  },
  "/profile": {
    eyebrow: "Account",
    title: "Profile settings",
  },
};

const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const current = TITLES[location.pathname] || TITLES["/dashboard"];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-app-outline bg-app-background px-4 py-5 md:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-full border border-app-outline bg-app-surface p-2.5 xl:hidden"
        >
          <Menu size={18} className="text-app-secondary" />
        </button>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-app-outline-strong">
            {current.eyebrow}
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-app-text">
            {current.title}
          </h1>
        </div>
      </div>

      <AvatarMenu />
    </header>
  );
};

export default Header;
