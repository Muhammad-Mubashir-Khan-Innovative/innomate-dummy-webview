import React from "react";
import { Typography, Box, Card, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Topbar from "../Components/TopBar";
import Footer from "../Components/Footer";
import styles from "../styles.module.css";

const Reports = () => {
  const navigate = useNavigate();

  // Function to calculate the date one day less than today
  const getPreviousDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Set the date to one day before
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return today.toLocaleDateString("en-GB", options); // Format the date as DD/MM/YYYY
  };

  // Get today's date
  const getCurrentDate = () => {
    const today = new Date();
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return today.toLocaleDateString("en-GB", options); // Format the date as DD/MM/YYYY
  };

  // Data for multiple cards with unique headings
  const cardData = [
    "Cash Outage",
    "Downtime",
    "Dispenser Outage",
    "Power Outage",
    "Supervisory Mode",
    "Incident Escalation",
    "User Status",
    "Last Transaction",
  ];

  const previousDate = getPreviousDate();
  const currentDate = getCurrentDate();

  // Function to handle card click
  const handleCardClick = (title) => {
    navigate("/SelectedReports", { state: { title } });
  };

  return (
    <div className={styles.ATMListmainDiv}>
      <Topbar LocationFilter={false} heading={"Reports"} />

      <Box
        sx={{
          padding: "20px",
          height: "calc(100vh - 150px)",
          overflowY: "auto",
          
        }}
      >
        <Grid container spacing={2}
        
        >
          {cardData.map((title, index) => (
            <Grid item xs={6} sm={6} md={4} key={index}>
              <Card
                onClick={() => handleCardClick(title)} // Card is now clickable
                style={{
                  borderRadius: "15px",
                  boxShadow: "0px 0px 40px 1px #5F65FF15",
                  padding: "10px",
                  height: "120px", // Reduced height
                  //minHeight:"100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  fontFamily: "Gilroy, sans-serif",
                  cursor: "pointer", // Pointer cursor for better UX
                }}
              >
                <CardContent
                  style={{ padding: "0", fontFamily: "Gilroy, sans-serif" }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      color:"#343434",
                      fontWeight: "bold",
                      marginBottom: "6px",
                      fontSize: "16px",
                      fontFamily: "Gilroy, sans-serif",
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#6F7373",
                      fontFamily: "Gilroy, sans-serif",
                    }}
                  >
                    {title} Summary
                  </Typography>
                  {/* <Typography
                    variant="body2"
                    style={{
                      marginTop: "6px",
                      fontSize: "12px",
                      color: "#666",
                      fontFamily: "Gilroy, sans-serif",
                    }}
                  >
                    You can choose ATM Device(s) as per your choosing.
                  </Typography> */}
                </CardContent>
                <Typography
                  variant="body2"
                  style={{
                    textAlign: "left",
                    fontSize: "14px",
                    color: "#979797",
                    fontFamily: "Gilroy, sans-serif",
                  }}
                >
                  {/* Change the date for the last three reports */}
                  Till: {index >= cardData.length - 3 ? currentDate : previousDate}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div style={{height:"10vh"}}></div>
      </Box>
     
      <Footer />
    </div>
  );
};

export default Reports;
