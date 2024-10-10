import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const userToken = localStorage.getItem("userToken");
      setAuthenticated(!!(user?.uid || (userToken && userToken.length > 0)));
      setLoading(false);
      user && setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return { authenticated, setAuthenticated, loading, user };
};

export default useAuth;
