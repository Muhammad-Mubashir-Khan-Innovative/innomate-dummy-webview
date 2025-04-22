import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useState, useEffect, useContext } from "react";
import { Button, Grid } from "@mui/material";
import TableComponent from "./TabComponent";
import LinearProgress from "@mui/material/LinearProgress";
import { AppContext } from "../../context.js";
import apiRequest from "../../Utilities/apiUtility";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import DataFile from "../../Utilities/DataFile.js";

// Function to split the object based on the index
const splitATMData = (Counter) => {
  const keys = Object.keys(Counter);
  const values = Object.values(Counter);

  const Tab1 = {};
  const Tab2 = {};
  const Tab3 = {};
  const Tab4 = {};

  keys.forEach((key, index) => {
    if (index < 5) {
      Tab1[key] = values[index];
    } else if (index >= 5 && index < 10) {
      Tab2[key] = values[index];
    } else if (index >= 10 && index < 15) {
      Tab3[key] = values[index];
    } else {
      Tab4[key] = values[index];
    }
  });

  return { Tab1, Tab2, Tab3, Tab4 };
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

const CassetteCounterTabs = ({ initialCounters, ATMid }) => {
  const [value, setValue] = useState(0);
  const [counter, setCounter] = useState(initialCounters || {});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { state, setUser } = useContext(AppContext);
  const apiURL = process.env.REACT_APP_API_URL;

  const handleButtonClick = (index) => {
    setValue(index); // Update the value state
  };

  const arrayToObject = (arr) => {
    const obj = {};
    arr.forEach((item) => {
      const [key, value] = item.split(":");
      obj[key] = value ? value.trim() : null;
    });
    return obj;
  };

  const { Tab1, Tab2, Tab3, Tab4 } = splitATMData(counter);

  useEffect(() => {
    
    if(DataFile.Demo){
      DemoGetLiveCassetteCounters();
    }else{
      GetLiveCassetteCounters();
    }
  }, []);

  const DemoGetLiveCassetteCounters = () => {
    const data = DataFile.DemoGetLiveCassetteCounters;
    const resp = arrayToObject(data);
    setCounter(resp);
    setLoading(false)

  }

  const GetLiveCassetteCounters = () => {
    setLoading(true); // Start loading
    apiRequest(
      "POST",
      apiURL + "/CommandExecutionController/GetCassetteCounters",
      {
        headers: {
          Authorization: "Bearer " + state?.user?.Token,
        },
        body: {
          UserID: state?.user?.UserID,
          DeviceID: ATMid,
        },
      }
    )
      .then((response) => {
        if (response.error === "HTTP error! Status: 401") {
          swal("Session Expired! Please login again.", {
            buttons: {
              Okay: true,
            },
          }).then((value) => {
            if (value === "Okay") {
              setUser(null);
              sessionStorage.removeItem("IsLoggedIn");
              window.ReactNativeWebView.postMessage("logout");
              navigate("/"); // Navigate to login screen
            }
          });
          return;
        } else if (response.error) {
          // Only show dialog if valid counters are retrieved
          if (response.data && response.data.length > 0) {
            swal(
              "Unable to get current counters. Displayed counters are half hour old.",
              {
                buttons: {
                  Okay: true,
                },
              }
            );
          }
          return;
        } else if (response && response.length > 0) {
          // Only update if response contains valid data
          console.log(response)
          const resp = arrayToObject(response);
          setCounter(resp);
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  return (
    <Box
      sx={{ width: "100%", backgroundColor: "#FFFFFF", marginBottom: "20%" }}
    >
      {loading && (
        <Box sx={{ width: "100%", backgroundColor: "#F5F7FD " }}>
          <p style={{ textAlign: "center", fontSize: "12px" }}>
            Fetching Current Counters, Please Wait
          </p>
          <LinearProgress />
        </Box>
      )}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: "auto",
          backgroundColor: "#F5F7FD",
        }}
      >
        <Grid container>
          {[1, 2, 3, 4].map((index) => (
            <Grid item xs={3} key={index}>
              <Button
                sx={{
                  lineHeight: "2.5",
                  color: value === index - 1 ? "white" : "black",
                  backgroundColor:
                    value === index - 1 ? "#4197CB !important" : "#FFFFFF",
                  fontFamily: "Gilroy",
                  width: "90%",
                  display: "inline-flex",
                  fontWeight: "semibold",
                  fontSize: "10px",
                  borderRadius: "12px",
                  marginTop: "8px",
                  marginBottom: "8px",
                  marginLeft: "8px",
                  padding: "8px",
                }}
                {...a11yProps(index - 1)}
                onClick={() => handleButtonClick(index - 1)}
              >
                {`Cassette ${index}`}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TableComponent Tab={Tab1} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TableComponent Tab={Tab2} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TableComponent Tab={Tab3} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <TableComponent Tab={Tab4} />
      </CustomTabPanel>
    </Box>
  );
};

export default CassetteCounterTabs;
