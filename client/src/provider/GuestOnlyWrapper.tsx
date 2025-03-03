import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import LoadingState from "../components/loading";

const GuestOnlyWrapper = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingState />;
  }
  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
};

export default GuestOnlyWrapper;
