import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";


import swal from "sweetalert";

import MenuIcon from "../../Sources/DeviceHealth_Unselected.png";
import MenuIconSelected from "../../Sources/DeviceHealth_Selected.png";

import DeviceDetailsUnselected from "../../Sources/DeviceDetails_Unselected.svg";
import DeviceDetailsSelected from "../../Sources/DeviceDetails_Selected.svg";
import DeviceHealthUnselected from "../../Sources/DeviceHealth_Unselected.svg";
import DeviceHealthSelected from "../../Sources/DeviceHealth_Selected.svg";
import CassetteCounterIcon from "../../Sources/DeviceCounters_Unselected.svg";
import CassetteCounterIconSelected from "../../Sources/DeviceCounters_Selected.svg";
import Settings from "../../Sources/SystemInfo_Unselected.svg";
import SettingSelected from "../../Sources/SystemInfo_Selected.svg";
import IncidentViewUnselected from "../../Sources/IncidentView_Unselected.svg";
import IncidentViewSelected from "../../Sources/IncidentView_Selected.svg"
import LastTnxUnselected from "../../Sources/LastTxn_Unselected.svg";
import LastTnxSelected from "../../Sources/LastTxn_Selected.svg";

import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import { useNavigate } from "react-router-dom";
import ATMHealthSelected from "../../Sources/ATMHealthSelected.png";

import TableComponent from "./TabComponent";
import CircularProgress from "@mui/material/CircularProgress";
import CassetteCounterTabs from "./CassetteCounterTabs";
import IncidentsViewTab from "./IncidentsViewTab.js";
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
      } else {
        updatedTab4[key] = "Full Failure";
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
    Tab5: {},
    Tab6: {},
  });
  const [lastTran, setLastTran] = React.useState({})
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
        "No of Cores": apiData.NoofCores,
        "HDD Capacity": `${(apiData.HDDsize / 1024 ** 3).toFixed(2)} GB`,
        Partitions: apiData.Partition,
        // MemorySize: `${(apiData.TotalPhysicalMemory / 1024 ** 3).toFixed(
        //   2
        // )} GB`,
        "MAC Address": apiData.MACAddress,
      };

      // Update Tab3 with the database data
      setTabData((prev) => ({ ...prev, Tab3: dbData }));
    } else {
      // This means the data is coming from the API response, so transform accordingly
      const transformedData = {
        Description: apiData.Caption, // Map 'Caption' to 'Description'
        Name: apiData.Name,
        "No of Cores": apiData.NumberOfCores,
        "HDD Capacity": `${(apiData.Size / 1024 ** 3).toFixed(2)} GB`, // Map 'Size' to 'HDDCapacity'
        Partitions: apiData.Partitions,
        // MemorySize: `${(apiData.TotalPhysicalMemory / 1024 ** 3).toFixed(
        //   2
        // )} GB`, // Map 'TotalPhysicalMemory' to 'MemorySize'
        "MAC Address": apiData.PhysicalAddress,
      };

      // Update Tab3 with the transformed API data
      setTabData((prev) => ({ ...prev, Tab3: transformedData }));
    }
    setLoading(false);
  }

  const DemoFetchLastTransaction = () => {
    setLoading(true);
    const data = DataFile.DemoFetchLastTransaction
    
    const transformedData = {
      Type: data.Trxn_type,
      Time: data.Trxn_time,
      Date: data.Trxn_date,
      Status: data.Status,
    };
    console.log(transformedData);
    setLastTran(transformedData);
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
        DemoFetchLastTransaction();

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
    <Box sx={{ width: "100%", backgroundColor: "#F9FAFB", height: "100vh" }}>
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
              // borderBottom: 1,
              // borderColor: "divider",
              backgroundColor: "#F9FAFB",
            }}
          >
            <Tabs
              // sx={{ display: "flex" }}
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
              textColor="#5F65FF"
              indicatorColor="#F9FAFB"
            >
              <Tab
                sx={{
                  width: "25%",
                 // color: "black",
                  fontFamily: ["Gilroy","sans-serif"],
                  fontWeight: "300",
                  textTransform: "none",
                  fontSize: "11px",
                  //paddingTop: "20px",
                  color:`${value === 0 ? "#5F65FF" : "black"}`
                }}
                icon={
                  value === 0 ? (
                    <img
                      src={DeviceDetailsSelected}
                      alt=""
                      sx={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <img src={DeviceDetailsUnselected} alt="" sx={{ width: 30, height: 30 }} />
                  )
                }
                label="Device Details"
                {...a11yProps(0)}
              />
              <Tab
                sx={{
                  width: "25%",
                 // color: "black",
                  fontFamily: "Gilroy",
                  fontWeight: "300",
                  textTransform: "none",
                  fontSize: "11px",
                   color:`${value === 1 ? "#5F65FF" : "black"}`
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
                label="Device Counters"
                {...a11yProps(1)}
              />
              <Tab
                sx={{
                  width: "25%",
                  //color: "black",
                  fontFamily: "Gilroy",
                  fontWeight: "300",
                  textTransform: "none",
                  fontSize: "11px",
                   color:`${value === 2 ? "#5F65FF" : "black"}`
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
                  //color: "black",
                  fontFamily: "Gilroy",
                  fontWeight: "300",
                  textTransform: "none",
                  fontSize: "11px",
                  color:`${value === 3 ? "#5F65FF" : "black"}`
                }}
                icon={
                  value === 3 ? (
                    <img
                      src={DeviceHealthSelected}
                      alt=""
                      sx={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <img
                      src={DeviceHealthUnselected}
                      alt=""
                      sx={{ width: 30, height: 30 }}
                    />
                  )
                }
                label="Device Health"
                {...a11yProps(3)}
              />
              <Tab
                sx={{
                  width: "25%",
                  //color: "black",
                  fontFamily: "Gilroy",
                  fontWeight: "300",
                  textTransform: "none",
                  fontSize: "11px",
                   color:`${value === 4 ? "#5F65FF" : "black"}`
                }}
                icon={
                  value === 4 ? (
                    <img
                      src={IncidentViewSelected}
                      alt=""
                      sx={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <img src={IncidentViewUnselected} alt="" sx={{ width: 30, height: 30 }} />
                  )
                }
                label="Incident View"
                {...a11yProps(4)}
              />
              <Tab
                sx={{  
                  width: "25%",
                  //color: "black",
                  fontFamily: "Gilroy",
                  fontWeight: "300",
                  textTransform: "none",
                  fontSize: "11px",
                  color:`${value === 5 ? "#5F65FF" : "black"}`
                }}
                icon={
                  value === 5 ? (
                    <img
                      src={LastTnxSelected}
                      alt=""
                      sx={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <img
                      src={LastTnxUnselected}
                      alt=""
                      sx={{ width: 30, height: 30 }}
                    />
                  )
                }
                label="Last Tnx Details "
                {...a11yProps(5)}
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
           <CustomTabPanel value={value} index={4}>
           <IncidentsViewTab ATMid={ATMid} initialCounters={tabData.Tab5} />
          </CustomTabPanel>
           <CustomTabPanel value={value} index={5}>
            <TableComponent Tab={lastTran} />
          </CustomTabPanel>
        </>
      )}
    </Box>
  );
};

export default ATMHealthTabs;
