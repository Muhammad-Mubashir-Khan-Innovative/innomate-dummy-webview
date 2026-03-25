import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Homeicon from '../Sources/Home.svg';
import HomeFilledicon from '../Sources/Home_Selected.svg';
import Incidenticon from '../Sources/Incident.svg';
import IncidentFilledicon from '../Sources/Incident_Selected.svg';
import Jobsicon from '../Sources/Jobs.svg';
import JobsFilledicon from '../Sources/Jobs_Selected.svg';
import Reportsicon from '../Sources/Reports.svg';
import ReportsFilledicon from '../Sources/Reports_Selected.svg';
import Logouticon from '../Sources/Group 20827.png';
import apiRequest from '../Utilities/apiUtility.js'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'; // Example alternative icon
import { AppContext } from '../context.js';
import bellIcon from '../Sources/bell.png'
import bellIconFilled from '../Sources/bellfilled.png'

const Footer = () => {
  const { state, setUser,setNotifications } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route path
  const [value, setValue] = React.useState('/');
  const [IsUnreadNotifications,setIsUnreadNotifications]=React.useState(false);
    const apiURL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    // Update the value based on the current route
    setValue(location.pathname);

    // GetUserNotifications();
    // const intervalId = setInterval(() => {
    //   GetUserNotifications();
    // }, 30000); // 30000ms = 30 seconds

    // Cleanup interval on component unmount
    //return () => clearInterval(intervalId);
  }, [location.pathname]);

  const GetUserNotifications = () => {
    apiRequest('POST', apiURL + '/AlertsController/GetUserNotifications', {
      headers: {
        "Authorization": "Bearer " + state?.user?.Token
      },
      body: {
        "UserID": state?.user?.UserID
      }
    }).then(response => {
      if (response !== null) {
        if (response.ResponseCode == '00') {
          setNotifications(response.Data);
          const hasUnreadNotifications = response.Data.some(item => !item.IsRead);
          if (hasUnreadNotifications) {
           setIsUnreadNotifications(true);
          } 
        }
      }
    });
  };
  
  const logout = () => {
    sessionStorage.removeItem("IsLoggedIn");
    setUser(null);
    window.ReactNativeWebView.postMessage("logout");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <>
    {/* Blur Background Layer */}
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '140px',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        backgroundColor: '#F9FAFB75',
        zIndex: 999,
        pointerEvents: 'none', // allows clicks to pass through

        maskImage: 'linear-gradient(to top, black 35%, black 70%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to top, black 0%, black 70%, transparent 100%)',
      }}
    />
      
      <BottomNavigation
        showLabels
        sx={{
          width: '90%',
           marginLeft:"5%",
           paddingY:"40px",
          //margin:"auto",
          position: 'fixed',
          bottom: 15,
          height: '70px !important',
          backgroundColor: '#F3F3FF',
          borderRadius: '20px',
          border:"solid",
          borderColor:"#5F65FF26",
          borderWidth:"1px",
          
          // left: 0,
          zIndex: 1000, // Ensure it's above other elements
          boxSizing: 'border-box', // Prevent overflow due to padding or borders
          overflow: 'hidden' // Prevent horizontal scroll
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Home"
          value="/dashboard"
          sx={{
            '& .MuiBottomNavigationAction-label': {
              color: '#5F65FF', // Change label text color here
              fontSize:'10px',
              fontWeight: value === "/dashboard" ? "bold":"normal"
            },
            
            bottom: 15,
            top: -2,
          }}

          icon={
            value === "/dashboard" ? (
              <img src={HomeFilledicon} alt="icon" style={{ padding: '3%', width: '20px', height: '20px', marginBottom:"8px"  }} />
            
            ) : (
              <img src={Homeicon} alt="icon" style={{ padding: '3%', width: '20px', height: '20px', marginBottom:"8px"  }} />
            )
          }
        />
          <BottomNavigationAction
          sx={{
            '& .MuiBottomNavigationAction-label': {
              color: '#5F65FF', // Change label text color here
              fontSize:'10px',
              fontWeight: value === "/Incidents" ? "bold":"normal"
            },
            
            bottom: 15,
            top: -2,
            
          }}
          label="Incident View"
          value="/Incidents"
          icon={
            value === "/Incidents" ? (
              <img src={IncidentFilledicon} alt="icon" style={{ padding: '3%', width: '20px', height: '20px', marginBottom:"8px"  }} />
            
            ) : (
              <img src={Incidenticon} alt="icon" style={{ padding: '3%', width: '20px', height: '20px', marginBottom:"8px"  }} />
            )
          }
        />

        <BottomNavigationAction
          sx={{
            '& .MuiBottomNavigationAction-label': {
              color: '#5F65FF', // Change label text color here
              fontSize:'10px',
              fontWeight: value === "/JobResults" ? "bold":"normal"
            },
            
            bottom: 15,
            top: -2,
          }}
          label="Job Result"
          value="/JobResults"
          icon={
            value === "/JobResults" ? (
              <img src={JobsFilledicon} alt="icon" style={{ padding: '3%', width: '20px', height: '20px', marginBottom:"8px"  }} />
            
            ) : (
              <img src={Jobsicon} alt="icon" style={{ padding: '3%', width: '20px', height: '20px', marginBottom:"8px"  }} />
            )
          }
        />

           <BottomNavigationAction
          sx={{
            '& .MuiBottomNavigationAction-label': {
              color: '#5F65FF', // Change label text color here
              fontSize:'10px',
                 fontWeight: value === "/Reports" ? "bold":"normal"
            },
            
            bottom: 15,
            top: -2,
          }}
          label="Reports"
          value="/Reports"
          icon={
            value === "/Reports" ? (
              <img src={ReportsFilledicon} alt="icon" style={{ padding: '3%', width: '20px', height: '20px', marginBottom:"8px" }} />
            
            ) : (
              <img src={Reportsicon} alt="icon" style={{ padding: '3%', width: '20px', height: '20px', marginBottom:"8px" }} />
            )
          }
        />

      </BottomNavigation>
    </>
  );
};

export default Footer;
