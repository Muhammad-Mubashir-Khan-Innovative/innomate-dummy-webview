import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CassetteCounterIcon from "../../Sources/cashdispenseicon.png";
import CassetteCounterIconSelected from "../../Sources/cashdispenseIconBlue.png";
import MenuIcon from "../../Sources/MainMenu.png";
import swal from "sweetalert";
import MenuIconSelected from "../../Sources/MainMenuSelected.png";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import ATMHealth from "../../Sources/ATMHealth.png";
import { useNavigate } from "react-router-dom";
import ATMHealthSelected from "../../Sources/ATMHealthSelected.png";
import Settings from "../../Sources/Settings.png";
import SettingSelected from "../../Sources/SettingSelected.png";
import TableComponent from "./TabComponent";
import CircularProgress from "@mui/material/CircularProgress";
import CassetteCounterTabs from "./CassetteCounterTabs";
import ATMComponentsHealthTab from "./ATMComponentsTab";
import { AppContext } from "../../context.js";
import { useEffect, useContext, useState } from "react";
import apiRequest from "../../Utilities/apiUtility";
import DataFile from "../../Utilities/DataFile.js";
import { ContinuousColorLegend } from "@mui/x-charts";

const arrayToObject = (arr) => {
  const obj = {};
  arr.forEach((item) => {
    if (item.includes("MAC Address")) {
      const macIndex = item.indexOf(":");
      const key = item.slice(0, macIndex).trim();
      const value = item.slice(macIndex + 1).trim();
      obj[key] = value;
    } else {
      const [key, ...valueParts] = item.split(":");
      const value = valueParts.join(":").trim(); // Handles cases where value contains colons
      obj[key.trim()] = value || null; // Ensure null if value is missing
    }
  });
  return obj;
};

const updateTab4Values = (tab4) => {
  const updatedTab4 = {};
  Object.keys(tab4).forEach((key) => {
    const value = tab4[key];
    if (value && value.length > 0) {
      if (value[0] === "0") {
        updatedTab4[key] = "Operational";
      } else if (value[0] === "1") {
        updatedTab4[key] = "Full Failure";
      } else {
        updatedTab4[key] = value;
      }
    } else {
      updatedTab4[key] = value;
    }
  });
  return updatedTab4;
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ATMHealthTabs = ({ ATMid }) => {
  const [tabData, setTabData] = React.useState({
    Tab1: {},
    Tab2: {},
    Tab3: {},
    Tab4: {},
  });
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(true); // Loading state
  const apiURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate(); // Hook for navigation
  const { state, setATMs, setUser } = useContext(AppContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Check if System Info tab (index 2) is clicked
    if (newValue === 2) {
      if(DataFile.Demo){
        DemoFetchSystemInfo();
      }
      else{
        fetchSystemInfo();
      }
      
    }
  };

  const DemoGetATMDataAgainstUser = () => {
    setLoading(true);
    const data = DataFile.DemoGetATMDataAgainstUser
    setATMs(data);
      if (data.length > 0) {
        const Tab1 = arrayToObject(data[0]);
        const Tab2 = arrayToObject(data[1]);
        const Tab3 = arrayToObject(data[2]);
        const Tab4Raw = arrayToObject(data[3]);
        const Tab4 = updateTab4Values(Tab4Raw);

        // Set all tabs into state only once after receiving response
        setTabData({ Tab1, Tab2, Tab3, Tab4 });
      }
      setLoading(false);

  }

  const DemoFetchSystemInfo = () => {
    setLoading(true);
    const data = DataFile.DemoFetchSystemInfo
    const apiData = data;
    if (apiData.ATMID) {
      // This means the data is coming from the database, so use the record format
      const dbData = {
        Description: apiData.Description,
        Name: apiData.Name,
        NumberOfCores: apiData.NoofCores,
        HDDCapacity: `${(apiData.HDDsize / 1024 ** 3).toFixed(2)} GB`,
        Partitions: apiData.Partition,
        // MemorySize: `${(apiData.TotalPhysicalMemory / 1024 ** 3).toFixed(
        //   2
        // )} GB`,
        MACAddress: apiData.MACAddress,
      };

      // Update Tab3 with the database data
      setTabData((prev) => ({ ...prev, Tab3: dbData }));
    } else {
      // This means the data is coming from the API response, so transform accordingly
      const transformedData = {
        Description: apiData.Caption, // Map 'Caption' to 'Description'
        Name: apiData.Name,
        NumberOfCores: apiData.NumberOfCores,
        HDDCapacity: `${(apiData.Size / 1024 ** 3).toFixed(2)} GB`, // Map 'Size' to 'HDDCapacity'
        Partitions: apiData.Partitions,
        // MemorySize: `${(apiData.TotalPhysicalMemory / 1024 ** 3).toFixed(
        //   2
        // )} GB`, // Map 'TotalPhysicalMemory' to 'MemorySize'
        MACAddress: apiData.PhysicalAddress,
      };

      // Update Tab3 with the transformed API data
      setTabData((prev) => ({ ...prev, Tab3: transformedData }));
    }
    setLoading(false);
  }

  const GetATMDataAgainstUser = () => {
    
    setLoading(true);

    apiRequest("POST", apiURL + "/ATMDetailsController/GetATMDetails", {
      headers: {
        Authorization: "Bearer " + state?.user?.Token,
      },
      body: {
        ATMID: ATMid,
        userID: state?.user?.UserID,
      },
    })
      .then((response) => {
        
        setLoading(false);
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
                window.ReactNativeWebView.postMessage("logout");
                navigate("/"); // Navigate to login screen
                break;
            }
          });
          return;
        }
        if (response.error) {
          swal("Server stopped responding, Please try again later.", {
            buttons: {
              Okay: true,
            },
          }).then((value) => {
            switch (value) {
              case "Okay":
                sessionStorage.removeItem("IsLoggedIn");
                setUser(null);
                setATMs(null);
                navigate("/dashboard");
                break;
            }
          });
          return;
        } else {
          if (response.ResponseCode == "00") {
            console.log(response.Data)
            setATMs(response.Data);
            if (response.Data.length > 0) {
              const Tab1 = arrayToObject(response.Data[0]);
              const Tab2 = arrayToObject(response.Data[1]);
              const Tab3 = arrayToObject(response.Data[2]);
              const Tab4Raw = arrayToObject(response.Data[3]);
              const Tab4 = updateTab4Values(Tab4Raw);

              // Set all tabs into state only once after receiving response
              setTabData({ Tab1, Tab2, Tab3, Tab4 });
            }
          } else if (
            response.ResponseCode == "26" ||
            response.ResponseCode == "27"
          ) {
            swal(
              "Error Recieved while fetching data, Please try again later.",
              {
                buttons: {
                  Okay: true,
                },
              }
            ).then((value) => {
              switch (value) {
                case "Okay":
                  setATMs(null);
                  navigate("/dashboard");
                  break;
              }
            });
            return;
          } else {
            swal("Exception Occurred, Please try again later.", {
              buttons: {
                Okay: true,
              },
            }).then((value) => {
              switch (value) {
                case "Okay":
                  setATMs(null);
                  navigate("/dashboard");
                  break;
              }
            });
            return;
          }
        }
      })
      .catch((error) => {
        console.error("Failed to fetch ATM data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchSystemInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiURL}/CommandExecutionController/GetSystemInfo`,
        { ATMid, UserID: state?.user?.UserID },
        {
          headers: { Authorization: `Bearer ${state?.user?.Token}` },
        }
      );

      if (response.data && response.data.ResponseCode === "00") {
        console.log(response.data)
        const apiData = response.data.Data;

        if (apiData.ATMID) {
          // This means the data is coming from the database, so use the record format
          const dbData = {
            Description: apiData.Description,
            Name: apiData.Name,
            NumberOfCores: apiData.NoofCores,
            HDDCapacity: `${(apiData.HDDsize / 1024 ** 3).toFixed(2)} GB`,
            Partitions: apiData.Partition,
            // MemorySize: `${(apiData.TotalPhysicalMemory / 1024 ** 3).toFixed(
            //   2
            // )} GB`,
            MACAddress: apiData.MACAddress,
          };

          // Update Tab3 with the database data
          setTabData((prev) => ({ ...prev, Tab3: dbData }));
        } else {
          // This means the data is coming from the API response, so transform accordingly
          const transformedData = {
            Description: apiData.Caption, // Map 'Caption' to 'Description'
            Name: apiData.Name,
            NumberOfCores: apiData.NumberOfCores,
            HDDCapacity: `${(apiData.Size / 1024 ** 3).toFixed(2)} GB`, // Map 'Size' to 'HDDCapacity'
            Partitions: apiData.Partitions,
            // MemorySize: `${(apiData.TotalPhysicalMemory / 1024 ** 3).toFixed(
            //   2
            // )} GB`, // Map 'TotalPhysicalMemory' to 'MemorySize'
            MACAddress: apiData.PhysicalAddress,
          };

          // Update Tab3 with the transformed API data
          setTabData((prev) => ({ ...prev, Tab3: transformedData }));
        }
      } else {
        console.error("Invalid data from System Info API.");
      }
    } catch (error) {
      console.error("Error fetching system info:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("in ATMHealthTabs")
    if (ATMid) {
      
      if(DataFile.Demo){
        console.log("IN DEMO")
        DemoGetATMDataAgainstUser();
        DemoFetchSystemInfo();

      }else{
        console.log("IN LIVE")
        fetchSystemInfo();
        GetATMDataAgainstUser();       
      }

    } else {
      console.log("ATMid is not available, skipping API call.");
    }
  }, [ATMid]); // Trigger the API call whenever ATMid changes

  return (
    <Box sx={{ width: "100%", backgroundColor: "#FFFFFF", height: "100vh" }}>
      {" "}
      {/* Full height */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {" "}
          {/* Full viewport height */}
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "#F5F7FD",
            }}
          >
            <Tabs
              sx={{ display: "flex" }}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                sx={{
                  width: "25%",
                  color: "black",
                  fontFamily: ["Gilroy","sans-serif"],
                  fontWeight: "300",
                  textTransform: "none",
                  fontSize: "10px",
                  paddingTop: "20px",
                }}
                icon={
                  value === 0 ? (
                    <img
                      src={MenuIconSelected}
                      alt=""
                      sx={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <img src={MenuIcon} alt="" sx={{ width: 30, height: 30 }} />
                  )
                }
                label="ATM Details"
                {...a11yProps(0)}
              />
              <Tab
                sx={{
                  width: "25%",
                  color: "black",
                  fontFamily: "Gilroy",
                  fontWeight: "300",
                  textTransform: "none",
                  fontSize: "10px",
                }}
                icon={
                  value === 1 ? (
                    <img
                      src={CassetteCounterIconSelected}
                      alt=""
                      sx={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <img
                      src={CassetteCounterIcon}
                      alt=""
                      sx={{ width: 30, height: 30 }}
                    />
                  )
                }
                label="ATM Counters"
                {...a11yProps(1)}
              />
              <Tab
                sx={{
                  width: "25%",
                  color: "black",
                  fontFamily: "Gilroy",
                  fontWeight: "300",
                  textTransform: "none",
                  fontSize: "10px",
                }}
                icon={
                  value === 2 ? (
                    <img
                      src={SettingSelected}
                      alt=""
                      sx={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <img src={Settings} alt="" sx={{ width: 30, height: 30 }} />
                  )
                }
                label="System Info"
                {...a11yProps(2)}
              />
              <Tab
                sx={{
                  width: "25%",
                  color: "black",
                  fontFamily: "Gilroy",
                  fontWeight: "300",
                  textTransform: "none",
                  fontSize: "10px",
                }}
                icon={
                  value === 3 ? (
                    <img
                      src={ATMHealthSelected}
                      alt=""
                      sx={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <img
                      src={ATMHealth}
                      alt=""
                      sx={{ width: 30, height: 30 }}
                    />
                  )
                }
                label="ATM Health"
                {...a11yProps(3)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <TableComponent Tab={tabData.Tab1} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <CassetteCounterTabs ATMid={ATMid} initialCounters={tabData.Tab2} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <TableComponent Tab={tabData.Tab3} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <ATMComponentsHealthTab Tab={tabData.Tab4} />
          </CustomTabPanel>
        </>
      )}
    </Box>
  );
};

export default ATMHealthTabs;
