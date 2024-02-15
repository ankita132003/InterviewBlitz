import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { auth } from "../firebaseConfig"; // Import your Firebase configuration file
import { signOut } from "firebase/auth";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const getUser =() => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser(user);
          setLoading(false);
        }
        if (!user) {
          setUser(null);
          setLoading(false);
        }
      });
    };
    return getUser();
  }, []);

  const login = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        setIsLoggedIn(true);
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });

    console.log("User Logged In");
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setIsLoggedIn(false);
        console.log("signout");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {user? (
        <div className="container mx-auto px-2 py-4 ">
          <div className="flex justify-between">
            <div className="flex">
              <img src="logo2.png" className="w-10 h-10  rounded-full" />
              <span className="font-sarif font-bold text-xl text-white px-2 grid justify-items-center items-center">
                Interview Blitz
              </span>
            </div>
            <a href="/">
              <img
                class="bg-pink-400 hover:bg-pink-500 h-10 w-10 rounded-full  "
                src={user.photoURL} onClick={logout}
              />
            </a>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-2 py-4 ">
          <div className="flex justify-between">
            <div className="flex">
              <img src="logo2.png" className="w-10 h-10  rounded-full" />
              <span className="font-sarif font-bold text-xl text-white px-2 grid justify-items-center items-center">
                Interview Blitz
              </span>
            </div>
            <div>
              <button
                class="bg-pink-400 hover:bg-pink-500 px-4 py-1 font-sans text-white font-bold font-large rounded-full"
                onClick={login}
              >
                Login <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
