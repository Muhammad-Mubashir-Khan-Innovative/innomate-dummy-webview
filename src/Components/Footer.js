import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Homeicon from '../Sources/Rectangle 74.png';
import HomeFilledicon from '../Sources/HomeFilled.png';
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
    <div>
      <BottomNavigation
        showLabels
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          height: '70px !important',
          backgroundColor: '#7BB9DE',
          borderRadius: '15px 15px 0px 0px',
          left: 0,
          zIndex: 1000, // Ensure it's above other elements
          boxSizing: 'border-box', // Prevent overflow due to padding or borders
          overflow: 'hidden' // Prevent horizontal scroll
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          sx={{
            '& .MuiBottomNavigationAction-label': {
              color: '#FFF', // Change label text color here
              fontSize:'12px',
            },
            
            bottom: 15,
            top: -5,
          }}
          label="Dashboard"
          value="/dashboard"
          icon={
            value === "/dashboard" ? (
              <img src={HomeFilledicon} alt="icon" style={{ padding: '3%', width: '24px', height: '24px' }} />
            
            ) : (
              <img src={Homeicon} alt="icon" style={{ padding: '3%', width: '24px', height: '24px' }} />
            )
          }
        />



<BottomNavigationAction
  sx={{
    '& .MuiBottomNavigationAction-label': {
      color: '#FFF', // Change label text color
      fontSize: '12px',
    },
    bottom: 15,
    top: -5,
    position: 'relative', // Make sure the red dot is positioned relative to the icon
  }}
  label="Notifications"
  value="/Notifications"
  icon={
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {value === "/Notifications" ? (
        <img
          src={bellIconFilled}
          alt="icon"
          style={{ padding: '3%', width: '26px', height: '24px' }}
        />
      ) : (
        <img
          src={bellIcon}
          alt="icon"
          style={{ padding: '3%', width: '20px', height: '24px' }}
        />
      )}
      {/* Render the red dot conditionally */}
      {IsUnreadNotifications && (
        <span
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '8px',
            height: '8px',
            backgroundColor: 'red',
            borderRadius: '50%',
            border: '1px solid white', // Optional: adds a white border to distinguish the dot
          }}
        />
      )}
    </div>
  }
/>




        {/* <BottomNavigationAction
          sx={{
            '& .MuiBottomNavigationAction-label': {
              color: '#FFF', // Change label text color here
            },
            bottom: 15,
            top: -5,
          }}
          label="Log Out"
          value="/"
          icon={<img src={Logouticon} alt="icon" style={{ padding: '3%', width: '19px', height: '22px' }} />}
          onClick={logout}
        /> */}
      </BottomNavigation>
    </div>
  );
};

export default Footer;
