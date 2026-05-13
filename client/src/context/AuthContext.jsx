import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getCurrentUserRequest,
  loginRequest,
  logoutRequest,
  signupRequest,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const { user: currentUser } = await getCurrentUserRequest();
      setUser(currentUser);
    } catch (_error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const signup = async (payload) => {
    const data = await signupRequest(payload);
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    setUser(data.user);
    toast.success(data.message);
    return data;
  };

  const login = async (payload) => {
    const data = await loginRequest(payload);
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    setUser(data.user);
    toast.success(data.message);
    return data;
  };

  const logout = async () => {
    const data = await logoutRequest();
    localStorage.removeItem("token");
    setUser(null);
    toast.success(data.message);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        signup,
        login,
        logout,
        reloadUser: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
