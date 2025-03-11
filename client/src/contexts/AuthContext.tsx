import {
  createContext,
  useContext,
  useState,
  useEffect,
  type PropsWithChildren,
  useMemo,
  useCallback,
} from "react";
import { axios } from "@/src/lib/utils";
import { User } from "@/src/@types";

import { isAxiosError } from "axios";
import { toast } from "sonner";
interface Context {
  token: string | null;
  account: User | null;
  isLoggedIn: boolean;
  register: (payload: {
    username: string;
    email: string;
    password: string;
  }) => Promise<unknown>;
  login: (
    payload: {
      email: string;
      password: string;
    },
    rememberMe: boolean
  ) => Promise<unknown>;
  logout: () => void;
  isLoading: boolean;
}

const initContext: Context = {
  token: null,
  account: null,
  isLoggedIn: false,
  register: async () => {},
  login: async () => {},
  logout: () => {},
  isLoading: false,
};

// init context
const AuthContext = createContext(initContext);
const { Provider } = AuthContext;

// export the consumer
export const useAuth = () => useContext(AuthContext);

// export the provider
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState(
    sessionStorage.getItem("token") ||
      localStorage.getItem("remember") ||
      initContext.token
  );

  useEffect(() => {
    if (!token) {
      sessionStorage.removeItem("token");
      localStorage.removeItem("remember");
      return;
    }

    setToken((prevToken) => {
      if (localStorage.getItem("remember")) {
        localStorage.setItem("remember", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      return prevToken;
    });
  }, [token]);

  useEffect(() => {
    if (token) loginWithToken();
  }, []);

  const [account, setAccount] = useState(initContext.account);
  const [isLoggedIn, setIsLoggedIn] = useState(initContext.isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

  const register = useCallback(
    async (formData: { username: string; email: string; password: string }) => {
      setIsLoading(true);
      try {
        const {
          data: { data: accountData, token: accessToken },
        } = await axios.post("/auth/register", formData);
        setAccount(accountData);
        setToken(accessToken);
        setIsLoggedIn(true);
        return true;
      } catch (error) {
        // @ts-expect-error: no problem
        throw error?.response?.data?.message || error.message;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const login = useCallback(
    async (
      formData: { email: string; password: string },
      rememberMe: boolean
    ) => {
      setIsLoading(true);
      try {
        const {
          data: { data: accountData, token: JWTToken },
        } = await axios.post("/auth/login", formData);
        setAccount(accountData);
        setToken(JWTToken);
        setIsLoggedIn(true);

        sessionStorage.setItem("token", JWTToken);
        localStorage.removeItem("remember");

        if (rememberMe) {
          localStorage.setItem("remember", JWTToken);
          sessionStorage.removeItem("token");
        }
        return true;
      } catch (error) {
        // @ts-expect-error: no problem
        throw error?.response?.data?.message || error.message;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("remember");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    setAccount(null);
    setToken(null);
  }, []);

  const loginWithToken = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    try {
      const {
        data: { data: accountData, token: accessToken },
      } = await axios("/auth/login", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setAccount(accountData);
      if (accessToken !== token) setToken(accessToken);
      setIsLoggedIn(true);
    } catch (error: unknown) {
      console.error(error);
      if (isAxiosError(error)) {
        if ([400, 401, 404].includes(error.response?.status ?? 0)) {
          toast.warning("Session expired, logging out...");
          logout(); // ✅ Logout directly here instead of in useEffect
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [token, logout]); // Fix: Memoized with correct dependency

  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      loginWithToken();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isLoggedIn, loginWithToken]);

  const value = useMemo(
    () => ({ token, account, isLoggedIn, register, login, logout, isLoading }),
    [token, account, isLoggedIn, isLoading, register, login, logout]
  );

  return <Provider value={value}>{children}</Provider>;
};
