import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, LinearProgress } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const TableComponent = ({ Tab }) => {
  const keys = Object.keys(Tab);
  const values = Object.values(Tab);
  const [errorMsg, setErrorMxg] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      sx={{
        height: dimensions.height * 0.6,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflowY:"auto",
        boxShadow: "0px 0px 40px 1px #5F65FF15",
        width:"90%",
        margin:"auto",
        marginTop:"20px",
        borderRadius:"20px",
        backgroundColor:"white"
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
              Unable to get System Information and no previous data available.
            </Box>
        )}    

      {!loading && !errorMsg && (
      <Grid container sx={{ flexGrow: 1 }}>
        {keys.map((key, index) => {
          if(key == "UserID" || key == "DeviceID" || key == "EndTime" || key == "RepNumber" ){return null}
          let displayKey;
          let progressValue = 0; // Default value for progress

          // Conditional logic for key display and progress value
          if (key === "location") {
            displayKey = "Location";
          } else if (key === "deviceid") {
            displayKey = "Name";
          } else if (key.startsWith("Host Communication Error")) {
            displayKey = "Host Communication";
          } else if (
            key === "Denomination1" ||
            key === "Denomination2" ||
            key === "Denomination3" ||
            key === "Denomination4"
          ) {
            displayKey = "Denomination";
          } else if (key === "LstTnxTime") {
            displayKey = "Lst Tnx Time";
          } else if (key.startsWith("Filling Level")) {
            displayKey = "Filling Level";
            // Check for "Details not Found" and set progress value accordingly
            if (values[index] === "Details Not Found") {
              progressValue = null; // Set to null to skip progress bar
            } else {
              // Assuming filling level is a value between 0 and 100
              progressValue = Math.min(100, Math.max(0, values[index])); // Ensure value is between 0 and 100
            }
          } else if (
            key === "Cash Remaining1" ||
            key === "Cash Remaining2" ||
            key === "Cash Remaining3" ||
            key === "Cash Remaining4"
          ) {
            displayKey = "Cash Remaining";
          } else if (
            key === "Reject1" ||
            key === "Reject2" ||
            key === "Reject3" ||
            key === "Reject4"
          ) {
            displayKey = "Rejected";
          } else if (
            key === "Status1" ||
            key === "Status2" ||
            key === "Status3" ||
            key === "Status4"
          ) {
            displayKey = "Status";
          } else if(key === "StartTime")
          {
            displayKey = "Created At"
          } else if(key === "Classif")
          {
            displayKey = "Escalation Level"
          } else if(key === "Pmid")
          {
            displayKey = "PMID"
          } else if(key === "Trxn_type")
          {
            displayKey = "Transaction Type"
          } else if(key === "Trxn_date")
          {
            displayKey = "Transaction Date"
          } else if(key === "Trxn_time")
          {
            displayKey = "Transaction Time"
          }else {
            displayKey = key;
          }

          return (

            
            <Grid
              item
              xs={12}
              container
              key={key}
              sx={{
                flexGrow: 1,
                alignItems: "center",
                ...(index !== keys.length - 1 && {
                  borderBottom: "1px solid #C7C7C780",
                }), // Add border only if not last item
              }}
            >

              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "left",
                    paddingLeft: "15%",
                    color: "#1B1A1B",
                    fontFamily: ["Gilroy","sans-serif"],
                    fontWeight:"700",
                    fontSize:"15px",
                  }}
                >
                  {displayKey}:
                </Typography>
              </Grid>
             
              <Grid item xs={6}>
                {displayKey === "Filling Level" && progressValue !== null ? (
                  <Box
                    sx={{
                      position: "relative",
                      width: "130px",
                      height: "20px",
                      marginLeft:'15px'
                      // margin: "0 auto",
                    }}
                  >
                    <LinearProgress
                      variant="determinate"
                      value={progressValue}
                      sx={{
                        height: "100%",
                        borderRadius: "5px",
                        fontSize:"10px",
                        
                        backgroundColor: "#f0f0f0", // Background color for the track
                        "& .MuiLinearProgress-bar": {
                          color:"white",
                          backgroundColor: "#A6CF46", // Color of the progress bar
                        },
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        position: "absolute",
                        top: "0",
                        left: "50%",
                        transform: "translateX(-50%)",
                        color: progressValue > 50 ? "white":"#000", // Adjust text color as needed
                        fontFamily: ["Gilroy","sans-serif"],
                        lineHeight: "20px", // Center the text vertically
                      }}
                    >
                      {values[index]}%
                    </Typography>
                  </Box>
                ) : 
                displayKey === "Status" ?
                (
                    <Box sx={{ display: 'flex', alignItems: 'center',marginLeft:'15px' }}>
                    {values[index] ? 
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor:values[index] == 'Active' || values[index] == 'Completed'  ? '#17B26A': '#DC3545' ,
                        marginRight: '5px',
                      }}
                    />
                    :
                    <Typography
                      variant="body1"
                      sx={{ textAlign: 'left',fontSize:"15px", fontFamily: 'Gilroy', wordWrap: 'break-word', color: "black"}}
                    > Details Not Found</Typography>    
                    }
                    <Typography
                      variant="body1"
                      sx={{ textAlign: 'left',fontSize:"15px", fontFamily: 'Gilroy', wordWrap: 'break-word', color: values[index] == 'Active' || values[index] == 'Completed' ? '#17B26A': '#DC3545'}}
                    >
                      {values[index]}
                    </Typography>
                  </Box>
                )
                :
                displayKey !== "UserID" && displayKey !== "DeviceID" && displayKey !== "EndTime" && displayKey !== "RepNumber"   ?
                (
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "left",
                      fontWeight: "400",
                      fontSize:"15px",
                      fontFamily: ["Gilroy","sans-serif"],
                      wordWrap: "break-word",
                      marginLeft:'15px;'
                    }}
                  >
                    {values[index] ? values[index] : "Details Not Found" }
                  </Typography>
                ):(null)}
              </Grid>
            </Grid>
          );
        })}
      </Grid>)}
      <div style={{height:"10vh"}}></div>

    </Box>
  );
};

export default TableComponent;
