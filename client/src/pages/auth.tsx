import { FormEvent, useEffect, useState } from "react";
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SEO from "../components/SEO";
import { toast } from "sonner";

export default function AppleAuthPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  // Get auth mode and redirect URL from search params
  const authModeParam = searchParams.get("mode");
  const redirectUrl = searchParams.get("redirect") || "/";

  // Initialize state based on URL parameters
  const [isSignIn, setIsSignIn] = useState(authModeParam !== "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, register, token } = useAuth();

  // Update URL when auth mode changes
  useEffect(() => {
    const newParams = new URLSearchParams(location.search);
    newParams.set("mode", isSignIn ? "signin" : "signup");
    navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
    // Clear any previous errors when switching modes
    setError("");
  }, [isSignIn, location.pathname, navigate, location.search]);

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    // Clear form fields and errors when switching modes
    setPassword("");
    setFirstName("");
    setLastName("");
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!isSignIn) {
        const formdata = {
          email: email,
          password: password,
          username: `${firstName} ${lastName}`.trim(),
        };

        await register(formdata, setIsLoading);
        toast.success("Account created successfully!");
        navigate(redirectUrl);
      } else {
        const formdata = {
          email: email,
          password: password,
        };

        await login(formdata, rememberMe, setIsLoading);
        toast.success("Logged in successfully!");
        navigate(redirectUrl);
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError(
        // @ts-expect-error: no prb
        error.message ||
          (isSignIn
            ? "Failed to sign in. Please check your credentials."
            : "Failed to create account. Please try again.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = `${isSignIn ? "Sign In" : "Sign Up"} - Apple Store`;
  }, [isSignIn]);

  if (token) {
    toast.info("You're already logged in, redirecting...");
    return <Navigate to={redirectUrl} />;
  }

  return (
    <>
      <SEO
        title={`${isSignIn ? "Sign In" : "Sign Up"} - Apple Store`}
        description="Authenticate yourself for full Apple experience"
      />
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12">
        <div className="w-full max-w-md space-y-8 text-center">
          <h1 className="text-3xl font-medium text-gray-900 sm:text-4xl">
            {isSignIn
              ? "Sign in for faster checkout."
              : "Create your Apple account."}
          </h1>

          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-gray-900">
              {isSignIn ? "Sign in to Apple Store" : "Sign up for Apple Store"}
            </h2>

            {error && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

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
                      disabled={isLoading}
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
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:border-blue-500 focus:outline-none"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:border-blue-500 focus:outline-none"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {isSignIn && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember-me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                    <label
                      htmlFor="remember-me"
                      className="text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/auth/forgot")}
                    className="text-sm text-blue-600 hover:underline"
                    disabled={isLoading}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className={`w-full rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isSignIn ? "Signing in..." : "Creating account..."}
                  </span>
                ) : (
                  <span>{isSignIn ? "Sign In" : "Create Account"}</span>
                )}
              </button>
            </form>

            <div className="text-center">
              <div className="text-sm text-gray-700">
                {isSignIn
                  ? "Don't have an Apple Account? "
                  : "Already have an Apple Account? "}
                <button
                  onClick={toggleAuthMode}
                  className="text-blue-600 hover:underline"
                  disabled={isLoading}
                >
                  {isSignIn ? "Create yours now" : "Sign in instead"}{" "}
                  <ArrowRightIcon className="inline h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
