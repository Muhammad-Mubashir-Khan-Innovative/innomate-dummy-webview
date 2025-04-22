import React from "react";
import { useEffect, useState, useContext } from "react";
import { Typography, FormControlLabel, Box, Card, CardContent, Grid, Switch, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Topbar from "../Components/TopBar";
import Footer from "../Components/Footer";
import styles from "../styles.module.css";
import apiRequest from "../Utilities/apiUtility.js";
import swal from "sweetalert";
import { AppContext } from "../context.js";

const labels = [
    {
        tag: 'Cash Dispenser', 
        DBname: 'CashDispenser'
    },
    {
        tag: 'Card Reader', 
        DBname: 'CardReader'
    },
    {
        tag: 'Journal Printer', 
        DBname: 'JournalPrinter',
    },
    {
        tag: 'Supervisory Mode', 
        DBname: 'SupervisoryMode',
    },
    {
        tag: 'Out of Cash', 
        DBname: 'OutofCash',
    },
    {
        tag: 'Reciept Printer', 
        DBname: 'RecieptPrinter',
    },
    {
        tag: 'Host Communication Error', 
        DBname: 'HostCommunicationError',
    },
    {
        tag: 'Incidents', 
        DBname: 'Incidents',
    },
    {
        tag: 'Job Execution', 
        DBname: 'JobExecution',
    },
  ];

// Simulated API: Fetch initial switch states from database

    // Simulate API delay
//     await new Promise((res) => setTimeout(res, 500));
//     return {
//       'Cash Dispenser': true,
//       'Card Reader': false,
//       'Journal Printer': false,
//       'Supervisory Mode': true,
//       'Out of Cash': false,
//       'Reciept Printer': true,
//       'Host Communication Error': false,
//       'Incidents': true,
//       'Job Execution': false,
//     };
//   };
  
  // Simulated API: Update switch state in database


const Settings = () => {
  const navigate = useNavigate();
  const [switchStates, setSwitchStates] = useState(null);
  const { state, setJobResults, setUser } = useContext(AppContext);
  const apiURL = process.env.REACT_APP_API_URL;


  useEffect(() => {
    const loadInitialStates = async () => {
      //const data = await fetchSwitchStatesDefault();
      const data = await fetchSwitchStates();
      console.log(data)
      setSwitchStates(data);
    };
    loadInitialStates();
  }, []);

  useEffect(() => {
    console.log("Current switches:", switchStates);
  }, [switchStates]);

  const fetchSwitchStatesDefault = async () => {
    // Simulate API delay
    await new Promise((res) => setTimeout(res, 500));
    return {
      'Cash Dispenser': true,
      'Card Reader': false,
      'Journal Printer': false,
      'Supervisory Mode': true,
      'Out of Cash': false,
      'Reciept Printer': true,
      'Host Communication Error': false,
      'Incidents': true,
      'Job Execution': false,
    };
  };

  const updateSwitchInDatabase = async (label, value) => {
    console.log(`Sending to DB: ${label} = ${value}`);
    const reqBody = {
        UserID: state?.user?.UserID,
        [label] : (value == true ? 0 : 1)
    }

    console.log(reqBody)

    apiRequest("POST", apiURL + "/Authentication/UpdateUserSettings", {
        headers: {
          Authorization: "Bearer " + state?.user?.Token,
        },
        body: reqBody,
      }).then((response) => {
        console.log("API Response:", response); // Log the received data
  
        if (response.error === "HTTP error! Status: 401") {
          swal("Session Expired! Please login again.", {
            buttons: { Okay: true },
          }).then((value) => {
            if (value === "Okay") {
              setUser(null);
              sessionStorage.removeItem("IsLoggedIn");
              window.ReactNativeWebView.postMessage("logout");
              navigate("/");
            }
          });
        } else if (response.error) {
          swal("Server stopped responding, Please try again later.", {
            buttons: { Okay: true },
          }).then(() => {
            sessionStorage.removeItem("IsLoggedIn");
            navigate("/dashboard");
          });
        } else if (response?.ResponseCode === "00") {
          console.log("Updated Done"); // Log sorted results
          return "OK"
        } else if (response?.ResponseCode === "78") {
            swal("User Not Found.", {
              buttons: { Okay: true },
            }).then(() => {
              sessionStorage.removeItem("IsLoggedIn");
              setUser(null);
              window.ReactNativeWebView.postMessage("logout");
              navigate("/");
            });
          }else {
          swal("Exception Occurred while Updating User Settings.", {
            buttons: { Okay: true },
          }).then(() => {
            sessionStorage.removeItem("IsLoggedIn");
            setUser(null);
            window.ReactNativeWebView.postMessage("logout");
            navigate("/");
          });
        }
      });
  };

  const fetchSwitchStates = async () => {
    apiRequest("POST", apiURL + "/Authentication/GetUserSettings", {
      headers: {
        Authorization: "Bearer " + state?.user?.Token,
      },
      body: {
        UserID: state?.user?.UserID,
      },
    }).then((response) => {
      console.log("API Response:", response); // Log the received data

      if (response.error === "HTTP error! Status: 401") {
        swal("Session Expired! Please login again.", {
          buttons: { Okay: true },
        }).then((value) => {
          if (value === "Okay") {
            setUser(null);
            sessionStorage.removeItem("IsLoggedIn");
            window.ReactNativeWebView.postMessage("logout");
            navigate("/");
          }
        });
      } else if (response.error) {
        swal("Server stopped responding, Please try again later.", {
          buttons: { Okay: true },
        }).then(() => {
          sessionStorage.removeItem("IsLoggedIn");
          navigate("/dashboard");
        });
      } else if (response?.ResponseCode === "00") {
        console.log("IN SETTINGS"); // Log sorted results
        console.log(response.Data)
        setSwitchStates(response.Data)
        return response.Data
      } else {
        swal("Exception Occurred while fetching User Settings.", {
          buttons: { Okay: true },
        }).then(() => {
          sessionStorage.removeItem("IsLoggedIn");
          setUser(null);
          window.ReactNativeWebView.postMessage("logout");
          navigate("/");
        });
      }
    });
  };


  const handleChange = async (event) => {
    const { name, checked } = event.target;
    let val = checked == true ? 0 : 1
    console.log(name + " " + val)
    
   // Update local state
    setSwitchStates((prevState) => ({
      ...prevState,
      [name]:val,
    }));
    
    // Log and send to "database"
    await updateSwitchInDatabase(name, checked);
  };

  if (!switchStates) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  // Function to handle card click
//   const handleCardClick = (title) => {
//     navigate("/SelectedReports", { state: { title } });
//   };

  return (
    <div className={styles.ATMListmainDiv}>
      <Topbar LocationFilter={false} heading={"Settings"} />

      

      {/* <Box
        sx={{
          padding: "20px",
          height: "calc(100vh - 150px)",
          overflowY: "auto",
          //background: "maroon"
        }}
      >

        
        <Typography
                    variant="subtitle1"
        >
        Get useful info about your devices
        </Typography>

        <Typography
                    variant="h4"
                    //sx={{ display: "block", fontSize: "12px" }}
        >
        Notifications
        </Typography>

        <Grid container spacing={1} sx={{backgroundColor:"maroon"}}>
            <Grid item xs={8} sx={{backgroundColor:"yellow"}}>
            <Typography
                    variant="subtitle1"
                    //sx={{ display: "block", fontSize: "12px" }}
            >
                ATM Component Status : 
            </Typography>
            </Grid> 
            <Grid item xs={4} sx={{backgroundColor:"orange"}}>
                <Switch 
                    defaultChecked 
                    //onChange={handleChange}
                />
            </Grid>   
        </Grid>

       
        <div style={{height:"10vh"}}></div>
      </Box> */}
      
      <Box
        sx={{
            padding: "20px",
            height: "calc(100vh - 150px)",
            maxWidth: 480,
            margin: 'auto',
            overflowY: "auto"
        }}
      >
        <Typography variant="subtitle1" sx={{marginBottom:"10px", fontFamily: "Gilroy, sans-serif",}}>
            Get useful info about your devices, even when you are not in app.
        </Typography>

        <Typography variant="h4" sx={{fontWeight:"bold", marginY:"10px", fontFamily: "Gilroy, sans-serif",}}>
            Notifications
        </Typography>
        {labels.map((label) => (
        <Grid
          container
          key={label.tag}
          alignItems="center"
          justifyContent="space-between"
          sx={{ paddingY: 1, fontFamily: "Gilroy, sans-serif", }}
        >
          <Grid item>
            <Typography>{label.tag}</Typography>
          </Grid>
          <Grid item>
            <Switch
              name={label.DBname}
              checked={switchStates[label.DBname] == 0 ? true: false }
              onChange={handleChange}
              color="primary"
            />
          </Grid>
        </Grid>
      ))}
      <div style={{height:"10vh"}}></div>
    </Box>

      <Footer />
    </div>
  );
};

export default Settings;
