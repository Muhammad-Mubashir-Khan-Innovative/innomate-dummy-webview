import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, LinearProgress } from "@mui/material";

const TableComponent = ({ Tab }) => {
  const keys = Object.keys(Tab);
  const values = Object.values(Tab);

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
       
        height: dimensions.height * 0.7,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflowY:"auto"
      }}
    >
      <Grid container sx={{ flexGrow: 1 }}>
        {keys.map((key, index) => {
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
          } else {
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
                  borderBottom: "1px solid #ccc",
                }), // Add border only if not last item
              }}
            >
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "left",
                    paddingLeft: "25%",
                    color: "#838383",
                    fontFamily: ["Gilroy","sans-serif"],
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
                      margin: "0 auto",
                    }}
                  >
                    <LinearProgress
                      variant="determinate"
                      value={progressValue}
                      sx={{
                        height: "100%",
                        borderRadius: "5px",
                        backgroundColor: "#f0f0f0", // Background color for the track
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#54CA36", // Color of the progress bar
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
                        color: "#000", // Adjust text color as needed
                        fontFamily: ["Gilroy","sans-serif"],
                        lineHeight: "20px", // Center the text vertically
                      }}
                    >
                      {values[index]}%
                    </Typography>
                  </Box>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "left",
                      fontWeight: "bold",
                      fontFamily: ["Gilroy","sans-serif"],
                      wordWrap: "break-word",
                    }}
                  >
                    {values[index]}
                  </Typography>
                )}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <div style={{height:"15vh"}}></div>

    </Box>
  );
};

export default TableComponent;
