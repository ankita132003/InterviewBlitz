import { useState, useEffect } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig"; // assuming you have your Firebase config in firebaseConfig.js

export const UserLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const getUser = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser(user);
          setLoading(false);
        } else {
          setUser(null);
          setLoading(false);
        }
      });
    };
    return getUser();
  }, []);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setIsLoggedIn(true);
      setUser(user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setIsLoggedIn(false);
        console.log("Sign out successful");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return { isLoggedIn, user, loading, login, logout };
};