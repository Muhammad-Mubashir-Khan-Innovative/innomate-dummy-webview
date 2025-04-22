import React from "react";
import Topbar from "../Components/TopBar";
import SearchBar from "../Components/IncidentsComponents/SearchBar";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import IncidentListComponent from "../Components/IncidentsComponents/Incidentlist";

function Incidents() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const IsLoggedIn=sessionStorage.getItem("IsLoggedIn");
          if(IsLoggedIn !="Y" || IsLoggedIn==undefined)
            {
              navigate("/");
            
            }
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  window.addEventListener('resize', handleResize);

  // Cleanup event listener on component unmount
  return () => window.removeEventListener('resize', handleResize);
}, []);
  const { ATMStatusFilter } = location.state || {};

  return (
    <div className={styles.ATMListmainDiv} >
      <Topbar heading={"Incidents"} />
      <IncidentListComponent style={{ height: dimensions.height,backgroundColor:'#FFFFFF' }} />
      <Footer />
    </div>
  );
}

export default Incidents;
