import React, { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md space-y-16 text-center">
        <h1 className="text-3xl font-medium text-gray-900 sm:text-4xl">
          Reset your password
        </h1>

        <div className="space-y-8">
          {!isSubmitted ? (
            <>
              <h2 className="text-2xl font-medium text-gray-900">
                Forgot your Apple ID password?
              </h2>

              <p className="text-gray-600">
                Enter your email address or phone number and we'll send you
                instructions to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Email or Phone Number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 disabled:opacity-50"
                    aria-label="Continue"
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                    ) : (
                      <ArrowRightIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
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
              </div>

              <h2 className="text-2xl font-medium text-gray-900">
                Check your email
              </h2>

              <p className="text-gray-600">
                We've sent password reset instructions to:
              </p>

              <p className="font-medium text-gray-900">{email}</p>

              <p className="text-sm text-gray-500">
                If you don't see the email, check other places it might be, like
                your junk, spam, social, or other folders.
              </p>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={() => navigate("/auth")}
              className="inline-flex items-center text-sm text-blue-600 hover:underline"
            >
              <ArrowLeftIcon className="mr-1 h-3 w-3" />
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
