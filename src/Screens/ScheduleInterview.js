import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

const ScheduleInterview = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {currentUser ? <div>Schedule Interview</div> : <div>user not found</div>}
    </div>
  );
};

export default ScheduleInterview;
