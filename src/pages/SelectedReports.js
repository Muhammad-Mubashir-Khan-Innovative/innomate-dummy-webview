import React, { useState, useEffect, useContext, useRef } from "react";
import {
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  Box,
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import Topbar from "../Components/TopBar";
import Footer from "../Components/Footer";
import { AppContext } from "../context.js";
import styles from "../styles.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import swal from "sweetalert";
import DataFile from "../Utilities/DataFile.js";

const StyledBox = styled(Box)({
  //maxWidth: "400px",
  //width:"90%",
  margin: "0 auto",
  padding: "20px",
  //border: "2px solid #2980b9", // Blue border for the box
  borderRadius: "8px",
  backgroundColor: "#FFFFFF",
   boxShadow: "0px 0px 40px 1px #5F65FF15",
  textAlign: "center",
});

const SectionDivider = styled(Box)({
  width: "100%",
  height: "2px",
  backgroundColor: "#2980b9", // Blue divider
  margin: "10px 0",
});

const IconLabelBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "10px",
});

const SelectedReports = () => {
  const location = useLocation();
  const { title } = location.state || { title: "Report" }; // Default fallback for title
  const [selectedDate, setSelectedDate] = useState(null);
  const [exportFormat, setExportFormat] = useState("PDF");
  const [atmDevices, setAtmDevices] = useState([]); // Selected ATM Devices (Multiple)
  const [assignedATMs, setAssignedATMs] = useState([]); // ATMs assigned to current user
  const [loading, setLoading] = useState(true); // Loading state for ATM list
    const apiURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false); // Spinner state

  const { state } = useContext(AppContext); // Access the AppContext
  const currentUserID = state.currentUserID; // Get the current logged-in user ID
  const username = state.user.UserID; // Assuming username is part of the state
  const fileRef = useRef("");

  useEffect(() => {
    console.log("ATM List:", state.ATMList);
    console.log("Current User ID:", state.currentUserID);

    const userAssignedATMs = state.ATMList.filter(
      (atm) => atm.assignedTo === state.currentUserID
    );

    console.log("Filtered Assigned ATMs:", userAssignedATMs);

    setAssignedATMs(userAssignedATMs); // Set the assigned ATMs to state
    setLoading(false); // Set loading to false once data is fetched
  }, [state.ATMList, state.currentUserID]);

  // Convert the selected date option to an actual date
  const getSelectedDate = () => {
    const today = new Date();
    let targetDate;

    switch (selectedDate) {
      case "today":
        targetDate = today;
        break;
      case "yesterday":
        targetDate = new Date(today.setDate(today.getDate() - 1));
        break;
      case "1week":
        targetDate = new Date(today.setDate(today.getDate() - 7));
        break;
      default:
        targetDate = today;
    }

    return targetDate.toISOString(); // Return the date as an ISO string for the API
  };

  // Function to generate CSV from JSON
  const jsonToCSV = (jsonData, deviceID) => {
    if (!jsonData || jsonData.length === 0) {
      console.warn(`No data available for DeviceID: ${deviceID}`);
      return;
    }

    const headers = Object.keys(jsonData[0]);
    const csvContent = [
      headers.join(","),
      ...jsonData.map((row) =>
        headers
          .map(
            (header) =>
              `"${
                row[header] ? row[header].toString().replace(/"/g, '""') : ""
              }"`
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const reader = new FileReader();
    reader.onload = function () {
      const base64Data = reader.result.split(",")[1];
      console.log("CSV file successfully encoded to Base64.");
      sendToReactNative(base64Data, `${title}_${deviceID}.csv`, "csv");
    };
    reader.readAsDataURL(blob);

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title}_${deviceID}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generatePDF = (reportData, deviceId, startDate, endDate) => {
    const doc = new jsPDF("landscape");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;

    // Header Section
    const logoWidth = 30;
    const logoHeight = 10;
    const logoBase64 = "/logo.png"; // Replace with actual logo path
    doc.addImage(logoBase64, "PNG", margin, 10, logoWidth, logoHeight);

    // Title Section
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.text(title, pageWidth / 2, 20, { align: "center" });

    // Dates Section - Only in header (Not as columns in the table)
    doc.setFontSize(10);
    doc.text(`${startDate} To ${endDate}`, pageWidth / 2, 30, {
      align: "center",
    });

    const currentDate = new Date().toLocaleDateString();
    doc.text(currentDate, pageWidth - margin - 30, 15);

    // Line Below Header
    doc.setLineWidth(0.5);
    doc.line(margin, 35, pageWidth - margin, 35);

    // Table Section
    let yOffset = 45;
    if (reportData.length > 0) {
      const headers = Object.keys(reportData[0]);
      const tableWidth = pageWidth - 2 * margin;
      const cellWidth = Math.max(tableWidth / headers.length, 25);

      // Add Table Headers (excluding startDate and endDate)
      doc.setFontSize(8);
      doc.setFont("Helvetica", "bold");
      headers.forEach((header, index) => {
        const xPos = margin + index * cellWidth;
        doc.text(header, xPos, yOffset, { maxWidth: cellWidth - 2 });
      });

      yOffset += 5;
      doc.line(margin, yOffset, pageWidth - margin, yOffset);
      yOffset += 5;

      // Add Data Rows
      doc.setFont("Helvetica", "normal");
      reportData.forEach((row) => {
        let rowHeight = 0;
        headers.forEach((header, colIndex) => {
          const xPos = margin + colIndex * cellWidth;
          const cellText = row[header]?.toString() || "";
          const wrappedText = doc.splitTextToSize(cellText, cellWidth - 2);
          wrappedText.forEach((line, lineIndex) => {
            const lineYOffset = yOffset + lineIndex * 4;
            doc.text(line, xPos, lineYOffset);
          });
          rowHeight = Math.max(rowHeight, wrappedText.length * 4);
        });

        yOffset += rowHeight;
        if (yOffset > pageHeight - 20) {
          doc.addPage();
          yOffset = 20;
        }
      });
    } else {
      doc.setFontSize(14);
      doc.text("No data available for this report.", margin, yOffset);
    }

    const pdfBlob = doc.output("blob");
    const reader = new FileReader();
    reader.onload = function () {
        const base64Data = reader.result.split(",")[1];
        fileRef.current = base64Data
      console.log("PDF file successfully encoded to Base64.");
      sendToReactNative(base64Data, `${title}_${deviceId}.pdf`, "pdf");
    };
    reader.readAsDataURL(pdfBlob);

    doc.save(`${title}_${deviceId}.pdf`);
  };

  const sendToReactNative = (base64Data, fileName, format) => {
    try {
      if (window.ReactNativeWebView) {
        console.log(
          `Sending ${format} file to React Native. File: ${fileName}`
        );
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            message: "ReportDownload",
            format,
            filename: fileName,
            //filename: "Report",
            content: base64Data,
          })
        );
      } else {
        throw new Error("ReactNativeWebView not found.");
      }
    } catch (error) {
      console.error("Error sending file to React Native:", error);
    }
  };

  const DemoHandleGenerateReport = async () => {
    setIsDownloading(true);
    if (title !== "User Status" && atmDevices.length === 0) {
      swal({
        icon: "warning",
        title: "ATM Device Required",
        text: "Please select at least one ATM device to generate the report.",
        button: "Okay",
      });
      setIsDownloading(false);
      return; // Stop further execution if no ATM device is selected, unless it's a user status report
    }

    if (!selectedDate) {
      swal({
        icon: "warning",
        title: "Date Range Required",
        text: "Please select a date range before generating the report.",
        button: "Okay",
      });
      setIsDownloading(false);
      return; // Stop further execution if no date range is selected
    }

    //setIsDownloading(true);
    const reportData = {
      atmDevices,
      username,
      title,
      selectedDate: getSelectedDate(),
      exportFormat,
    };

    console.log("Generating report with data:", reportData);
    
    try {
      
       const data = DataFile.ReportData

        // Generate the report in the selected format (CSV or PDF)
        if (exportFormat === "CSV") {
          jsonToCSV(data, "_Complete");
        } else if (exportFormat === "PDF") {
          generatePDF(data, "_Complete", "2025-04-21", "2025-04-21");
        }

        // navigate("/SuccessScreen", {
        //   state: {
        //     message:
        //       "Report downloading has started successfully. It will be saved in your device's Downloads folder.",
        //     heading: "Report Generated",
        //   },
        // });
      
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleGenerateReport = async () => {
    if (title !== "User Status report" && atmDevices.length === 0) {
      swal({
        icon: "warning",
        title: "ATM Device Required",
        text: "Please select at least one ATM device to generate the report.",
        button: "Okay",
      });
      return; // Stop further execution if no ATM device is selected, unless it's a user status report
    }

    if (!selectedDate) {
      swal({
        icon: "warning",
        title: "Date Range Required",
        text: "Please select a date range before generating the report.",
        button: "Okay",
      });
      return; // Stop further execution if no date range is selected
    }

    setIsDownloading(true);
    const reportData = {
      atmDevices,
      username,
      title,
      selectedDate: getSelectedDate(),
      exportFormat,
    };

    console.log("Generating report with data:", reportData);
    
    try {
      
        const response = await axios.post(
          `${apiURL}/ATMDetailsController/GetReportDetails`,
          reportData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state.token}`,
            },
          }
          );
      
    //  console.log("API Response:", response.data);

      if (DataFile.Demo || response.data?.ResponseCode === "00") {
        
        const reportDetails = DataFile.Demo? DataFile.ReportData : response.data.Data;
        console.log("Report generated successfully:", reportDetails);

        const consolidatedData = [];
        let startDate, endDate;

        // Consolidate data and filter out startDate and endDate from the table data
        Object.entries(reportDetails).forEach(([deviceId, reports]) => {
          reports.forEach((report) => {
            // Store startDate and endDate separately for PDF header
            startDate = report.StartDate || startDate;
            endDate = report.EndDate || endDate;

            // Exclude startDate and endDate from the report data before adding to consolidatedData
            const { StartDate, EndDate, ...filteredReport } = report;
            consolidatedData.push(filteredReport);
          });
        });

        if (consolidatedData.length === 0) {
          // Display a SweetAlert message if no data is available
          swal({
            icon: "info",
            title: "No Data Available",
            text: "No data available in your selected option. Please select another option or try again later.",
          });
          setIsDownloading(false);
          return;
        }

        console.log("ConsolidatedData")
        console.log(consolidatedData)

        // Generate the report in the selected format (CSV or PDF)
        if (exportFormat === "CSV") {
          jsonToCSV(consolidatedData, "_Complete");
        } else if (exportFormat === "PDF") {
          generatePDF(consolidatedData, "_Complete", startDate, endDate);
        }

        navigate("/SuccessScreen", {
          state: {
            message:
              "Report downloading has started successfully. It will be saved in your device's Downloads folder.",
            heading: "Report Generated",
          },
        });
      } else {
        console.error(
          "Failed to generate report:",
          response.data?.Message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
      const handleMessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Got data from React Native:", data);
          if(data.message == "Downloaded"){
            navigate("/SuccessScreen", {
              state: {
                message:
                  "Report downloading has started successfully. It will be saved in your device's Downloads folder.",
                heading: "Report Generated",
              },
            });
          }
        } catch (err) {
          console.error("Invalid message", err);
        }
      };
      document.addEventListener("message", handleMessage);
      window.addEventListener("message", handleMessage);
  
      // Cleanup event listener on component unmount
      return () => {
        document.removeEventListener("message", handleMessage);
        window.addEventListener("message", handleMessage);
      }
    }, []);

  return (
    <div className={styles.ATMListmainDiv}>
      <Topbar LocationFilter={false} heading={title} />
      <Box
         sx={{
          paddingBottom: "20px",
          height: "calc(100vh - 150px)",
          //height: "150vh",
          //height: "100%",
          overflowY: "auto",
          margin: "20px"
        }}
      >
        <StyledBox>
          {/* ATM Device ComboBox for Multiple Selection */}
          <Typography
                variant="subtitle1"
                align="left"
                style={{ fontFamily: "Gilroy", color:"#5D6679", marginTop:"10px", marginBottom:"10px" }}
              >
                Devices
              </Typography>
          <IconLabelBox>
            {/* <SearchIcon /> */}
            <FormControl fullWidth>
              {/* <InputLabel id="atm-device-select-label">ATM Devices</InputLabel> */}
              <Select
                
                multiple
                value={atmDevices} // This binds to the atmDevices state (which is an array)
                
                onChange={(e) => setAtmDevices(e.target.value)} // Ensure value is updated as an array
                size="small"
                disabled={title === "User Status"} // Disable the dropdown for "user status report"
                sx={{height: "50px", borderRadius:"10px"}}
              >
                {loading ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : assignedATMs.length > 0 ? (
                  assignedATMs.map((atm) => (
                    <MenuItem key={atm.DeviceID} value={atm.DeviceID}>
                      {atm.BranchName} ({atm.DeviceID})
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No ATMs assigned</MenuItem>
                )}
              </Select>
            </FormControl>
          </IconLabelBox>
          {/* <SectionDivider /> */}
          {/* Date Selector */}
           <IconLabelBox>
            {/* <CalendarTodayIcon /> */}
            <FormControl component="fieldset" fullWidth>
              <Typography
                variant="subtitle1"
                align="left"
                style={{ fontFamily: "Gilroy", color:"#5D6679", marginTop:"20px" }}
              >
                Date
              </Typography>
              <RadioGroup
                row
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ fontFamily: "Gilroy", color:"#5D6679", marginTop:"10px" }}
              >
                  <FormControlLabel
                  value="today"
                  control={<Radio />}
                  label="Today"
                  style={{
                    color:"#1B1A1B",
                    display:
                      title === "Cash Outage Report" ||
                      title === "Downtime Report" ||
                      title === "Dispenser Outage Report" ||
                      title === "Power Outage Report" ||
                      title === "Supervisory Mode Report" ||
                      title === "Incident Escalation Report"
                        ? "none"
                        : "flex",
                  }}
                />
                <FormControlLabel
                  value="yesterday"
                  control={<Radio />}
                  label="Yesterday"
                  style={{
                    color:"#1B1A1B"
                  }}
                />
                <FormControlLabel
                  value="1week"
                  control={<Radio />}
                  label="1 Week"
                  style={{
                    color:"#1B1A1B"
                  }}
                />
              </RadioGroup>
            </FormControl>
          </IconLabelBox>
          {/* <SectionDivider /> */}
          {/* Export Format Selector */}
           <IconLabelBox>
            {/* <UploadFileIcon /> */}
            <FormControl component="fieldset" fullWidth>
              <Typography
                variant="subtitle1"
                align="left"
                style={{ fontFamily: "Gilroy", color:"#5D6679" }}
              >
                Export As
              </Typography>
              <RadioGroup
                row
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                style={{ fontFamily: "Gilroy", color:"#1B1A1B", marginTop:"10px" }}
              >
                <FormControlLabel value="PDF" control={<Radio />} label="PDF" />
                <FormControlLabel value="CSV" control={<Radio />} label="CSV" />
              </RadioGroup>
            </FormControl>
          </IconLabelBox>
          {/* <SectionDivider /> */}
          {/* Generate Report Button */}
          {isDownloading ? <CircularProgress size={30} color="primary"/> : 
          <>
           </>
          }
        </StyledBox>
          <Button
            fullWidth
            variant="contained"
            onClick={DataFile.Demo ? DemoHandleGenerateReport : handleGenerateReport}
            disabled={isDownloading} // Disable the button during loading
            sx={{backgroundColor:"#5F65FF", height:"60px", borderRadius:"15px", fontSize:"20px", fontWeight:"bold",
              marginTop:"40px", textDecoration:"none"
            }}
          >
            {isDownloading ? "Downloading..." : "Generate Report"}
          </Button>
       
        <div style={{height:"10vh"}}></div>
      </Box>
      <Footer />
    </div>
  );
};

export default SelectedReports;
