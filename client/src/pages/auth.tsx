import React, { useEffect, useState } from "react";
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import SEO from "../components/SEO";
import { toast } from "sonner";

export default function AppleAuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, register, token } = useAuth();
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    // Clear form fields when switching modes
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here

    if (!isSignIn) {
      const formdata = {
        email: email,
        password: password,
        username: `${firstName} ${lastName}`,
      };
      try {
        register(formdata);
      } catch (error) {
        console.log(error);
      }
    } else {
      const formdata = {
        email: email,
        password: password,
      };
      login(formdata, rememberMe);
    }
  };
  useEffect(() => {
    // illusion, will find workaround
    document.title = `${isSignIn ? "Sign In" : "Sign Up"} - Apple Store`;
  }, [isSignIn]);

  if (token) {
    toast.info("You shouldnt be here, redirecting...");
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <SEO
        title={`${isSignIn ? "Sign In" : "Sign Up"} - Apple Store`}
        description="Authenticate yourself for full Apple experience"
      />
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12">
        <div className="w-full max-w-md space-y-16 text-center">
          <h1 className="text-3xl font-medium text-gray-900 sm:text-4xl">
            {isSignIn
              ? "Sign in for faster checkout."
              : "Create your Apple account."}
          </h1>

          <div className="space-y-8">
            <h2 className="text-2xl font-medium text-gray-900">
              {isSignIn ? "Sign in to Apple Store" : "Sign up for Apple Store"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isSignIn && (
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                      required={!isSignIn}
                    />
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                      required={!isSignIn}
                    />
                  </div>
                </div>
              )}

              <div className="relative">
                <input
                  type="text"
                  placeholder="Email or Phone Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:border-blue-500 focus:outline-none"
                  required
                />
                {isSignIn && (
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
                    aria-label="Continue"
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:border-blue-500 focus:outline-none"
                  required={!isSignIn}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              {!isSignIn ? (
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Create Account
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Login Account
                </button>
              )}
            </form>

            <div className="space-y-4 text-center">
              {isSignIn && (
                <button
                  onClick={() => navigate("/auth/forgot")}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password? →
                </button>
              )}

              <div className="text-sm text-gray-700">
                {isSignIn
                  ? "Don't have an Apple Account? "
                  : "Already have an Apple Account? "}
                <button
                  onClick={toggleAuthMode}
                  className="text-blue-600 hover:underline"
                >
                  {isSignIn ? "Create yours now. →" : "Sign in instead. →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
