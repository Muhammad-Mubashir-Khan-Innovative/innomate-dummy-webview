import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import JobResultsListItem from "./listitemforjobresultslist.js"; // Importing the JobResultsListItem component
import { useEffect, useState, useContext } from "react";
import ListItem from "@mui/material/ListItem";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../Utilities/apiUtility.js";
import swal from "sweetalert";
import {
  TextField,
  InputAdornment,
  CircularProgress,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { AppContext } from "../../context.js";
import DataFile from "../../Utilities/DataFile.js";

const JobResultListComponent = ({ selectedFilter }) => {
  const { state, setJobResults, setUser } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiURL = process.env.REACT_APP_API_URL;
  const [selected, setSelected] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const statusColors = {
    All: "#4197CB",
    Completed: "rgb(87, 205, 45)", // Adjust the color codes as needed
    Queued: "rgb(255, 165, 0)",
    Failed: "rgb(255, 0, 0)",
  };

  const DemoGetJobResultsAgainstUser = () => {
    const data = DataFile.DemoGetJobResultsAgainstUser;
    setJobResults(data)
    setLoading(false);
  }

  const GetJobResultsAgainstUser = () => {
    apiRequest("POST", apiURL + "/JobController/GetJobResults", {
      headers: {
        Authorization: "Bearer " + state?.user?.Token,
      },
      body: {
        UserID: state?.user?.UserID,
      },
    }).then((response) => {
      console.log("API Response:", response); // Log the received data

      if (response.error === "HTTP error! Status: 401") {
        swal("Session Expired! Please login again.", {
          buttons: { Okay: true },
        }).then((value) => {
          if (value === "Okay") {
            setUser(null);
            sessionStorage.removeItem("IsLoggedIn");
            window.ReactNativeWebView.postMessage("logout");
            navigate("/");
          }
        });
      } else if (response.error) {
        swal("Server stopped responding, Please try again later.", {
          buttons: { Okay: true },
        }).then(() => {
          sessionStorage.removeItem("IsLoggedIn");
          navigate("/dashboard");
        });
      } else if (
        response?.ResponseCode === "00" &&
        Array.isArray(response.Data)
      ) {
        // Sort job results by timestamp in descending order
        const sortedResults = response.Data.sort((a, b) => {
          const timeA = new Date(a.timestamp).getTime(); // Ensure 'timestamp' is the correct field
          const timeB = new Date(b.timestamp).getTime();
          return timeB - timeA; // Descending order (latest first)
        });

        console.log("Sorted Results:", sortedResults); // Log sorted results

        setJobResults(sortedResults);
        setLoading(false);
      } else {
        swal("Exception Occurred while fetching ATM data.", {
          buttons: { Okay: true },
        }).then(() => {
          sessionStorage.removeItem("IsLoggedIn");
          setUser(null);
          window.ReactNativeWebView.postMessage("logout");
          navigate("/");
        });
      }
    });
  };

  useEffect(() => {
    if(DataFile.Demo){
      DemoGetJobResultsAgainstUser()
    }else{
       GetJobResultsAgainstUser();
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (status) => {
    setSelected(status);
  };

  const statusMapping = {
    All: () => true,
    Completed: (item) => item.Result == "1",
    Queued: (item) => item.Result.trim() == "2",
    Failed: (item) => item.Result == "0",
  };

  const filteredItems = (state.JobResults || []).filter((item) => {
    const matchesStatus = statusMapping[selected]
      ? statusMapping[selected](item)
      : false;
    const matchesSearch =
      (item.deviceID &&
        item.deviceID.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.jobid &&
        item.jobid.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesStatus && (!searchTerm || matchesSearch);
  });

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#F5F7FF",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20%",
      }}
    >
      {/* Search Input */}
      <TextField
        variant="outlined"
        value={searchTerm}
        placeholder="Search by ATM ID or Job Name"
        onChange={handleSearchChange}
        sx={{
          width: "90%",
          marginBottom: "10px",
          marginTop: "20px",
          "& .MuiOutlinedInput-root": { borderRadius: "15px",backgroundColor:"white" },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Status Filter Buttons */}
      <div
        style={{
          display: "inline-flex",
          width: "95%",
          overflowX: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {["All", "Completed", "Queued", "Failed"].map((status, index) => (
          <Button
            key={`${status}-${index}`}
            onClick={() => handleFilterChange(status)}
            variant="contained"
            sx={{
              backgroundColor:
                selected === status
                  ? `${statusColors[status]}!important`
                  : "#FFFFFF",
              color: selected === status ? "#fff" : "#000",
              fontSize: "12px",
              height: "40px",
              width: "25%",
              minWidth: "20%",
              margin: "5px",
              borderRadius: "8px",
              textTransform: "none",
            }}
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Conditionally show loader or data */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress style={{ color: "#0000ff" }} />
        </Box>
      ) : (
        <Box
        sx={{
          padding: "20px",
          height: "calc(100vh - 170px)",
          width:"100%",
          overflow: "auto",
        }}>
          {/* Show "No Results Found" when the list is empty */}
          {filteredItems.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                // marginTop: "50%",
              }}
            >
              <Typography variant="h6" sx={{ color: "rgba(0, 0, 0, 0.5)" }}>
                No Results Found
              </Typography>
            </Box>
          ) : (
            <>
              {filteredItems.map((item, index) => (
                <ListItem
                  key={`${item.deviceID}-${item.jobid}-${index}`} // Combining `deviceID`, `jobid`, and `index` to ensure uniqueness
                  sx={{
                    paddingRight: "2px",
                    marginBottom: index === filteredItems.length - 1 ? "1%" : 0, // Add margin to the last item
                  }}
                >
                  <JobResultsListItem
                    Datetime={item.timestamp}
                    JobName={item.jobid}
                    ATMID={item.deviceID}
                    Result={item.Result}
                    CommandNo={item.commandno}
                  />
                </ListItem>
              ))}

              {/* Text to prompt user to view more results on the web portal */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "20%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(0, 0, 0, 0.6)", textAlign: "center" }}
                >
                  To view more results, please use Web Portal.
                </Typography>
              </Box>
            </>
          )}
          <div style={{height:"10vh"}}></div>
        </Box>
      )}
    </div>
  );
};

export default JobResultListComponent;
