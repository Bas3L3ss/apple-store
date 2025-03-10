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
interface Context {
  token: string | null;
  account: User | null;
  isLoggedIn: boolean;
  register: (payload: {
    username: string;
    email: string;
    password: string;
  }) => Promise<unknown>;
  login: (payload: { email: string; password: string }) => Promise<unknown>;
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
    sessionStorage.getItem("token") || initContext.token
  );

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (token !== storedToken) {
      if (token) {
        sessionStorage.setItem("token", token);
      } else {
        sessionStorage.removeItem("token");
      }
    }
  }, [token]);

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
    async (formData: { email: string; password: string }) => {
      setIsLoading(true);
      try {
        const {
          data: { data: accountData, token: accessToken },
        } = await axios.post("/auth/login", formData);
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

  const logout = useCallback(() => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    setAccount(null);
    setToken(null);
  }, []);

  const loginWithToken = useCallback(async () => {
    if (!token) return; // Fix: Use token from state instead of passing it as an argument

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
      if (isAxiosError(error) && error.response?.status === 401) {
        setToken(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]); // Fix: Memoized with correct dependency

  useEffect(() => {
    if (!isLoggedIn && !account && token) loginWithToken();
  }, [isLoggedIn, account, token, loginWithToken]); // No redundant dependencies

  const value = useMemo(
    () => ({ token, account, isLoggedIn, register, login, logout, isLoading }),
    [token, account, isLoggedIn, isLoading, register, login, logout]
  );

  return <Provider value={value}>{children}</Provider>;
};
