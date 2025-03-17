import { ReactNode, useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import { useAuth } from "../contexts/AuthContext";
import GlobalLoader from "../components/global-loader";

const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const { connectSocket, disconnectSocket } = useCartStore();
  const { account, isLoading } = useAuth();

  useEffect(() => {
    if (account?._id) {
      connectSocket(account._id);
    }

    return () => {
      disconnectSocket();
    };
  }, [account, connectSocket, disconnectSocket]);

  if (isLoading) {
    return <GlobalLoader />;
  }

  return children;
};

export default WebSocketProvider;
