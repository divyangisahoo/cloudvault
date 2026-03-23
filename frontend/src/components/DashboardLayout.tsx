import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => (
  <div className="flex min-h-screen w-full">
    <Sidebar />
    <main className="flex-1 bg-background p-6 md:p-8 overflow-auto">
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;
