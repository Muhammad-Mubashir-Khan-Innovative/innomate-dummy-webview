import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context.js";
import { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import swal from "sweetalert";
import List from "@mui/material/List";
import apiRequest from "../../Utilities/apiUtility";
import Stack from "@mui/material/Stack";
import { Menu, MenuItem, Select } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import styles from "../../styles.module.css";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { PieChart } from "@mui/x-charts/PieChart";
import CircleIcon from "@mui/icons-material/Circle";
import { ContinuousColorLegend } from "@mui/x-charts";
import calenderIcon from "../../Sources/Calender.png";
import DataFile from "../../Utilities/DataFile.js";

const IncidentDetailsComponent = () => {
  const navigate = useNavigate();
 
  const { state, setUser, setIncidentDetails } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [count,setCount] = useState(0);
  const [localUser,setLocalUser] = useState("");
  const [filterOption, setFilterOption] = useState("7-days");
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const Cal_handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const Cal_handleClose = () => {
    setAnchorEl(null);
  };

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
    DemoGetIncidentDetails();
    
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
        return "#A6CF46"; // Green
      case "Incidents Open":
        return "#FF6671";
      case "Incidents Reported":
        return "#FFBD66";
      default:
        return "#CCCCCC"; // Default color
    }
  };

  const sendNotification=(item) => {

    apiRequest("POST", "/JobController/InsertNotificationData", {
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
    console.log("In demo function")
    const data = DataFile.DemoGetIncidentDetails;
    setIncidentDetails(data);

    setLoading(false);
    console.log(state.IncidentDetails)
    return;
  }

  const GetIncidentDetails = () => {
    apiRequest("POST", "/IncidentController/GetIncidentsInfo", {
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
        setIncidentDetails(response?.Data)
        setLoading(false);
        return;
      }
    });
  };

  const filterDataByDate = (data, filter) => {
    console.log("Filtering data with filter:", filter);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Strip time from 'now'

    return data.filter((item) => {
      const startDate = new Date(item.StartTime);
      if (isNaN(startDate)) {
        console.warn("Invalid date in data:", item);
        return false; // Exclude items with invalid dates
      }

      // const itemDate = new Date(
      //   startDate.getFullYear(),
      //   startDate.getMonth(),
      //   startDate.getDate()
      // ); // Strip time from 'startDate'
      
      // For demonstration, using a fixed date for filtering
      const itemDate = new Date(2026, 2, 25) // Month is 0-indexed
       
      console.log("Filtered Data:", filter);
      if (filter === 0) {
        return itemDate.getTime() === today.getTime(); // Compare only the date
      } else if (filter === 3) {
        return (today - itemDate) / (1000 * 60 * 60 * 24) <= 3;
      } else if (filter === 7) {
        return (today - itemDate) / (1000 * 60 * 60 * 24) <= 7;
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
      color: "#A6CF46",
    },
    {
      label: "Incidents Open",
      value: filteredData.filter((item) => item.Status === "Opened").length,
      color: "#FF6671",
    },
    // {
    //   label: "Incidents Reported",
    //   value: filteredData.filter((item) => item.Status === "Opened" || item.Status === "Closed" ).length,
    //   //value:8,
    //   color: "#FFBD66",
    // }
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
             <div style={{ display: "flex", justifyContent: "flex-end" }}
               onClick={(e) => {
                  //  setAnchorEl(e.currentTarget)
                  e.stopPropagation(); // Prevent click from propagating to parent div
                }}
             >
            {/* <Select
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
                marginTop: "-5%",
              }}
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="3-days">Last 3 Days</MenuItem>
              <MenuItem value="7-days">Last 7 Days</MenuItem>
            </Select> */}
            <Avatar
                onClick={(e) => {
                    setAnchorEl(e.currentTarget)
                  e.stopPropagation(); // Prevent click from propagating to parent div
                
                  //Cal_handleClick()
                }}
                //onClick={Cal_handleClick}
                sx={{ backgroundColor: "#FFFFFF", border: "solid", borderColor: "#E4E6E9", height: 45, width: 45, borderRadius:"15px" }}
              >
                <img src={calenderIcon} alt="Menu" />
              </Avatar>
                 <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={Cal_handleClose}
                    slotProps={{
                      list: {
                        'aria-labelledby': 'basic-button',
                      },
                    }}
                  >
                    <MenuItem 
                    value = "today"
                    onClick={(e) => {
                      console.log(e.target.value)
                      setFilterOption(e.target.value);
                      Cal_handleClose()
                    }}>
                      Today
                    </MenuItem>

                    <MenuItem 
                    value = "3-days"
                    
                    onClick={(e) => {
                      console.log("last 3 days")
                      console.log(e.target.value)
                      setFilterOption(e.target.value);
                      Cal_handleClose()
                    }}>
                      Last 3 Days
                    </MenuItem>

                    <MenuItem 
                    value = "7-days"
                    onClick={(e) => {
                      console.log("last 7 days")
                      console.log(e.target.value)
                      setFilterOption(e.target.value);
                      Cal_handleClose()
                    }}>
                      Last 7 Days
                    </MenuItem>
                  </Menu>
          </div>
          <p style={{ marginTop: "-35px", marginBottom:"30px" }} className={styles.InfoCardHeading}>
            Incident View
          </p>

          {/* Dropdown Filter aligned to the right */}
         

          <div>
            {filteredData.length > 0 ? (
                <PieChart
                 sx={{ paddingLeft: dimensions.width * 0.01,
                    '&:active': { pointerEvents: 'auto' }, // Allow interactions when actively touching
                     pointerEvents: 'none' // Default to ignoring touches
                 }}
                  series={[
                    {
                      data: PieChartdata,
                      innerRadius: 40,
                      outerRadius: 80,
                      paddingAngle: 2,
                      cornerRadius: 10,
                    }
                  ]}
                  width={dimensions.width * 0.9 || 300}
                  height={180}
                  slotProps={{ legend: { hidden: true } }}
                />
              // <PieChart
              //   sx={{ paddingLeft: dimensions.width * 0.01,
              //       '&:active': { pointerEvents: 'auto' }, // Allow interactions when actively touching
              //        pointerEvents: 'none' // Default to ignoring touches
              //    }}
              //   series={[
              //     { innerRadius: 55, outerRadius: 80, data: PieChartdata },
              //   ]}
              //   width={dimensions.width * 0.9 || 300}
              //   height={180}
              //   slotProps={{ legend: { hidden: true } }}
              // />
            ) : (
              <p>No data available for the given date range.</p>
            )}
          </div>

          <nav style={{ paddingBottom: "0px" }}>
            <List>
              {PieChartdata.map((itemm) => (
                <ListItem
                  key={itemm.label}
                  sx={{ paddingRight: "5px", paddingBottom: "0px", color:'#5D6679' }}
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
                    primary={itemm.value + " " +itemm.label}
                  />
                </ListItem>
              ))}
              {/* <ListItem
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
              </ListItem> */}
            </List>
          </nav>
        </Stack>
      </div>
    </>
  );
};

export default IncidentDetailsComponent;
