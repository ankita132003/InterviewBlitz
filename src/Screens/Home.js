import React from "react";
import Header from "../Components/Header";
import HomeCard from "../Components/HomeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { Route } from "react-router-dom";

const Home = () => {
  return (
    <div class="bg-gradient-to-r from-indigo-600 via-purple-400 to-pink-500 h-full min-h-screen">
      <Header />
      <div className="container mx-auto px-2 py-4 ">
        <div className="text-center text-white">
          <div className="text-4xl font-bold"> WELCOME TO INTERVIEW BLITZ</div>
          <div className="font-serif py-2">
            Interview and Hiring in fast forword way...
          </div>
        </div>
        <div className=" lg:grid lg:grid-cols-4 md:grid md:grid-cols-1  gap-20 ">
          <a href="/scheduleInterview">
            <HomeCard
              icon={
                <FontAwesomeIcon icon={faVideo} className="text-white h-10" />
              }
              title={"Schedule Interview"}
              description={"Create new Interview meeting"}
            />
          </a>
          <a href="/joinMeeting">
            <HomeCard
              icon={
                <FontAwesomeIcon
                  icon={faSquarePlus}
                  className="text-white h-10"
                />
              }
              title={"Join a Meeting"}
              description={"Join via Invitation"}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
