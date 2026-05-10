import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AvatarMenu = () => {
  const { user, logout } = useAuth();
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

  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-3 rounded-full border border-app-outline bg-app-surface px-2.5 py-2 transition hover:bg-app-surface-low"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-app-primary text-xs font-semibold text-white">
          {initials || <User size={16} />}
        </div>
        <div className="hidden text-left md:block">
          <p className="text-sm font-medium text-app-text">{user?.name}</p>
          <p className="text-xs text-app-muted">{user?.email}</p>
        </div>
        <ChevronDown
          size={16}
          className={`text-app-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute right-0 top-[calc(100%+10px)] z-50 w-64 origin-top-right rounded-xl border border-app-outline bg-app-surface p-2 shadow-panel transition duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="border-b border-app-outline px-3 py-3">
          <p className="text-sm font-semibold text-app-text">{user?.name}</p>
          <p className="mt-1 text-xs text-app-muted">{user?.email}</p>
        </div>

        <div className="pt-2">
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-app-secondary transition hover:bg-app-surface-low"
          >
            <Settings size={16} />
            Profile settings
          </Link>

          <button
            onClick={async () => {
              setOpen(false);
              await logout();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-app-secondary transition hover:bg-app-surface-low"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarMenu;
