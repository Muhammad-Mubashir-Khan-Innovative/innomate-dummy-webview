import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  ThemeProvider,
  createTheme,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { AppContext } from "../../context.js";
import apiRequest from "../../Utilities/apiUtility.js";
import swal from "sweetalert";
import { useNavigate, useLocation } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#f0f0f0",
    },
  },
});

function ComplaintForm() {
  const apiURL = process.env.REACT_APP_API_URL;
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation(); // To access the passed state

  useEffect(() => {
    // Extract ATMid from location.state and set it in formData
    const { ATMid } = location.state || {};
    if (ATMid) {
      setFormData((prev) => ({ ...prev, atmId: ATMid }));
    }
  }, [location.state]);

  const [formData, setFormData] = useState({
    atmId: "", // Set the initial atmId from the passed state
    issueSubject: "",
    issueLocation: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Trim the value and check if it's just spaces
    if (value.trim() === "") {
      setFormData({
        ...formData,
        [name]: "", // Set to empty string instead of space
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation: Check if any required field is empty
    let missingFields = [];
    if (!formData.atmId) missingFields.push("ATM ID");
    if (!formData.issueSubject) missingFields.push("Issue Subject");
    if (!formData.issueLocation) missingFields.push("Issue Location");
    if (!formData.description) missingFields.push("Description");

    if (missingFields.length > 0) {
      let errorMessage = `Please fill ${missingFields.join(" and ")}`;
      swal(errorMessage, {
        buttons: {
          Okay: true,
        },
      });
      return; // Don't submit if any required field is empty
    }

    // Proceed with API requests if all fields are filled
    setLoading(true);

    apiRequest("POST", apiURL + "/AlertsController/SetAlertDetails", {
      headers: {
        Authorization: "Bearer " + state?.user?.Token,
      },
      body: {
        UserID: state?.user?.UserID,
        atmId: formData.atmId,
        issueSubject: formData.issueSubject,
        issueLocation: formData.issueLocation,
        description: formData.description,
      },
    })
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response?.error) {
          swal("An error occurred: Unable to Generate Alert on this device", {
            buttons: {
              Okay: true,
            },
          });
          return;
        }

        switch (response?.ResponseCode) {
          case "00":
            navigate("/SuccessScreen", {
              state: {
                message: "Your alert has been generated Successfully.",
                heading: "Alert generated",
              },
            });
            break;
          case "66":
          case "67":
            swal(
              "Notifications might not work on this device due to unknown error.",
              {
                buttons: {
                  Okay: true,
                },
              }
            );
            break;
          default:
            swal("Notifications might not work on this device.", {
              buttons: {
                Okay: true,
              },
            });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("API request failed:", error);
        swal("A network error occurred. Please try again later.", {
          buttons: {
            Okay: true,
          },
        });
      });

    apiRequest("POST", apiURL + "/AlertsController/SendAlertEmail", {
      headers: {
        Authorization: "Bearer " + state?.user?.Token,
      },
      body: {
        UserID: state?.user?.UserID,
        atmId: formData.atmId,
        issueSubject: formData.issueSubject,
        issueLocation: formData.issueLocation,
        description: formData.description,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("API request failed:", error);
        swal("A network error occurred. Please try again later.", {
          buttons: {
            Okay: true,
          },
        });
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme} sx={{ backgroundColor: "#7BB9DE" }}>
      <Container maxWidth="sm" sx={{ height: "100vh", overflow: "auto", backgroundColor: "#F5F7FD"}}>
        <Box
          sx={{
            mt: 3,
            mb: 3,
            //p: 2,
            //paddingBottom: "100px",
            height: "100%",
            //overflowY: "auto",
            
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* ATM ID */}
            <Typography
              variant="body1"
              component="label"
              htmlFor="atmId"
              sx={{
                display: "block",
                fontWeight: "bold",
                mb: 1,
                fontFamily: ["Gilroy","sans-serif"],
                fontSize: "16px",
                color: "#243465",
              }}
            >
              ATM ID
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              id="atmId"
              name="atmId"
              placeholder="ATM ID"
              value={formData.atmId} // Display passed ATM ID
              onChange={handleChange}
              InputProps={{
                style: {
                  borderRadius: "5px",
                  border: "1px solid #4197CB",
                  padding: "10px",
                  height: "60px",
                  backgroundColor:"white"
                },
              }}
              disabled // Disable the input field
              sx={{ mb: 3 }}
            />

            {/* Issue Subject */}
            <Typography
              variant="body1"
              component="label"
              htmlFor="issueSubject"
              sx={{
                display: "block",
                fontWeight: "bold",
                mb: 1,
                fontFamily: ["Gilroy","sans-serif"],
                fontSize: "16px",
                color: "#243465",
              }}
            >
              Issue Subject
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              id="issueSubject"
              name="issueSubject"
              placeholder="Issue Subject"
              value={formData.issueSubject}
              onChange={handleChange}
              InputProps={{
                style: {
                  borderRadius: "5px",
                  border: "1px solid #4197CB",
                  padding: "10px",
                  height: "60px",
                  backgroundColor:"white"
                },
              }}
              sx={{ mb: 3 }}
            />

            {/* Issue Location */}
            <Typography
              variant="body1"
              component="label"
              htmlFor="issueLocation"
              sx={{
                display: "block",
                fontWeight: "bold",
                mb: 1,
                fontFamily: ["Gilroy","sans-serif"],
                fontSize: "16px",
                color: "#243465",
              }}
            >
              Issue Location
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              id="issueLocation"
              name="issueLocation"
              placeholder="Issue Location"
              value={formData.issueLocation}
              onChange={handleChange}
              InputProps={{
                style: {
                  borderRadius: "5px",
                  border: "1px solid #4197CB",
                  padding: "10px",
                  height: "60px",
                  backgroundColor:"white"
                },
              }}
              sx={{ mb: 3 }}
            />

            {/* Description */}
            <Typography
              variant="body1"
              component="label"
              htmlFor="description"
              sx={{
                display: "block",
                fontWeight: "bold",
                mb: 1,
                fontFamily: ["Gilroy","sans-serif"],
                fontSize: "16px",
                color: "#243465",
              }}
            >
              Description
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              id="description"
              name="description"
              placeholder="Description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              InputProps={{
                style: {
                  borderRadius: "5px",
                  border: "1px solid #4197CB",
                  padding: "10px",
                  backgroundColor:"white"
                },
              }}
              sx={{ mb: 5 }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              style={{
                mt: 5,
                borderRadius: "5px",
                padding: "6px 16px",
                display: "block",
                margin: "0 auto",
                background: "#4197CB",
                height: "50px",
                fontSize: "16px",
                fontFamily: ["Gilroy","sans-serif"],
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Report Issue"
              )}
            </Button>
          </form>
          
        </Box>

        {/* Success Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            {error}
          </Alert>
        </Snackbar>
        <div style={{height:"20vh"}}></div>
      </Container>
    </ThemeProvider>
  );
}

export default ComplaintForm;
