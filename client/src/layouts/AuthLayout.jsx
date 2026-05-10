import { Outlet } from "react-router-dom";

const AuthLayout = () => (
  <div className="min-h-screen bg-[#f7f6f4]">
    <Outlet />
  </div>
);

export default AuthLayout;