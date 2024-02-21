import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  MonthView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AllDayPanel,
  AppointmentTooltip,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import { styled } from "@mui/material/styles";
import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  ListItemText,
  InputLabel,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { UserLogin } from "../Authentication/UserLogin";
import LinearProgress from "@mui/material/LinearProgress";
import { customUUID } from "../Utils/RoomId";
import rolesData from "../data/roles.json";

const AppointmentTooltipCustom = (props) => {
  const { appointmentData } = props;
  console.log(appointmentData.id);
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">Appointment Details</h2>
      <p><strong>job Title:</strong> {appointmentData.title}</p>
      <p><strong> Info:</strong> {appointmentData.interviewInfo}</p>
      <div><strong>Role :</strong> {appointmentData.Role}</div>
      <p><strong>Start Date:</strong>{" "}{new Date(appointmentData.startDate).toLocaleString()}</p>
      <p><strong>End Date:</strong>{" "}{new Date(appointmentData.endDate).toLocaleString()}</p>
      <Link to={`/room/${appointmentData.roomId}`}>Attend Interview</Link>
    </div>
  );
};

const TextEditor = (props) => {
  console.log(props);
  if (props.type === "multilineTextEditor") {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDefinedRoles, setSelectedDefinedRoles] = useState([]);

  const onCustomFieldChange = (field, value) => {
    onFieldChange({ [field]: value });
  };

  const handleRoleChange = (event) => {
    setSelectedDefinedRoles([]);
    setSelectedRole(event.target.value);
    onCustomFieldChange("TechRole", event.target.value);
  };

  const handleDefinedRolesChange = (event) => {
    setSelectedDefinedRoles(event.target.value);
    onCustomFieldChange("Role", event.target.value);
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <FormControl fullWidth>
        <InputLabel>Select Role</InputLabel>
        <Select value={selectedRole} onChange={handleRoleChange}>
          {rolesData.tech_roles.map((role) => (
            <MenuItem key={role.role} value={role.role}>
              {role.role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br></br>
      {/* Render defined roles as a multiple select based on the selected role */}
      {selectedRole &&
        rolesData.tech_roles.find((role) => role.role === selectedRole) && (
          <FormControl fullWidth>
            <InputLabel>Select Defined Role(s)</InputLabel>
            <Select
              multiple
              value={selectedDefinedRoles}
              onChange={handleDefinedRolesChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {rolesData.tech_roles
                .find((role) => role.role === selectedRole)
                .defined_roles.map((definedRole) => (
                  <MenuItem
                    key={definedRole.role_name}
                    value={definedRole.role_name}
                  >
                    <Checkbox
                      checked={
                        selectedDefinedRoles.indexOf(definedRole.role_name) > -1
                      }
                    />
                    <ListItemText primary={definedRole.role_name} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}

      <AppointmentForm.Label text="Interview Email" type="title" />
      <TextField
        value={appointmentData.interviewEmail}
        onChange={(e) => onCustomFieldChange("interviewEmail", e.target.value)}
        placeholder="Enter interview email"
      />
      <AppointmentForm.Label text="Candidate Email" type="email" />
      <TextField
        value={appointmentData.candidateEmail}
        onChange={(e) => onCustomFieldChange("candidateEmail", e.target.value)}
        placeholder="Enter candidate email"
      />

      <AppointmentForm.Label
        text="Information about the interview"
        type="title"
      />
      <TextField
        value={appointmentData.interviewInfo}
        onChange={(e) => onCustomFieldChange("interviewInfo", e.target.value)}
        placeholder="Enter interview information"
      />
    </AppointmentForm.BasicLayout>
  );
};
const StyledDiv = styled("div")({
  toolbarRoot: "interview-toolbarRoot",
});
const ToolbarWithLoading = ({ children, ...restProps }) => (
  <StyledDiv className="toolbarRoot">
    <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
    <LinearProgress className="interview-progress" />
  </StyledDiv>
);
// const { user} = UserLogin();
const SetInterview = () => {
  const date = new Date();
  const { user, login, logout } = UserLogin();
  const fetchAppointments = async (userEmail) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments",
        {
          params: {
            userEmail: userEmail,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }
  };
  useEffect(() => {
    setLoading(true);
    if (user) {
      fetchAppointments(user.email)
        .then((appointments) => {
          console.log("Appointments:", appointments);
          setData(appointments);
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);
  const [currentDate, setCurrentDate] = useState(date);
  const [currentViewName, setCurrentViewName] = useState("Work Week");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentViewNameChange = (currentViewName) => {
    setCurrentViewName(currentViewName);
  };
  const currentDateChange = (currentDate) => {
    setCurrentDate(currentDate);
  };
  const commitChanges = async ({ added, changed, deleted }) => {
    try {
      if (added) {
        const roomID = customUUID();
        console.log("Added:", added);
        const requestData = {
          title: added.title,
          startDate: added.startDate,
          endDate: added.endDate,
          interviewEmail: added.interviewEmail,
          candidateEmail: added.candidateEmail,
          interviewInfo: added.interviewInfo,
          Role: added.Role,
          TechRole: added.TechRole,
          user: user,
          roomId: roomID,
        };
        console.log("Request Data:", requestData);
        const response = await axios.post(
          " http://localhost:5000/api/appointments",
          requestData
        );
        console.log("API Response:", response.data);
        alert("Interview has been added successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setData((prevData) => {
      let newData = [...prevData];
      if (added) {
        const startingAddedId =
          prevData.length > 0 ? prevData[prevData.length - 1].id + 1 : 0;
        newData = [...newData, { id: startingAddedId, ...added }];
      }
      if (changed) {
        newData = newData.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        newData = newData.filter((appointment) => appointment.id !== deleted);
      }
      return newData;
    });
  };
  return (
    <Paper>
      <Scheduler data={data} height={660}>
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <ViewState
          currentDate={currentDate}
          currentViewName={currentViewName}
          onCurrentViewNameChange={currentViewNameChange}
          onCurrentDateChange={currentDateChange}
        />
        <DayView startDayHour={9} endDayHour={19} intervalCount={2} />
        <WeekView
          startDayHour={9}
          endDayHour={17}
          excludedDays={[0, 6]}
          name="Work Week"
        />
        <MonthView
          name="Month"
          startDate={currentDate}
          endDate={currentDate}
          today={currentDate}
          otherMonth={true}
        />
        <AllDayPanel />
        <Appointments
          appointmentContentComponent={({ data, ...restProps }) => {
            return (
              <Appointments.AppointmentContent {...restProps} data={data}>
                <div>
                  <div>{data.title}</div>
                  <div>Interview Info: {data.interviewInfo}</div>
                </div>
              </Appointments.AppointmentContent>
            );
          }}
        />
        <Toolbar
          {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
        />
        <DateNavigator />
        <ViewSwitcher />
        <AppointmentTooltip contentComponent={AppointmentTooltipCustom} />
        <AppointmentForm
          basicLayoutComponent={BasicLayout}
          textEditorComponent={TextEditor}
        />
      </Scheduler>
    </Paper>
  );
};

export default SetInterview;
