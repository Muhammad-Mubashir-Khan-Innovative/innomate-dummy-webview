import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import styles from "../../styles.module.css";

const JobResultsListItem = ({
  JobName,
  Datetime, // New date prop
  Result,
  ATMID,
  CommandNo
}) => {
  const navigate = useNavigate();

  const getButtonColor = () => {
    if (Result === "0") {
      return "#FF0000"; // Red for Failed
    } else if (Result === "1") {
      return "#27E247"; // Green for Success
    } else if (Result === "2") {
      return "#F0DC29"; // Yellow for queued
    }
    return "#B0B0B0"; // Default gray color if no match (you can change this)
  };

  const getButtonText = () => {
    if (Result === "0") {
      return "Failed";
    } else if (Result === "1") {
      return "Success";
    }
    else if (Result === "2") {
      return "Queued";
    }
    // Default button text
  };

  return (
    <div
      style={{ width: "92%", height: "90px", padding: '10px' }}
      className={styles.atmlistitemmaindiv}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
        }}
      >
        {/* Date Section */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h4
            className={styles.atmlistheading}
            style={{
              fontSize: "12px",
              fontWeight: "lighter",
            }}
          >
            {Datetime ? new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            }).format(new Date(Datetime)) : null}
          </h4>{" "}
          {/* Display the date here */}
        </div>
        {/* PMID Section */}
        <div style={{ display: "flex", flexDirection: "row", height: "25px" }}>
          <h3
            className={styles.atmlistheading}
            style={{
              fontSize: "16px",
              marginTop: "-12px",
              fontFamily: "Gilroy",
            }}
          >
            {JobName}
          </h3>
        </div>
        <div style={{ display: "flex", flexDirection: "row", height: "25px" }}>
          <h3
            className={styles.atmlistheading}
            style={{
              fontSize: "14px",
              marginTop: "-12px",
              fontFamily: "Gilroy",
            }}
          >
            Command No: {CommandNo}
          </h3>
        </div>

        {/* ATMID Section */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h4
            className={styles.atmlistheading}
            style={{ marginTop: "-8px", fontSize: "12px" }}
          >
            <b>ATMID: {ATMID}</b>
          </h4>
        </div>
      </div>

      <div
        style={{ width: "30%", marginTop: "0px" }}
      >

<Button
  variant="contained"
  sx={{
    float: "right",
    textTransform: "none !important",
    fontSize: "12px",
    fontFamily: "Gilroy",
    marginTop: "28px",
    backgroundColor: getButtonColor(),
    color: "white",
    width: "100px",
    "&:hover": {
      backgroundColor: getButtonColor(), // Prevents color change on hover
    },
    "&:active": {
      backgroundColor: getButtonColor(), // Prevents color change on click
    },
    "&:focus": {
      backgroundColor: getButtonColor(), // Prevents color change on focus
    },
  }}
  onClick={(e) => e.preventDefault()} // Prevents any action on click
>
  {getButtonText()}
</Button>

      </div>
    </div>
  );
};

export default JobResultsListItem;
