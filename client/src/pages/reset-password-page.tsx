import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AppleLogo from "../icon/Apple";
import SEO from "../components/SEO";
import { resetPassword } from "../action/auth";
import { toast } from "sonner";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePassword()) return;

    setIsLoading(true);

    try {
      // Replace with your actual API endpoint

      await resetPassword(password, token);

      setResetSuccess(true);

      // Redirect to login after a delay
      setTimeout(() => {
        navigate("/auth");
      }, 1500);
    } catch {
      setPasswordError("Invalid token.");
      toast.error("Invalid token", {
        description:
          "Please return to this page and fill in email to get a new token",
        action: {
          label: "Go to page",
          onClick: () => navigate("/auth/forgot"),
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (resetSuccess) {
    return (
      <>
        <SEO
          description="Reset password of your account"
          title="Reset Success | Apple"
        />
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
          <div className="w-full max-w-md text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h1 className="mt-4 text-2xl font-medium text-gray-900">
              Password Reset Complete
            </h1>
            <p className="mt-2 text-gray-600">
              Your password has been successfully updated.
            </p>
            <p className="mt-4 text-gray-600">Redirecting you to login...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        description="Reset password of your account"
        title="Reset Password | Apple"
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
        <div className="w-full max-w-md">
          {/* Apple Logo */}
          <div className="flex justify-center  ">
            <AppleLogo size={100} />
          </div>

          <h1 className="text-2xl font-medium text-center text-gray-900 mb-6">
            Reset Your Password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

            {passwordError && (
              <div className="text-sm text-red-600">{passwordError}</div>
            )}

            <div className="text-xs text-gray-500">
              Your password must be at least 8 characters and should include a
              combination of numbers, letters and special characters.
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/auth"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Return to login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
