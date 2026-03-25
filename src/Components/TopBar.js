import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import locationIcon from "../Sources/LocationFilter.png"
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CircleIcon from '@mui/icons-material/Circle';

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WriteIcone from "../Sources/Complaint.svg";
import FingerprintIcon from "@mui/material/";
import menuIcon from "../Sources/MainMenu2.svg";
import bellIcon from "../Sources/BellIcon.svg";


import ListAltIcon from "@mui/icons-material/ListAlt";
import styles from "../styles.module.css";
import Avatar from "@mui/material/Avatar";
import avatarimage from "../Sources/InnovativeLogo.png";
import ATMListIcon from "../Sources/Vector.png";
import Homeicon from "../Sources/Home.png";
import Settings from "../Sources/Settings.svg";
import SettingsSelected from "../Sources/SettingSelected.png";
import RoomPreferencesRoundedIcon from "@mui/icons-material/RoomPreferencesRounded";
import MoveDownIcon from "@mui/icons-material/MoveDown";
import TouchAppRoundedIcon from "@mui/icons-material/TouchAppRounded";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { AppContext } from "../context.js";
import apiRequest from '../Utilities/apiUtility.js'

/// Drawer Icons ///

import DrawerHome from "../Sources/DrawerHome.svg";
import DrawerDevice from "../Sources/DrawerDevice.svg";
import DrawerAction from "../Sources/DrawerAction.svg";
import DrawerJob from "../Sources/DrawerJob.svg";
import DrawerIncident from "../Sources/DrawerIncident.svg";
import DrawerResult from "../Sources/DrawerResult.svg";
import DrawerBio from "../Sources/DrawerBio.svg";
import DrawerReport from "../Sources/DrawerReport.svg";
import DrawerLogout from "../Sources/DrawerLogout.svg";

const DrawerList = () => {
  const { state, setUser } = useContext(AppContext);
  const [username, setusername] = useState(state.user.FirstName);
  const [organisation, setorganisation] = useState("VAS-Dev, IPL KHI");

  const logout = () => {
    sessionStorage.removeItem("IsLoggedIn");
    setUser(null);
    navigate("/");
    window.ReactNativeWebView.postMessage("logout");
  };

  const [platform, setPlatform] = useState(null);

  useEffect(() => {
    if (window.devicePlatform) {
      console.log(window.devicePlatform)
      setPlatform(window.devicePlatform);
     // alert(platform)
    
    }
  }, []);

  const listItems = [
    { id: 1, text: "Home", icon: DrawerHome, path: "/dashboard" },
    { id: 2, text: "Device List", icon: DrawerDevice, path: "/ATMList" },
    {
      id: 3,
      text: "Action Center",
      icon: DrawerAction,
      path: "/ActionCenter",
    },
    { id: 4, text: "Job Execution", icon: DrawerJob, path: "/ExecuteJob" },
    {
      id: 5,
      text: "Incident View",
      icon: DrawerIncident,
      path: "/Incidents",
    },
    {
      id: 6,
      text: "Job Results",
      icon: DrawerResult,
      path: "/JobResults",
    },
    {
      id: 7,
      text: "Reports",
      icon: DrawerReport,
      path: "/Reports",
    },
    // {
    //   id: 8,
    //   text: "Settings",
    //   icon: Settings,
    //   path: "/Settings",
    // },
  ];

  const DisableBiometric = () => {
    window.ReactNativeWebView.postMessage("DisableBiometric");
  };

  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation();
  const handleNavigation = (path) => () => {
    navigate(path); // Navigate to the given path
  };

  return (
    <Box
      sx={{ width: 250, minHeight: "95vh", position: "relative",paddingTop: `${platform == "ios" ? "40px" : "15px"} `, overflowY :"hidden" }}
      role="presentation"
    >
      {/* Avatar and user info */}
      <div style={{ display: "inline-flex", width: "90%", marginTop: "1%", marginLeft:"5%" }}>
        <Avatar
          sx={{
            height: 50,
            width: 50,
            margin: "5%",
            backgroundColor: "black" //"#FFD88D",
          }}
        >
          <img
            style={{ height: "50px", width: "50px" }}
            src={avatarimage}
            alt="avatar"
          />
        </Avatar>
        <div>
          <h3 style={{ marginBottom: "0px", color:"#1A1B2D" }}>{username}</h3>
          <p style={{ marginTop: "0px", fontSize: "13px", color: "#535763" }}>
            {organisation}
          </p>
        </div>
      </div>

      {/* List items */}
      <List sx={{ marginLeft: "6%" }}>
        {listItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton 
                onClick={handleNavigation(item.path)}
                sx={{
                  backgroundColor: location.pathname === item.path ? '#e8f0fe' : 'transparent', // added for testing tab highlight
                  '&:hover': {
                    backgroundColor: location.pathname === item.path ? '#e8f0fe' : '#f5f5f5', // added for testing tab highlight
                  }
                }}
              >
                <ListItemIcon>
                  {typeof IconComponent === "string" ? (
                    // If it's a string, we assume it's an image URL
                    <img
                      src={IconComponent}
                      //src={location.pathname === item.path ? SettingsSelected : IconComponent}  // Implementation of different icons for selected and unselected 
                      alt="icon"
                      style={{ padding: "3%", width: "24px", height: "24px",
                        filter: location.pathname === item.path ? 'brightness(0.7)' : 'none',
                        color: location.pathname === item.path ? '#1976d2' : "#1B1A1B" // added for testing tab highlight
                        
                       }}
                    />
                  ) : (
                    // Otherwise, render it as a React component (for Material-UI icons)
                    <IconComponent
                      sx={{ padding: "3%", fontSize: "24px", color: location.pathname === item.path ? '#1976d2' : "#1B1A1B" }} // added for testing tab highlight
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  sx={{ 
                    color: location.pathname === item.path ? '#5F65FF' : "#1B1A1B", // added for testing tab highlight
                    fontFamily: "cursive",
                    '& .MuiTypography-root': {
                      fontWeight: location.pathname === item.path ? '600' : '400' // added for testing tab highlight
                    }
                  }}
                  primary={item.text}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Button at the bottom of the screen */}
      <Box
        sx={{
          position: "absolute",
          bottom: 40,
          width: "100%"
          // paddingBottom: "1rem",
        }}
      >
        <ListItem disablePadding sx={{ width: "100%" }}>
          <ListItemButton onClick={() => DisableBiometric()}>
            <ListItemIcon sx={{ minWidth: "40px", marginLeft: "6%" }}>
              <img
                src={DrawerBio}
                sx={{ padding: "3%", fontSize: "24px", color: "#1B1A1B" }}
              />
            </ListItemIcon>
            <ListItemText
              sx={{
                color: "#1B1A1B",
                fontFamily: "cursive",
              }}
              primary="Disable Biometric" // You can change this text
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ width: "100%" }}>
          <ListItemButton onClick={() => logout()}>
            <ListItemIcon sx={{ minWidth: "40px", marginLeft: "6%" }}>
              <img
                 src={DrawerLogout}
                 sx={{ padding: "3%", fontSize: "24px",color: "#DC3545" //"#535763"
                  }} 
              />
            </ListItemIcon>
            <ListItemText
              sx={{
                color: "#DC3545", //"#535763"
                fontFamily: "cursive",
                
              }}
              primary="Log Out" // You can change this text
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );
};

const Topbar = ({ heading, backbutton, LocationFilter, complaintButton }) => {
  const [open, setOpen] = React.useState(false);
  const { state, setLocationFilter, setNotifications } = useContext(AppContext);
  const navigate = useNavigate();

  const [platform, setPlatform] = useState(null);
  const location = useLocation(); // Get the current route path
  const [value, setValue] = React.useState('/');
  const [platformReady, setPlatformReady] = useState(false);
  const [platformFailed, setPlatformFailed] = useState(false);
  const [IsUnreadNotifications,setIsUnreadNotifications] = React.useState(false);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 3;

    const checkPlatform = () => {
       
      if(window.devicePlatform) {
        setPlatform(window.devicePlatform);
        setPlatformReady(true);
      }else if(attempts < maxAttempts){
        attempts++;
        setTimeout(checkPlatform, 100)
      }else{
        setPlatformFailed(true);
      }
    }

    checkPlatform();

  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleLocationFilter = () => {
    setLocationFilter(true);
  };

  const handleComplaintNavigation = () => {
    console.log("Navigating to /complaintform with ATMid:", heading); // Log the ATMid
    navigate("/complaintform", { state: { ATMid: heading } }); // Pass ATMid in state
  };

  const handleNotification = () => {
    //console.log("Navigating to /complaintform with ATMid:", heading); // Log the ATMid
    navigate("/Notifications"); // Pass ATMid in state
  }

    return (
    <>
      {/* <div 
      style={{height:"55px",backgroundColor:"black",width:"100%"}}>

      </div> */}
      <div className={styles.topbarmaindiv} style={{ paddingTop: `${platform == "ios" ? "35px" : "5px"} ` }}>
        {!backbutton && (
          <div className={styles.avatardivtopbar}>
            <div style={{ paddingTop: "0px" }}>
              <Avatar
                onClick={toggleDrawer(true)}
                sx={{ backgroundColor: "#FFFFFF", border: "solid", borderColor: "#E4E6E9", height: 45, width: 45, borderRadius:"15px" }}
              >
                <img src={menuIcon} alt="Menu" />
              </Avatar>
            </div>
          </div>
        )}
        {backbutton && (
          <div className={styles.avatardivtopbar}>
            <div style={{ paddingTop: "0px" }}>
              <Avatar
                onClick={() => handleBack()}
                sx={{ backgroundColor: "#FFFFFF", border: "solid", borderColor: "#E4E6E9", height: 45, width: 45, borderRadius:"15px"  }}
              >
                <ArrowBackRoundedIcon sx={{ color: 'black' }} />
              </Avatar>
            </div>
          </div>
        )}

        <div
          style={{
            //backgroundColor: "#4197CB",
            display: "inline-flex",
            width: "60%",
            justifyContent: "center",
          }}
        >
          <div className={styles.DashboardHeading}>
            <p style={{  marginTop: "30px" }}>{heading}</p>
          </div>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <DrawerList />
          </Drawer>
        </div>

        {LocationFilter && (
          <div className={styles.avatardivtopbar}>
            <div style={{ paddingTop: "0px" }}>
              <Avatar
                onClick={() => handleLocationFilter()}
                sx={{backgroundColor: "#FFFFFF", border: "solid", borderColor: "#E4E6E9", height: 45, width: 45, borderRadius:"15px" }}
              >
                <TuneRoundedIcon sx={{ color: 'black' }} />
              </Avatar>
            </div>
          </div>
        )}

        {/* Complaint Button */}
        {complaintButton && (
          <div className={styles.avatardivtopbar}>
            <div style={{ paddingTop: "0px" }}>
              {/* <Avatar
                onClick={handleComplaintNavigation}
                sx={{backgroundColor: "#FFFFFF", border: "solid", borderColor: "#E4E6E9", height: 45, width: 45, borderRadius:"15px"}}
              >
                <img src={WriteIcone} alt="Avatar" style={{ height: "24px" }} />
              </Avatar> */}
            </div>
          </div>
        )}

        {!LocationFilter && !complaintButton && (
          <div className={styles.avatardivtopbar}>
            <div style={{ paddingTop: "0px" }}>
              
              <Avatar
                onClick={handleNotification}
                sx={{ backgroundColor: "#FFFFFF", border: "solid", borderColor: "#E4E6E9", height: 45, width: 45, borderRadius:"15px" }}
              >
               {(IsUnreadNotifications && <CircleIcon size={4} 
                sx={{height:"8px", width:"8px",marginTop:"-10px", zIndex:"10", backgroundColor:"#DC3545",color:"#DC3545",borderRadius:"10px",marginLeft:"10px"}} />)}
               <img src={bellIcon} alt="Menu" style={{marginLeft:IsUnreadNotifications?"-16px": "0px"}} />
              </Avatar>
              
              {/* <Avatar
                sx={{ backgroundColor: "#FFD88D", height: 45, width: 45 }}
              >
                <img src={avatarimage} style={{height: 45, width: 45}} alt="Avatar" />
              </Avatar> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Topbar;
