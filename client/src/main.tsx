import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <StrictMode>
      <AuthProvider>
        <Toaster />
        <App />
      </AuthProvider>
    </StrictMode>
  </HelmetProvider>
);
