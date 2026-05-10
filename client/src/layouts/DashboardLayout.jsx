import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import MobileSidebar from "../components/layout/MobileSidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-app-background">
      <Sidebar />
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 pb-8 pt-6 md:px-8 md:pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
