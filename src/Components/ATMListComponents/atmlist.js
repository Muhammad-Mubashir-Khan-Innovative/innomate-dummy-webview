import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ATMListitem from "./listitemforatmlist";
import styles from "../../styles.module.css";
import { useEffect, useRef, useState, useContext } from "react";
import ListItem from "@mui/material/ListItem";
import {
  TextField,
  InputAdornment,
  CircularProgress,
  Typography,
  MenuItem,
  Select,
  Backdrop,
  Autocomplete,
} from "@mui/material";
import { Button, Checkbox, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AppContext } from "../../context.js";
import { useNavigate } from "react-router-dom";
import { isOutOfService as isDeviceOutOfService } from "../../Utilities/outOfServiceStore";

const ATMListcomponent = ({
  ShowStatusFilter,
  ShowDetailsButton,
  ShowCommandButton,
  ATMStatusFilter,
}) => {
  const { state, setLocationFilter } = useContext(AppContext);

  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const selectedButtonRef = useRef(null);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [LocationSelected, setLocationSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(ATMStatusFilter || "All");
  const [hiername, setHiername] = useState(""); // Ensure it's always a string
  const handleHiernameChange = (event, newValue) => {
    setHiername(newValue || ""); // Prevent setting undefined
  };
  const isSpecificLocationSelected = hiername !== "";

  useEffect(() => {
    if (state.ATMList.length > 0) {
      setLoading(false);
    }
  }, [state.ATMList]);
  const distinctHiernames = [
    "All Location",
    ...new Set(state.ATMList.map((item) => item.HierName)),
  ];
  const handleScroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollOffset;
    }
  };
  useEffect(() => {
    setLocationFilter(false);
    if (isSpecificLocationSelected) {
      setLocationSelected(true);
    } else {
      setLocationSelected(false);
    }
  }, [hiername]);
  const scrollToCenter = () => {
    if (scrollContainerRef.current && selectedButtonRef.current) {
      const scrollContainerWidth = scrollContainerRef.current.offsetWidth;
      const buttonPosition = selectedButtonRef.current.offsetLeft;
      const buttonWidth = selectedButtonRef.current.offsetWidth;
      const scrollPosition =
        buttonPosition - scrollContainerWidth / 2 + buttonWidth / 2;
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToCenter();
  }, [selected]);

  const statusColors = {
    All: "#5F65FF0F",
    "In Service": "#5F65FF0F",
    Linkdown: "#5F65FF0F",
    Supervisory: "#5F65FF0F",
    "Out of Service": "#5F65FF0F",
    "Comp Down": "#5F65FF0F",
    "Low Cash": "#5F65FF0F",
  };

  const handleSelect = (status, event) => {
    event.stopPropagation();
    setSelected(status);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getStatusFromBit = (bit) => {
    const statuses = [];

    if (bit === 3 || bit === 2 || bit === 1 || bit === 6 || bit === 11) {
      statuses.push("Comp Down"); // Check for Comp Down category
    }
    if (bit === 13) {
      statuses.push("Supervisory");
    }
    if (bit === 14) {
      statuses.push("Linkdown");
    }
    if (bit === 5) {
      statuses.push("Out of Cash");
    }
    if (bit === 7) {
      statuses.push("Low Cash");
    }
    if (bit === null) {
      statuses.push("In Service");
    }

    return statuses.length > 0 ? statuses : ["Unknown"]; // Return array of statuses or 'Unknown'
  };

  const getStateFromPrio = (Prio) => {
    if (Prio > 0 && Prio <= 6) return "Out of Service";
    return "In Service";
  };

  const OutOfServiceMachines = state.ATMList.filter((item) => {
    const status = getStateFromPrio(item.Prio) === "Out of Service" || isDeviceOutOfService(item.DeviceID);
    const matchHiername = hiername === "" || item.HierName === hiername;
    return status && matchHiername;
  });

  const filteredItems = state.ATMList.filter((item) => {
    const locked = isDeviceOutOfService(item.DeviceID);
    // A locked device is never "In Service" — that's mutually exclusive with
    // Out of Service, unlike Supervisory/Linkdown/Out of Cash/Comp Down which
    // can still additively apply based on the device's underlying Bit value.
    const statuses = getStatusFromBit(item.Bit).filter(
      (status) => !(locked && status === "In Service")
    );
    if (locked) statuses.push("Supervisory");
    const matchStatus = selected === "All" || statuses.includes(selected);
    const matchHiername =
      hiername === "All Location" ||
      hiername === "" ||
      item.HierName === hiername;
    return matchStatus && matchHiername;
  }).filter((item) =>
    item.DeviceID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#F9FAFB",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20% !important",
      }}
    >
      <TextField
        // color="secondary" 
        variant="outlined"
        value={searchTerm}
        placeholder="Search by Device ID"
        onChange={handleSearchChange}
        sx={{
          // width: "100%",
          marginBottom: "10px",
          marginTop: "20px",
          width: "90%",
          
          "& .MuiOutlinedInput-root": {
            borderRadius: "15px", backgroundColor:"#FFFFFF",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{color:"#999EA8"}}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Status Filter */}
      {ShowStatusFilter && (
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            whiteSpace: "nowrap",
            position: "relative",
          }}
        >
          {/* Left Arrow for Scrolling */}
          {/* <ArrowBackIosIcon
            onClick={() => handleScroll(-200)}
            style={{
              position: "absolute",
              left: "0",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              borderRadius: "50%",
              padding: "5px",
              zIndex: 1,
            }}
          /> */}

          {/* Scrollable Content */}
          <div
            ref={scrollContainerRef}
            style={{
              display: "inline-flex",
              width: "90%",
              overflowX: "auto",
              scrollBehavior: "smooth",
              marginLeft: "4%",
              paddingBottom:"5px"
            }}
          >
            {[
              "All",
              "In Service",
              "Out of Service",
              "Linkdown",
              "Supervisory",
              "Out of Cash",
              "Low Cash",
              "Comp Down",
            ].map((status) => {
              const displayText = (() => {
                if (status === "All" && LocationSelected) {
                  return selected !== "All" ? "Filter (2)" : "Filter (1)"; // Check if a status is also selected
                }
                return status;
              })();

              return (
                <Button
                  ref={status === selected ? selectedButtonRef : null}
                  variant="outlined"
                  key={status}
                  className={styles.responsivetext}
                  onClick={(event) => handleSelect(status, event)}
                  sx={{
                    backgroundColor:
                      displayText === "Filter (2)"
                        ? "#4197CB"
                        : selected === status
                        ? "#FCFDFF"
                        : "#FFFFFF",
                    color:
                      displayText === "Filter (2)"
                        ? "#fff"
                        : selected === status
                        ? "#5F65FF"
                        : "#1B1A1B",
                    fontSize: "12px",
                    height: "40px",
                    width: "105px",
                    minWidth: "90px",
                    margin: "5px",
                    borderColor: selected === status ? "#5F65FF" : "#E4E6E9",
                    borderRadius: "12px",
                    textTransform: "none",
                    display: "inline-flex",
                  }}
                >
                  {displayText}
                </Button>
              );
            })}
          </div>

          {/* Right Arrow for Scrolling */}
          {/* <ArrowForwardIosIcon
            onClick={() => handleScroll(200)}
            style={{
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              borderRadius: "50%",
              padding: "5px",
              zIndex: 1,
            }}
          /> */}
        </div>
      )}

      {state.LocationFilter && (
        <Backdrop
          open={true}
          style={{ zIndex: 1, color: "#fff" }}
          onClick={() => setLocationFilter(false)} // Close when clicking outside
        >
          <Box
            sx={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "20px",
              position: "absolute", // Ensure it opens at the top
              top: "67px", // Adjust vertical position
              left: "50%", // Center horizontally
              transform: "translateX(-50%)", // Offset for proper centering
              zIndex: 9999, // Keep it above other elements
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <Autocomplete
              value={hiername}
              onChange={(event, newValue) => {
                setHiername(newValue || "All Location")
              }}
              options={distinctHiernames}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Location"
                  variant="outlined"
                  sx={{ width: "300px" }}
                />
              )}
            />
          </Box>
        </Backdrop>
      )}

      {/* Conditionally show the loader while processing data */}
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
            //height:"30px",
            height: "calc(100vh - 170px)",
            width:"100%",
            overflowY: "auto",
          }}
        >
          {/* Show "No Device Found" when the list is empty */}
          {filteredItems.length === 0 && selected !== "Out of Service" && (
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
                No Device Found
              </Typography>
            </Box>
          )}

        
          {/* Render list of ATMs */}
          {(selected === "Out of Service"
            ? OutOfServiceMachines
            : filteredItems
          ).map((item, index, array) => {
            const isSelected = selectedItems.includes(item.DeviceID);
            const isOutOfService = selected === "Out of Service"; // Determine if the current item is out of service

            return (
              <ListItem
                sx={{
                  overflow:"auto",
                  paddingRight: "5px",
                  marginBottom: index === array.length - 1 ? "80px" : "0px", // Add 80px margin to the last item
                }}
                key={item.DeviceID}
              >
                {selectionMode && (
                  <Checkbox
                    checked={isSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems([...selectedItems, item.DeviceID]);
                      } else {
                        setSelectedItems(
                          selectedItems.filter((id) => id !== item.DeviceID)
                        );
                      }
                    }}
                  />
                )}

                <ATMListitem
                  deviceid={item.DeviceID}
                  location={item.BranchName}
                  ShowDetailsButton={ShowDetailsButton}
                  ShowCommandsButton={ShowCommandButton}
                  selectionMode={selectionMode}
                  isOutOfService={isOutOfService} // Pass the flag to ATMListitem
                  messageText={isOutOfService ? item.MessageText : ""} // Pass MessageText if out of service
                />
              </ListItem>
            );
          })}
         
         <div style={{height:"15vh"}}></div>

        </Box>
      )}
    </div>
  );
};

export default ATMListcomponent;
