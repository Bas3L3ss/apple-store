import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { QueryProvider } from "./provider/QueryClientProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <StrictMode>
      <QueryProvider>
        <AuthProvider>
          <Toaster />
          <App />
        </AuthProvider>
      </QueryProvider>
    </StrictMode>
  </HelmetProvider>
);
