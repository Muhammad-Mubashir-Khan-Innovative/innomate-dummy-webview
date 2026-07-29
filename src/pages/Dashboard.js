import * as React from "react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import Stack from "@mui/material/Stack";
import swal from "sweetalert";
import apiRequest from "../Utilities/apiUtility";
import DashboardCardImage1 from "../Sources/Total.svg";
import DashboardCardImage2 from "../Sources/group46.svg";
import DashboardCardImage3 from "../Sources/Layer2.svg";
import DashboardCardImage4 from "../Sources/exclamation.svg";
import InfoCard from "../Components/DashboardComponents/InfoCard.js";
import CircularRangeWithTextLink from "../Components/DashboardComponents/CircularRangeWithTextLink.js";
import IncidentDetailsComponent from "../Components/DashboardComponents/IncidentDetails.js";
import Footer from "../Components/Footer.js";
import Topbar from "../Components/TopBar.js";
import { Avatar, Box, CircularProgress } from "@mui/material";
import servericon from "../Sources/server_icon 1.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context.js";
import { ContinuousColorLegend } from "@mui/x-charts";
import DataFile from "../Utilities/DataFile.js"
import { isOutOfService as isDeviceOutOfService } from "../Utilities/outOfServiceStore";


const listItems = [
  {
    id: 1,
    text: "Monitoring",
    icon: servericon,
    label: "Connected",
    labelColor: "#3FC610",
  },
  {
    id: 2,
    text: "Counters Info",
    icon: servericon,
    label: "Offline",
    labelColor: "#FF3737",
  },
  {
    id: 3,
    text: "Reporting",
    icon: servericon,
    label: "Connected",
    labelColor: "#3FC610",
  },
  {
    id: 4,
    text: "PC Info",
    icon: servericon,
    label: "Connected",
    labelColor: "#3FC610",
  },
];

//var PieChartdata;

const getChipColor = (condition) => {
  switch (condition) {
    case "Connected":
      return "#3FC610"; // Green
    case "Offline":
      return "#FF0000"; // Red
    default:
      return "#CCCCCC"; // Default color
  }
};

function Dashboard() {
  const { state, setUser, setATMList, setATMs, setError, setIncidentDetails } =
    useContext(AppContext);
  const navigate = useNavigate(); // Hook for navigation
  const apiURL = process.env.REACT_APP_API_URL;
  const LinkDownBit = process.env.REACT_APP_LINKDOWNBIT || 14;
  const SupervisoryBit = process.env.REACT_APP_SUPERVISORYBIT || 13;
  const [loading, setLoading] = useState(true);
  const [ATMListData, setATMListData] = useState([]);
  const messages = ["Fetching Data", "Optimizing Data", "Populating Data"];
  const [messageIndex, setMessageIndex] = useState(0);

  const handleNavigation = (Route, ATMStatusFilter) => () => {
    navigate(Route, {
      state: {
        ATMStatusFilter: ATMStatusFilter,
      },
    }); // Navigate to the given path
  };

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    if (messageIndex >= messages.length - 1) return; // stop at last message

    const timer = setTimeout(() => {
      setMessageIndex((prev) => prev + 1);
    }, 15000); // change every 15s

    return () => clearTimeout(timer);
  }, [messageIndex]);

  useEffect(() => {
    const IsLoggedIn = sessionStorage.getItem("IsLoggedIn");
    if (IsLoggedIn != "Y" || IsLoggedIn == undefined) {
      navigate("/");
    }
    sessionStorage.setItem("UserID", state.user.UserID);
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    if(DataFile.Demo){
      console.log("IN DEMO")
      DemoDashboardGetATMDataAgainstUser();
    }else{
      console.log("IN LIVE")
      GetATMDataAgainstUser();
    }

    //SetPlayerID();
    window.addEventListener("resize", handleResize);

    // Poll every 5s so widget counts (e.g. Supervisory after a Set Out Of
    // Service command) refresh without needing to leave and return to this page.
    const pollInterval = setInterval(() => {
      if (DataFile.Demo) {
        DemoDashboardGetATMDataAgainstUser();
      } else {
        GetATMDataAgainstUser();
      }
    }, 5000);

    // Cleanup event listener/interval on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(pollInterval);
    };
  }, []);

  const DemoDashboardGetATMDataAgainstUser = () => {
    const data = DataFile.DemoDashboardGetATMDataAgainstUser
    console.log(data);
    setATMList(data);
    setATMListData(data);
    setLoading(false);
 }

  const GetATMDataAgainstUser = () => {
    apiRequest("POST", apiURL + "/Dashboard/GetATMsAgainstUserID", {
      headers: {
        Authorization: "Bearer " + state?.user?.Token,
      },
      body: {
        UserID: state?.user?.UserID,
      },
    }).then((response) => {
      if (response.error === "HTTP error! Status: 401") {
        swal("Session Expired! Please login again.", {
          buttons: {
            Okay: true,
          },
        }).then((value) => {
          switch (value) {
            case "Okay":
              setUser(null);
              sessionStorage.removeItem("IsLoggedIn");
             // window.ReactNativeWebView.postMessage("logout");
              navigate("/"); // Navigate to login screen
              break;
          }
        });
        return;
      } else if (response.error) {
        swal("Server stopped responding, Please try again later.", {
          buttons: {
            Okay: true,
          },
        }).then((value) => {
          switch (value) {
            case "Okay":
              sessionStorage.removeItem("IsLoggedIn");
              setUser(null);
              window.ReactNativeWebView.postMessage("logout");
              navigate("/");
              break;
          }
        });
        return;
      } else if (response !== null) {
        if (response.ResponseCode == "00") {
          console.log("in GetATMDataAgainstUser")
          console.log(response.Data)
          setATMList(response.Data);
          setATMListData(response.Data);
          setLoading(false);
        } else if (
          response.ResponseCode == "21" ||
          response.ResponseCode == "22"
        ) {
          swal("Exception Occured while fetching ATM's. Try again later", {
            buttons: {
              Okay: true,
            },
          }).then((value) => {
            switch (value) {
              case "Okay":
                sessionStorage.removeItem("IsLoggedIn");
                setUser(null);
            //    window.ReactNativeWebView.postMessage("logout");
                navigate("/");
                break;
            }
          });
          return;
        }
      } else {
        swal(
          "Exception Occured while fetching ATM's. Please co-ordinate with Vendor",
          {
            buttons: {
              Okay: true,
            },
          }
        ).then((value) => {
          switch (value) {
            case "Okay":
              sessionStorage.removeItem("IsLoggedIn");
              setUser(null);
             // window.ReactNativeWebView.postMessage("logout");
              navigate("/");
              break;
          }
        });
        return;
      }
    });
  };

  const SetPlayerID = () => {
    const playerID = sessionStorage.getItem("PlayerID");
    const ErrorOnce = sessionStorage.getItem('ErrorOnce')
    apiRequest("POST", apiURL + "/Authentication/SetPlayerID", {
      body: {
        UserID: state?.user?.UserID,
        PlayerID: playerID,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.error && sessionStorage.getItem('ErrorOnce') === null) {
        console.log("Notifications might not work on this device.")
        // swal(
        //   "Notifications might not work on this device due to an unknown error.",
        //   {
        //     buttons: { Okay: true },
        //   }
        // );
        sessionStorage.setItem('ErrorOnce','true')
        return;
      } else {
          if (response.ResponseCode === "00") {
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(
                JSON.stringify({ PlayerID: playerID })
              );
            }
          } else {
              if(sessionStorage.getItem('ErrorOnce') === null){
                console.log("Notifications might not work on this device.")
                // swal("Notifications might not work on this device.", {
                //   buttons: { Okay: true },
                // });
                sessionStorage.setItem('ErrorOnce','true')
              }
          }
        }
    });
  };

  return (
    <>
      <Topbar heading={"Home"} />
      <div
        className={styles.responsiveContainer}
        style={{
          backgroundColor: "#F9FAFB",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          // overflow: "auto"
        }}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress size={60} style={{ color: "#5F65FF" }} />
           <p style={{color:"#5F65FF", fontSize:"20px"}}>{messages[messageIndex]}</p>
            {/* Spinner */}
          </div>
        ) : (
          <Box
          sx={{
            paddingBottom: "20px",
            //height: "calc(100vh - 150px)",
            height: "100vh",
            //height: "100%",
            overflowY: "auto",
          }}
          >

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "3%",
              }}
            >
              <div className={styles.DashboardWelcomeText}>
                <p
                  style={{
                    marginBottom: "2px",
                    marginTop: "8px",
                    fontFamily: ['Gilroy','sans-serif'],
                  }}
                >
                  Hello {state.user ? state.user.FirstName : ""}
                </p>
              </div>
              <div className={styles.LastLoginText}>
                <p>
                  Last Login:{" "}
                  {state.user
                    ? new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }).format(new Date(state.user.LastLogin))
                    : null}
                </p>
              </div>
              {/* <div
                style={{
                  textDecorationStyle:"underline",
                  marginRight: "25px",
                  marginBottom:"-10px",
                  color: "white",
                  fontSize: "14px",
                  display: "flex",          // enable flexbox
                  justifyContent: "right", // horizontal alignment
                  alignItems: "center",     // vertical alignment
                }}
                onClick={ () => {GetATMDataAgainstUser()}}
              >
                
                {reload ? 
                  <CircularProgress size={30} style={{ color: "#fff" }} />
                :
                <>
                  <img src={refresh} style={{ marginRight: "6px" }} />
                  <span style={{ textDecoration: "underline" }}>Refresh</span>
                </>}
              </div> */}

            </div>

            {/* //Code for ATM Summary */}
            <div className={styles.Centerdiv}>
              <Stack
                className={styles.DashboardCard}
                direction="column"
                spacing={2}
              >
                <p className={styles.InfoCardHeading}>Device Summary</p>
                <Stack className={styles.InfoCard} direction="row" spacing={2}>
                  <InfoCard
                    style ={{alignItems:"center", paddingTop:"20px"}}
                    onClick={handleNavigation("/ATMList", "All")}
                    image={DashboardCardImage1}
                    background={"#81D0EA"}
                    heading={ATMListData?.length}
                    text={"Total Devices"}
                  />
                  <InfoCard
                    onClick={handleNavigation("/ATMList", "In Service")}
                    image={DashboardCardImage2}
                    background={"#A6CF46"}
                    heading={
                      ATMListData?.filter((item) => item.IndicesOfOnes === "0" && !isDeviceOutOfService(item.DeviceID))
                        ?.length
                    }
                    text={"In Service"}
                  />
                </Stack>
                <Stack className={styles.InfoCard} direction="row" spacing={2}>
                  <InfoCard
                    onClick={handleNavigation("/ATMList", "Linkdown")}
                    image={DashboardCardImage3}
                    background={"#FF6671"}
                    heading={
                      ATMListData?.filter(
                        (item) => item.Bit === parseInt(LinkDownBit)
                      )?.length
                    }
                    text={"Link Down"}
                  />
                  <InfoCard
                    onClick={handleNavigation("/ATMList", "Comp Down")}
                    image={DashboardCardImage4}
                    background={"#FFBD66"}
                    heading={
                      state.ATMList?.filter(
                        (item) => item.Prio > 2 && item.Prio < 8
                      )?.length
                    }
                    text={"Comp Down"}
                  />
                </Stack>
              </Stack>
            </div>

            {/* //Code for ATM  Cash Summary */}
            <div className={styles.Centerdiv}>
              <Stack
                className={styles.DashboardCard}
                direction="column"
                spacing={2}
              >
                <p
                  style={{ fontWeight: "bold" }}
                  className={styles.InfoCardHeading}
                >
                  Device Availability Summary
                </p>
                <CircularRangeWithTextLink
                  min={0}
                  max={state?.ATMList?.length}
                  value={
                    ATMListData?.filter(
                      (item) => item.Bit == parseInt(SupervisoryBit) || isDeviceOutOfService(item.DeviceID)
                    )?.length
                  }
                  // value = {15}
                  heading={"Supervisory"}
                  text={"To View The Details, Click Here"}
                  status={"Supervisory"}
                  progressbarcolor={"#FF6671"}
                />
                <CircularRangeWithTextLink
                  min={0}
                  max={state?.ATMList?.length}
                  value={ATMListData?.filter((item) => item.Bit == 5)?.length}
                  heading={"Out of Cash"}
                  text={"To View The Details, Click Here"}
                  status={"Out of Cash"}
                  progressbarcolor={"#FFA84A"}
                />
              </Stack>
            </div>
           {/*    //Code for Pie chart  */}

            <IncidentDetailsComponent />
            <div style={{height:"20vh"}}></div>
            <Footer />
          </Box>
        )}
      </div>
    </>
  );
}

export default Dashboard;
