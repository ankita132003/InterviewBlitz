import React from "react";

const HomeCard = ({ title, icon, description }) => {
  return (
    <div className="py-5 hover:from-opacity-100 hover:via-opacity-90 hover:to-opacity-80 transform transition-transform duration-300 hover:scale-105 cursor-pointer">
      <div
        className="rounded-md h-50 p-5 lg:w-64 md:w-full lg:mt-5 lg:mb-5 md:mb-3 ml-10 mr-10 bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-500 flex flex-col justify-center items-center shadow-md bg-slate-400/40 hover:bg-slate-400/20"
      >
        <div className="rounded-full bg-pink-400 h-20 w-20 flex flex-col justify-center items-center">
          <span>{icon}</span>
        </div>

        <span className="text-white font-bold text-xl pt-4">{title}</span>
        <span className="text-white font-serif">{description}</span>
      </div>
    </div>
  );
};

export default HomeCard;
