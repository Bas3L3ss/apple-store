import { useState, useEffect, ReactNode } from "react";

import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

const AppleAuthWrapper = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn: isAuthenticated } = useAuth();
  const [showAnnouncement, setShowAnnouncement] = useState(!isAuthenticated);
  const navigate = useNavigate();

  // Update announcement visibility when authentication status changes
  useEffect(() => {
    setShowAnnouncement(!isAuthenticated);
  }, [isAuthenticated]);

  // Apple-style authentication announcement
  const AuthenticationAnnouncement = () => (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="w-full p-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Please In Before Proceed
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Sign in to access your content and continue
        </p>

        <div className="flex flex-col space-y-4">
          <Button
            className="w-full bg-white text-black hover:bg-gray-200 transition-colors duration-200"
            onClick={() => navigate("/auth")}
          >
            Sign In
          </Button>
          <div className="text-center">
            <span className="text-sm text-gray-400">
              Need an Apple ID?{" "}
              <a href="/auth" className="text-blue-400 hover:underline">
                Create one now
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showAnnouncement ? (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <AuthenticationAnnouncement />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default AppleAuthWrapper;
