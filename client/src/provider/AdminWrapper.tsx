import React, { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router";

const AdminWrapper = ({ children }: { children: ReactNode }) => {
  const { account } = useAuth();

  return (
    <>{account?.role == "admin" ? children : <Navigate to={"/not-found"} />}</>
  );
};

export default AdminWrapper;
