import * as React from 'react';
import Topbar from '../Components/TopBar';
import ATMListcomponent from '../Components/ATMListComponents/atmlist';
import Footer from '../Components/Footer';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ActionCenter =()=>{
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

      return(
        <div style={{backgroundColor:'#F5F5F5',height:dimensions.height,width:dimensions.width,marginBottom: '70px'}}>
        <Topbar heading={'Action Center'}/>
          <div  >
          <ATMListcomponent ShowStatusFilter={false} ShowCommandButton={true}/>
          </div>
        <Footer/>
        </div>
      );
      };
export default ActionCenter;