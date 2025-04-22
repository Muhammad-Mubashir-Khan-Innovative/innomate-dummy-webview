import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Login from "./pages/Login";
import swal from "sweetalert";
import apiRequest from "../src/Utilities/apiUtility.js";
import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import ATMList from "./pages/ATMList";
import ATMHealth from "./pages/ATMHealth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ActionCenter from "./pages/ActionCenter";
import SuccessScreen from "./pages/SucessScreen";
import ExecuteJobMenu from "./pages/ExecuteJobMenu";
import { AppProvider } from "./context";
import JobResults from "./pages/JobResults";
import Notifications from "./pages/Notifications";
import Complaints from "./pages/Complaint";
import { useContext } from "react";
import { AppContext } from "../src/context.js";
import Reports from "./pages/Reports.js";
import Settings from "./pages/Settings.js";
import SelectedReports from "./pages/SelectedReports.js";
import ReportPage from "./pages/ReportPage.js";

const theme = createTheme({
  typography: {
    fontFamily: "Gilroy, sans-serif !important",
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  const apiURL = process.env.REACT_APP_API_URL;

  React.useEffect(() => {
    window.receivePlayerID = (PlayerID) => {
      sessionStorage.setItem("PlayerID", PlayerID);
    };
    window.receivePlayerID = window.receivePlayerID || (() => {});
  }, []);
  React.useEffect(() => {
    // Create an interval to check every 5 seconds
    const intervalId = setInterval(() => {
      window.receivePlayerID = (PlayerID) => {
        sessionStorage.setItem("PlayerID", PlayerID);
      };
      window.receivePlayerID = window.receivePlayerID || (() => {});
      const userId = sessionStorage.getItem("UserID");
      const playerId = sessionStorage.getItem("PlayerID");
      console.log(playerId);
      // Check if both UserID and PlayerID are not null
      if (userId && playerId) {
        console.log(playerId);
        SetPlayerID();

        // Clear the interval to ensure SetPlayerID only runs once
        clearInterval(intervalId);
      }
    }, 5000); // Check every 5 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const SetPlayerID = () => {
    apiRequest("POST", apiURL + "/Authentication/SetPlayerID", {
      body: {
        UserID: sessionStorage.getItem("UserID"),
        PlayerID: sessionStorage.getItem("PlayerID"),
      },
      headers: {
        "Content-Type": "application/json", // Ensure the content type is set to JSON
      },
    }).then((response) => {
      if (response.error) {
        swal(
          "Notifications might not work on this device due to unknown error.",
          {
            buttons: {
              Okay: true,
            },
          }
        );
        return;
      } else if (response.ResponseCode === "00") {
        // Handle success
      } else if (
        response.ResponseCode === "66" ||
        response.ResponseCode === "67"
      ) {
        swal(
          "Notifications might not work on this device due to unknown error.",
          {
            buttons: {
              Okay: true,
            },
          }
        );
        return;
      } else {
        swal("Notifications might not work on this device.", {
          buttons: {
            Okay: true,
          },
        });
        return;
      }
    });
  };

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ATMList" element={<ATMList />} />
            <Route path="/ATMHealth" element={<ATMHealth />} />
            <Route path="/ActionCenter" element={<ActionCenter />} />
            <Route path="/SuccessScreen" element={<SuccessScreen />} />
            <Route path="/ExecuteJob" element={<ExecuteJobMenu />} />
            <Route path="/Incidents" element={<Incidents />} />
            <Route path="/JobResults" element={<JobResults />} />
            <Route path="/Notifications" element={<Notifications />} />
            <Route path="/complaintform" element={<Complaints />} />
            <Route path="/Reports" element={<Reports />} />
            <Route path="/SelectedReports" element={<SelectedReports />} />
            <Route path="/ReportPage" element={<ReportPage />} />
            <Route path="/Settings" element={<Settings />} />

          </Routes>
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
