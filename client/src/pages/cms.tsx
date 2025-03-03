import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "../components/dashboard/dashboard-sidebar";
import { SidebarProvider } from "../components/ui/sidebar";

const CMS = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CMS;
