import * as React from "react";
import Topbar from "../Components/TopBar";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ATMHealthTabs from "../Components/ATMHealthComponents/ATMHealthTabs";

const ATMHealth = () => {
  const location = useLocation();
  const { propData } = location.state || {};
  const navigate = useNavigate();

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    const IsLoggedIn = sessionStorage.getItem("IsLoggedIn");
    if (IsLoggedIn != "Y" || IsLoggedIn == undefined) {
      navigate("/");
    }
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      <Topbar heading={propData.id} backbutton={true} complaintButton={true} />
      <div>
        <ATMHealthTabs ATMid={propData.id} />
      </div>
      <Footer />
    </div>
  );
};
export default ATMHealth;
