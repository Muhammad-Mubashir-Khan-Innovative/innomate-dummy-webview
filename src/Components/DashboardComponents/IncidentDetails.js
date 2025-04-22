import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context.js";
import { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import List from "@mui/material/List";
import apiRequest from "../../Utilities/apiUtility";
import Stack from "@mui/material/Stack";
import { MenuItem, Select } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import styles from "../../styles.module.css";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { PieChart } from "@mui/x-charts/PieChart";
import CircleIcon from "@mui/icons-material/Circle";
import { ContinuousColorLegend } from "@mui/x-charts";
import DataFile from "../../Utilities/DataFile.js";

const IncidentDetailsComponent = () => {
  const navigate = useNavigate();
  const apiURL = process.env.REACT_APP_API_URL;
  const { state, setUser, setIncidentDetails } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [count,setCount] = useState(0);
  const [localUser,setLocalUser] = useState("");
  const [filterOption, setFilterOption] = useState("7-days");
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleClick = () => {
    console.log("in event change")
    navigate("/Incidents");
  };

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    if(DataFile.Demo){
      DemoGetIncidentDetails();
    }else{
      GetIncidentDetails();
    }
    window.addEventListener("resize", handleResize);
   
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(()=>{
  //   const intervalId = setInterval(GetIncidentDetails, 10000); // Poll every 10s
    
  //   setCount(count + 1);
    
  //   return () => clearInterval(intervalId);
  // },[])

  const GetIconColor = (condition) => {
    switch (condition) {
      case "Incidents Closed":
        return "#57CD2D"; // Green
      case "Incidents Open":
        return "#FF0000";
      case "Incidents Reported":
        return "#FFA84A";
      default:
        return "#CCCCCC"; // Default color
    }
  };

  const sendNotification=(item) => {

    apiRequest("POST", apiURL + "/JobController/InsertNotificationData", {
      headers: {
        Authorization: "Bearer " + state?.user?.Token,
      },
      body: 
      {
        UserID: state.user.UserID,
        DeviceID: item.DeviceID,
        PMID: item.Pmid,
        Status: item.Status,
      },
    }).then((response) => {
      console.log(response)
      })
  } 


  const DemoGetIncidentDetails = () => {
    const data = DataFile.DemoGetIncidentDetails;
    setIncidentDetails(data)
    //setLocalUser(state.user.UserID)
    setLoading(false);

  }

  const GetIncidentDetails = () => {
    apiRequest("POST", apiURL + "/IncidentController/GetIncidentsInfo", {
      headers: {
        Authorization: "Bearer " + state?.user?.Token,
      },
      body: state?.user?.UserID,
    }).then((response) => {
      if (response.error) {
        swal("Error", response.error, { buttons: { Okay: true } }).then(() =>
          navigate("/")
        );
        return;
      }
      if (response?.ResponseCode === "00") {
        console.log(response?.Data)
        if(localUser !== state.user.UserID){
          setIncidentDetails(response?.Data)
          setLocalUser(state.user.UserID)
        }
        else{ 
          response.Data.forEach(newIncident => {
            const oldIncident = state.IncidentDetails.find(d => d.RepNumber === newIncident.RepNumber);
            if (!oldIncident) {
              console.log("New Incident Found")
              sendNotification(newIncident)
            } else if (oldIncident.Status !== newIncident.Status) {
              console.log("Status Changed")
              sendNotification(newIncident)
            }
          });
        }
        setIncidentDetails(response?.Data)
        setLoading(false);
        return;
      }
    });
  };

  const filterDataByDate = (data, filter) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Strip time from 'now'

    return data.filter((item) => {
      const startDate = new Date(item.StartTime);
      if (isNaN(startDate)) {
        console.warn("Invalid date in data:", item);
        return false; // Exclude items with invalid dates
      }

      const itemDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      ); // Strip time from 'startDate'
      if (filter === "today") {
        return itemDate.getTime() === today.getTime(); // Compare only the date
      } else if (filter === "3-days") {
        return (today - itemDate) / (1000 * 60 * 60 * 24) <= 3;
      } else if (filter === "7-days") {
        return (today - itemDate) / (1000 * 60 * 60 * 24) <= 70;
      }
      return true;
    });
  };

  const filteredData = filterDataByDate(
    state.IncidentDetails || [],
    filterOption
  );
  const PieChartdata = [
    {
      label: "Incidents Closed",
      value: filteredData.filter((item) => item.Status === "Closed").length,
      color: "#57CD2D",
    },
    {
      label: "Incidents Open",
      value: filteredData.filter((item) => item.Status === "Opened").length,
      color: "#FF0000",
    },
  ];

  return (
    <>
      <div
        onClick={handleClick}
        style={{ cursor: "pointer" }}
        className={styles.Centerdiv}
      >
        <Stack
          style={{ marginBottom: "15%" }}
          className={styles.DashboardCard}
          direction="column"
          spacing={2}
        >
          <p style={{ marginTop: "10px" }} className={styles.InfoCardHeading}>
            INCIDENT VIEW
          </p>

          {/* Dropdown Filter aligned to the right */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Select
              value={filterOption}
              onClick={(e) => {
                e.stopPropagation(); // Prevent click from propagating to parent div
              }}
              onChange={(e) => {
                setFilterOption(e.target.value);
              }
            }
              displayEmpty
              style={{
                marginBottom: "10px",
                width: "130px",
                height: "40px",
                marginTop: "-13%",
              }}
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="3-days">Last 3 Days</MenuItem>
              <MenuItem value="7-days">Last 7 Days</MenuItem>
            </Select>
          </div>

          <div>
            {filteredData.length > 0 ? (
              <PieChart
                sx={{ paddingLeft: dimensions.width * 0.01,
                    '&:active': { pointerEvents: 'auto' }, // Allow interactions when actively touching
                     pointerEvents: 'none' // Default to ignoring touches
                 }}
                series={[
                  { innerRadius: 55, outerRadius: 80, data: PieChartdata },
                ]}
                width={dimensions.width * 0.9 || 300}
                height={180}
                slotProps={{ legend: { hidden: true } }}
              />
            ) : (
              <p>No data available for the given date range.</p>
            )}
          </div>

          <nav style={{ paddingBottom: "0px" }}>
            <List>
              {PieChartdata.map((itemm) => (
                <ListItem
                  key={itemm.label}
                  sx={{ paddingRight: "5px", paddingBottom: "0px", color:'#3E3E3E' }}
                >
                  <ListItemIcon>
                    <CircleIcon
                      fontSize="large"
                      sx={{
                        color: GetIconColor(itemm.label),
                        fontSize: "25px",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ fontSize: "13px !important" }}
                    primary={itemm.label}
                  />
                </ListItem>
              ))}
              <ListItem
                key="Incidents Reported"
                sx={{ paddingRight: "5px", paddingBottom: "0px",color:'#3E3E3E' }}
              >
                <ListItemIcon>
                  <CircleIcon
                    fontSize="large"
                    sx={{
                      color: GetIconColor("Incidents Reported"),
                      fontSize: "25px",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "13px !important" }}
                  primary={filteredData?.length + " Incidents Reported"}
                />
              </ListItem>
            </List>
          </nav>
        </Stack>
      </div>
    </>
  );
};

export default IncidentDetailsComponent;
