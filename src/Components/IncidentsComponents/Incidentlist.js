import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import IncidentListItem from "./listitemforincidentlist.js";
import { useEffect, useState, useContext } from "react";
import ListItem from "@mui/material/ListItem";
import {
  TextField,
  InputAdornment,
  CircularProgress,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { AppContext } from "../../context.js";

const IncidentListComponent = () => {
  const { state } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const statusColors = {
    All: "#4197CB",
    Opened: "rgb(255, 0, 0)",
    Closed: "rgb(87, 205, 45)",
  };
  const hardcodedData = state.IncidentDetails;

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (status) => {
    setSelected(status);
  };

  const filteredItems = (hardcodedData || [])
    .filter((item) => {
      const matchesStatus = selected === "All" || item.Status === selected;
      const matchesSearch =
        (item.DeviceID &&
          item.DeviceID.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.Pmid &&
          item.Pmid.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => new Date(b.StartTime) - new Date(a.StartTime)); // Sort by StartTime in descending order

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#F9FAFB",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh", // Ensures the content takes full height
      }}
    >
      {/* Search Input */}
      <TextField
        variant="outlined"
        value={searchTerm}
        placeholder="Search by ATM ID OR Incident Name"
        onChange={handleSearchChange}
        sx={{
          width: "90%",
          marginBottom: "10px",
          marginTop: "20px",
          color:"#999EA8",
          "& .MuiOutlinedInput-root": { borderRadius: "15px",backgroundColor:"white" },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{color:"#999EA8"}}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Status Filter Buttons */}
      <div
        style={{
          display: "inline-flex",
          width: "90%",
          overflowX: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {["All", "Opened", "Closed"].map((status, index) => (
          <Button
            key={`${status}-${index}`} // Combine status and index for a unique key
            onClick={() => handleFilterChange(status)}
            variant="outlined"
            sx={{
              backgroundColor:
                selected === status
                  ? "#5F65FF0F"
                  : "#FFFFFF",
              color: selected === status ? "#5F65FF" : "#1B1A1B",
              borderColor: selected === status ? "#5F65FF" : "#E4E6E9",
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

      {/* Container for the list of incidents */}
      <Box
        sx={{
          flexGrow: 1, // This ensures the content expands to fill available space
          overflowY: "auto", // Allows scrolling when content overflows
          width: "100%", // Ensure it takes full width
          paddingBottom: "30px", // Prevents footer from overlapping content
          height: "calc(30vh - 190px)",

        }}
      >
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
            <CircularProgress style={{ color: "#4197CB" }} />
          </Box>
        ) : (
          <>
            {/* Show "No Device Found" when the list is empty */}
            {filteredItems.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "20%",
                  marginTop: "50%",
                }}
              >
                <Typography variant="h6" sx={{ color: "rgba(0, 0, 0, 0.5)" }}>
                  No Incident Found
                </Typography>
              </Box>
            ) : (
              filteredItems.map((item) => (
                <ListItem key={item.RepNumber} sx={{ paddingRight: "2px" }}>
                  <IncidentListItem
                    date={item.StartTime}
                    pmid={item.Pmid}
                    deviceid={item.DeviceID}
                    EscalationLevel={item.Classif}
                    status={item.Status}
                    buttonColor="#4197CB"
                  />
                </ListItem>
              ))
            )}
          </>
        )}
         <div style={{height:"20vh"}}></div>
      </Box>

      {/* Footer */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#fff",
          padding: "10px 0",
          textAlign: "center",
          boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        Footer Content Here
      </div>
    </div>
  );
};

export default IncidentListComponent;
