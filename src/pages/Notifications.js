import React from "react";
import Topbar from "../Components/TopBar";
import Footer from "../Components/Footer";
import { useEffect, useState, useContext } from "react";
import styles from "../styles.module.css";
import apiRequest from '../Utilities/apiUtility';
import swal from 'sweetalert';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context.js';
import NotificationCard from "../Components/NotificationItem";
import {Box} from "@mui/material";
import DataFile from "../Utilities/DataFile.js";

function Notifications() {
  const { state, setUser, setNotifications } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
    const apiURL = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const IsLoggedIn = sessionStorage.getItem("IsLoggedIn");
    if (IsLoggedIn != "Y" || IsLoggedIn == undefined) {
      navigate("/");

    }
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    if(DataFile.Demo){
      DemoGetUserNotifications();
    }else{
      GetUserNotifications();
    }
    
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const DemoGetUserNotifications = () => {
    const data = DataFile.DemoGetUserNotifications
    setNotifications(data);
    setLoading(false);
  }


  const GetUserNotifications = () => {
    apiRequest('POST', apiURL + '/AlertsController/GetUserNotifications', {
      headers: {
        "Authorization": "Bearer " + state?.user?.Token
      },
      body: {
        "UserID": state?.user?.UserID
      }
    }).then(response => {
      if (response.error === "HTTP error! Status: 401") {
        swal("Session Expired! Please login again.", {
          buttons: {
            Okay: true,
          },
        }).then(value => {
          switch (value) {
            case "Okay":
              setUser(null);
              sessionStorage.removeItem("IsLoggedIn");
              window.ReactNativeWebView.postMessage("logout");
              navigate('/'); // Navigate to login screen
              break;
          }
        });
        return;
      }
      else if (response.error) {
        swal("Server stopped responding, Please try again later.", {
          buttons: {
            Okay: true,
          },
        })
          .then((value) => {
            switch (value) {
              case "Okay":
                navigate('/dashboard');
                break;
            }
          });
        return;

      }
      else if (response !== null) {
        if (response.ResponseCode == '00') {
          console.log(response.Data);
          setNotifications(response.Data);
          
          setLoading(false);
        }
        else if (response.ResponseCode == "71" || response.ResponseCode == "72") {
          console.log(response)
          swal("Exception Occured while getting User Notifications", {
            buttons: {
              Okay: true,
            },
          })
            .then((value) => {
              switch (value) {
                case "Okay":

                  navigate('/dashboard');
                  break;
              }
            });
          return;
        }
      }
      else {
        swal("Exception Occured while fetching ATM's. Please co-ordinate with Vendor", {
          buttons: {
            Okay: true,
          },
        })
          .then((value) => {
            switch (value) {
              case "Okay":
                sessionStorage.removeItem("IsLoggedIn");
                setUser(null);
                window.ReactNativeWebView.postMessage("logout");
                navigate('/');
                break;
            }
          });
        return;
      }

    });
  };


  const MarkNotificationsAsRead = () => {
    apiRequest('POST', apiURL + '/AlertsController/MarkNotificationsAsRead', {
      headers: {
        "Authorization": "Bearer " + state?.user?.Token
      },
      body: {
        "UserID": state?.user?.UserID
      }
    }).then(response => {
      if (response.error === "HTTP error! Status: 401") {
        swal("Session Expired! Please login again.", {
          buttons: {
            Okay: true,
          },
        }).then(value => {
          switch (value) {
            case "Okay":
              setUser(null);
              sessionStorage.removeItem("IsLoggedIn");
              window.ReactNativeWebView.postMessage("logout");
              navigate('/'); // Navigate to login screen
              break;
          }
        });
        return;
      }
      else if (response.error) {
        swal("Server stopped responding, Please try again later.", {
          buttons: {
            Okay: true,
          },
        })
          .then((value) => {
            switch (value) {
              case "Okay":
                navigate('/dashboard');
                break;
            }
          });
        return;

      }
      else if (response !== null) {
        if (response.ResponseCode == '00') {
          GetUserNotifications();
        }
        else if (response.ResponseCode == "76" || response.ResponseCode == "77") {
          swal("Exception Occured while Marking Notifications as Read", {
            buttons: {
              Okay: true,
            },
          })
            .then((value) => {
              switch (value) {
                case "Okay":

                  navigate('/dashboard');
                  break;
              }
            });
          return;
        }
      }
      else {
        swal("Exception Occured while fetching ATM's. Please co-ordinate with Vendor", {
          buttons: {
            Okay: true,
          },
        })
          .then((value) => {
            switch (value) {
              case "Okay":
                sessionStorage.removeItem("IsLoggedIn");
                setUser(null);
                window.ReactNativeWebView.postMessage("logout");
                navigate('/');
                break;
            }
          });
        return;
      }

    });
  };


  return (
    <div className={styles.ATMListmainDiv} style={{ width: dimensions.width }}>
      <Topbar heading={"Notifications"} backbutton={true} />
      <div style={{ backgroundColor: '#F9FAFB !important', paddingTop: '0px',paddingBottom:'3%' }}>
        {state?.Notifications?.length > 0 ? (
        <>
            <div
              style={{
                height: '20px',
                textAlign: 'right',
                alignItems: 'right',
                backgroundColor: '#F9FAFB',
                padding: '10px',
                margin: '0px',
                cursor: 'pointer'
              }}
            >
              <a
                style={{
                  fontSize: '14px',
                  color: '#1987FB',
                  paddingRight: '15px',
                  paddingBottom: '0px',
                  marginTop: '0px',
                  marginBottom: '0px',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click event from propagating to the parent div
                  //MarkNotificationsAsRead(); // Call your function
                }}
              >
                Mark All as Read
              </a>
            </div>
      
          <Box
          sx={{
            padding: "20px",
            height: "calc(90vh - 150px)",
            overflowY: "auto",
            backgroundColor: "#F9FAFB"
          }}
        >
            
            {state?.Notifications?.map((item, index) => (
      
    
            <NotificationCard
              key={index}
              date={item.SentAt}
              Notification={item.Description}
              isRead={item.IsRead}
            />
      ))}

    <div style={{height:"10vh"}}></div>
    </Box>

    </>

        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              color: '#666', // Customize text color if needed
              fontSize: '16px',
            }}
          >
            No Notifications Found
          </div>
        )}
      </div>
      <Footer />
    </div>

  );
}

export default Notifications;
