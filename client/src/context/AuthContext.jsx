import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/appwrite/api";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
};

const AuthContext = createContext(INITIAL_STATE);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // Start with loading state

  const checkAuthUser = async () => {
    setIsLoading(true); // Begin loading when checking for user authentication
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
      setIsAuthenticated(false); // Set false if no current user found
      return false;
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);  // Set false on error
      return false;
    } finally {
      setIsLoading(false);  // Stop loading once check is complete
    }
  };

  useEffect(() => {
    const handleAuthCheck = async () => {
      const isUserAuthenticated = await checkAuthUser();
      // Only redirect to login if the user is not authenticated and they are not on the signup page
      if (!isUserAuthenticated && location.pathname !== "/signup") {
        navigate("/login");  // Redirect to login if not authenticated and not on signup page
      }
    };

    handleAuthCheck();
  }, [location, checkAuthUser, navigate]);
}; // Ensure it only runs on initial render

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <p>Loading...</p> : children} {/* Show loading until auth check is done */}
    </AuthContext.Provider>
  );

export const useUserContext = () => useContext(AuthContext);
