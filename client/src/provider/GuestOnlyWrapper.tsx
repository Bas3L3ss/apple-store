import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const GuestOnlyWrapper = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
};

export default GuestOnlyWrapper;
