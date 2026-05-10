import { Outlet } from "react-router-dom";

const AuthLayout = () => (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
    <div className="absolute inset-0 bg-grid bg-[size:26px_26px] opacity-40" />
    <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />
    <div className="relative z-10 w-full max-w-md">
      <Outlet />
    </div>
  </div>
);

export default AuthLayout;
