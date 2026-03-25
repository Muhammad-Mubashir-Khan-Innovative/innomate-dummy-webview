import * as React from 'react';
import Topbar from '../Components/TopBar';
import ATMListcomponent from '../Components/ATMListComponents/atmlist';
import Footer from '../Components/Footer';
import { useEffect,useState } from 'react';
import styles from '../styles.module.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ATMList =()=>{
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const { ATMStatusFilter} = location.state || {};
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
    return(
        <div className={styles.ATMListmainDiv} style={{width:dimensions.width}}>
            <Topbar LocationFilter={true} heading={'Device List'}/>
              <div >
              <ATMListcomponent ATMStatusFilter={ATMStatusFilter} ShowStatusFilter={true} ShowDetailsButton={true}/>
              </div>
            <Footer/>
        </div>
        );
    };
export default ATMList;