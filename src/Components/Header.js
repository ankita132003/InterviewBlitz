import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { UserLogin } from "../Authentication/UserLogin";

const Header = () => {

  const { isLoggedIn, user, loading, login, logout } = UserLogin();
  return (
    <>
      {user? (
        <div className="container mx-auto px-2 py-4 ">
          <div className="flex justify-between">
            <div className="flex">
              <img src="logo2.png" alt="na" className="w-10 h-10  rounded-full" />
              <span className="font-sarif font-bold text-xl text-white px-2 grid justify-items-center items-center">
                Interview Blitz
              </span>
            </div>
            <a href="/">
              <img
                class="bg-pink-400 hover:bg-pink-500 h-10 w-10 rounded-full hover:from-opacity-100 hover:via-opacity-90 hover:to-opacity-80 transform transition-transform duration-300 hover:scale-105 "
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
