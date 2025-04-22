import React from "react";
import Topbar from "../Components/TopBar";
import SearchBar from "../Components/IncidentsComponents/SearchBar";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import JobResultListComponent from "../Components/JobResultsComponents/JobResultlist";

function JobResults() {
  const location = useLocation();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  return (
    <div className={styles.ATMListmainDiv} style={{ width: dimensions.width }}>
      <Topbar heading={"Job Results"} />
      <JobResultListComponent/>
      <Footer />
    </div>
  );
}

export default JobResults;
