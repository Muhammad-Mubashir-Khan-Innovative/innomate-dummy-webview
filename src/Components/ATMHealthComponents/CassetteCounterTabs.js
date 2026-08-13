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
import CircularProgress from "@mui/material/CircularProgress";
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

function CassetteData (data) {
    const result = [];

    for (let i = 0; i < data.length; i += 5) {

        const obj = {};

        data.slice(i, i + 5).forEach(item => {
          const [key, value] = item.split(':').map(v => v.trim());

          if (key.startsWith('Cash Remaining')) obj["Cash Remaining"] = value;
          if (key.startsWith('Denomination')) obj["Denomination"] = value;
          if (key.startsWith('Reject')) obj["Reject"] = value;
          if (key.startsWith('Filling Level')) obj["Filling Level"] = value;
          if (key.startsWith('Status')) obj["Status"] = value;
        });

        result.push(obj);
      }

      console.log(  result); 
      return result;
}


const CassetteCounterTabs = ({ initialCounters, ATMid }) => {
  const [value, setValue] = useState(0);
  const [counter, setCounter] = useState(initialCounters || {});
  const [casettes, setCasettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { state, setUser } = useContext(AppContext);
  const [errorMsg, setErrorMsg] = useState(false);
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
      console.log("Demo Mode: Fetching Cassette Counters");
      DemoGetLiveCassetteCounters();
    }else{
      GetLiveCassetteCounters();
    }
  }, []);

  const DemoGetLiveCassetteCounters = () => {
    const data =
      DataFile.DemoGetLiveCassetteCounters[ATMid] ||
      DataFile.DemoGetLiveCassetteCounters["ATM123456"];
   // const resp = arrayToObject(data);
   // console.log("Demo Response: ", resp);
   // setCounter(resp);
    setCasettes(CassetteData(data));
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
      sx={{ width: "100%", backgroundColor: "#F9FAFB", marginBottom: "20%" ,  height: "50vh"
      }}
    >
      {loading && (
         <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            //alignItems: "center",
            //textAlign: 'center',
              marginTop:'50%',
            height: "100vh",
          }}
        >
          {" "}
          {/* Full viewport height */}
          <CircularProgress />
        </Box>
      )}

       {!loading && !errorMsg && (
      <Box
        sx={{
          // borderBottom: 1,
          // borderColor: "divider",
          maxHeight: "50px", 
          width: "92%",
          margin:"auto",
          backgroundColor: "#F9FAFB",
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          display: "flex",
          justifyContent: "center",
        }}
      >
      <Grid container
                 wrap="nowrap"
                 sx={{
                     flexWrap: "nowrap",
                     alignItems: "center",
                 }}
             >
      {casettes.map((casette,index) => { 
             console.log(index);
          return(
            
            <Grid item xs={3} key={index}
            sx={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                minWidth: "110px",
            }}>
              <Button
              variant="outlined"
                sx={{
                  height: "40px",
                  color: value === index - 1 ? "#5F65FF" : "#1B1A1B",
                  backgroundColor:
                    value === index - 1 ? "#5F65FF0F !important" : "#FCFDFF",
                  borderColor: value === index - 1 ? "#5F65FF" : "#E4E6E9",
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
                  flexShrink: 0, // IMPORTANT
                }}
                {...a11yProps(index)}
                onClick={() => handleButtonClick(index - 1)}
              >
                {`Cassette ${index + 1}`}
              </Button>
            </Grid>
          )})}
        </Grid>
      </Box> )}

      {!loading && errorMsg && (
        <Box
            style={{
              display: 'flex',
              //justifyContent: 'center',
              //alignItems: 'center',
              textAlign: 'center',
              marginTop:'20%',
              height: '100vh',
              color: '#666', // Customize text color if needed
              fontSize: '16px',
            }}
          >
            Unable to get current counters and no previous data available.
          </Box>
      )}    

      {!loading && !errorMsg && (
      <Box>
      {/* <CustomTabPanel value={value} index={0}>
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
      </CustomTabPanel> */}
      {casettes.map((casette,index) => (
              <CustomTabPanel value={value} index={index-1}>
                  <TableComponent Tab={casette} />
              </CustomTabPanel>
            ))}
      </Box>
    )}
    </Box>
  );
};

export default CassetteCounterTabs;
