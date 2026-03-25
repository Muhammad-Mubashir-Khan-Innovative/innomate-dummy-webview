import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import styles from "../../styles.module.css";
import atmicon from "../../Sources/atmicon.png";
import locationicon from "../../Sources/locationicon.png";
import CommandMenu from "../ActionCenterComponents/CommandMenu";
import CircleIcon from '@mui/icons-material/Circle';

const IncidentListItem = ({
  deviceid,
  pmid,
  date,
  buttonColor,
  EscalationLevel,
  status,
}) => {
  const navigate = useNavigate();

  const handleViewDetailsClick = () => {
    const propData = { id: deviceid };
    navigate("/ATMHealth", { state: { propData } });
  };

  const getButtonColor = () => {
    if (status === "Closed") {
      return "#17B26A";
    } else if (status === "Opened") {
      return "#FF6671";
    }
    return buttonColor;
  };



  return (
    <div
      style={{ width:"92%",height:"100px",padding:'10px' }}
      className={styles.atmlistitemmaindiv}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width:  "70%",
        }}
      >
        {/* Date Section */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h4
            className={styles.atmlistheading}
            style={{
              fontSize: "13px",
              fontWeight: "lighter",
              fontFamily: "Gilroy",
              color:"#979797"
            }}
          >
          {date ? new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  }).format(new Date(date)) : null}
          </h4>{" "}
          {/* Display the date here */}
        </div>
        {/* PMID Section */}
        <div style={{ display: "flex", flexDirection: "row", height: "25px" }}>
          <h3
            className={styles.atmlistheading}
            style={{
              fontSize: "13px",
              marginTop: "-10px",
              fontFamily: "Gilroy",
            }}
          >
            {pmid}
          </h3>
        </div>
        <div style={{ display: "flex", flexDirection: "row", height: "25px" }}>
          <h3
            className={styles.atmlistheading}
            style={{
              fontSize: "13px",
              marginTop: "-10px",
              fontFamily: "Gilroy",
              color:"#979797"
            }}
          >
            Escalation Level: {EscalationLevel}
          </h3>
        </div>

        {/* ATMID Section */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h4
            className={styles.atmlistheading}
            style={{ marginTop: "-10px", fontSize: "13px" }}
          >
            <b>ATMID: {deviceid}</b>
          </h4>
        </div>
      </div>

      <div
        style={{ width: "30%", marginTop:  "0px" }}
      >
 
        <Button
          variant="text"
          disableRipple
          startIcon={<CircleIcon size={26} />}
          sx={{
            float: "right",
            textTransform: "none !important",
            fontSize: "14px",
            fontFamily: "Gilroy",
            marginTop: "28px",
          // backgroundColor: getButtonColor(),
            color: getButtonColor(),
            width: "100px",
            // "&:hover": {
            //   backgroundColor: getButtonColor(), // Prevents color change on hover
            // },
            // "&:active": {
            //   backgroundColor: getButtonColor(), // Prevents color change on click
            // },
            // "&:focus": {
            //   backgroundColor: getButtonColor(), // Prevents color change on focus
            // },
          }}
          onClick={(e) => e.preventDefault()} // Prevents any action on click
        >
          {status}
        </Button>
      </div>
    </div>
  );
};

export default IncidentListItem;
