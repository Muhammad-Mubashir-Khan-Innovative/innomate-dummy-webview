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

const SELECT_ALL_VALUE = "__SELECT_ALL__";

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

  const isAllDevicesSelected =
    assignedATMs.length > 0 &&
    assignedATMs.every((atm) => atmDevices.includes(atm.DeviceID));

  const handleDeviceSelectChange = (e) => {
    const value = e.target.value;
    if (value.includes(SELECT_ALL_VALUE)) {
      setAtmDevices(
        isAllDevicesSelected ? [] : assignedATMs.map((atm) => atm.DeviceID)
      );
      return;
    }
    setAtmDevices(value);
  };

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
    const logoBase64 = "data:image/png;base64,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";
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
       // The demo report generation below is effectively instant, which meant
       // the loading spinner never got a chance to actually render (React
       // batches the true/false state updates together). This small delay
       // gives users a visible loading indicator during "download".
       await new Promise((resolve) => setTimeout(resolve, 700));

       const data = DataFile.DemoReportDataByTitle[title] || DataFile.DemoReportDataByTitle["User Status"]

        const formatDisplayDate = (dateInput) =>
          new Date(dateInput).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
        const reportEndDate = formatDisplayDate(new Date());
        const reportStartDate = formatDisplayDate(getSelectedDate());

        // Generate the report in the selected format (CSV or PDF)
        if (exportFormat === "CSV") {
          jsonToCSV(data, "_Complete");
        } else if (exportFormat === "PDF") {
          generatePDF(data, "_Complete", reportStartDate, reportEndDate);
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
        
        const reportDetails = DataFile.Demo? (DataFile.DemoReportDataByTitle[title] || DataFile.DemoReportDataByTitle["User Status"]) : response.data.Data;
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

                onChange={handleDeviceSelectChange} // Ensure value is updated as an array
                size="small"
                disabled={title === "User Status"} // Disable the dropdown for "user status report"
                sx={{height: "50px", borderRadius:"10px"}}
              >
                {loading ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : assignedATMs.length > 0 ? (
                  [
                    <MenuItem key="__select_all__" value={SELECT_ALL_VALUE}>
                      {isAllDevicesSelected ? "Deselect All" : "Select All"}
                    </MenuItem>,
                    ...assignedATMs.map((atm) => (
                      <MenuItem key={atm.DeviceID} value={atm.DeviceID}>
                        {atm.BranchName} ({atm.DeviceID})
                      </MenuItem>
                    )),
                  ]
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
