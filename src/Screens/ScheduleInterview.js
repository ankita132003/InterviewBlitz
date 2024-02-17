import React from "react";
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { UserLogin } from "../Authentication/UserLogin"; // Assuming useAuthentication is the custom hook for authentication
import SetInterview from "../Components/SetInterview";


const ScheduleInterview = () => {
  const { isLoggedIn, user, loading, login, logout } = UserLogin();

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-13 h-13 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {user ? (
            <div>
              <SetInterview/>
            </div>
          ) : (
            <div>User Not Found</div>
          )}
        </>
      )}
    </div>
  );
};

export default ScheduleInterview;
