import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

const ScheduleInterview = () => {
  // const [currentUser, setCurrentUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getUser =() => {
  //     auth.onAuthStateChanged(async (user) => {
  //       if (user) {
  //         console.log(user);
  //         setLoading(false);
  //         setCurrentUser(user);
  //       } else {
  //         setCurrentUser(null);
  //         setLoading(false);
  //       }
  //     });
  //   };
  //   return getUser();
  // }, []);

  return (
    <div>
      {/* 
      {currentUser ? (
        <>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div>Schedule Interview</div>
          )}
        </>
      ) : (
        <div>User not found</div>
      )} */}
 <div>User not found</div>
      {/* {currentUser ? <div>Schedule interview</div> : <div> user not found</div>} */}
    </div>
  );
};

export default ScheduleInterview;
