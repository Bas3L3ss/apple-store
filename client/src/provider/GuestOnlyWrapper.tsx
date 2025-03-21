import { ReactNode } from "react";
import { Navigate, useSearchParams } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import LoadingState from "../components/loading";

const GuestOnlyWrapper = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  if (isLoading) {
    return <LoadingState />;
  }
  if (isLoggedIn) {
    return <Navigate to={redirect} />;
  } else {
    return children;
  }
};

export default GuestOnlyWrapper;
