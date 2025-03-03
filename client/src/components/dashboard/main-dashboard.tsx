import React from "react";
import { useLocation } from "react-router";
import { DashboardHeader } from "./dashboard-header";

const MainDashboard = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div>
      <DashboardHeader heading={pathname} text="text" />
    </div>
  );
};

export default MainDashboard;
