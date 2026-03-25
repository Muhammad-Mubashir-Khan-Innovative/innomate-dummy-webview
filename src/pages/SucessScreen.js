import * as React from 'react';
import successimage from '../Sources/SuccessTick.png'
import styles from "../styles.module.css";
import Topbar from '../Components/TopBar';
import Footer from '../Components/Footer';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SuccessScreen = () =>{
  const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);
       const [options,setOptions] = useState(false)

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000); // 2 seconds
  
      return () => clearTimeout(timer); // Cleanup on unmount
    }, []);
    
    const [message,setMessage] = useState(location.state.message || {});
    const [heading,setHeading] = useState(location.state.heading || {});
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

          if(heading == "Report Generated"){
            console.log("In change")
            setOptions(true)
          }

          const handleResize = () => {
            setDimensions({
              width: window.innerWidth,
              height: window.innerHeight,
            });
          };
    
           const handleMessage = (event) => {
          try {
            
            const data = JSON.parse(event.data);
            console.log("Got data from React Native:", data);
            if(data.message == "Downloaded"){
              setOptions(false)
              setMessage("Your file has been downloaded successfully.")
            }
          } catch (err) {
            console.error("Invalid message", err);
          }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener("message", handleMessage);
    
        // Cleanup event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
          document.removeEventListener("message", handleMessage);
        }
      }, []);

   return(
        <div 
          style={{backgroundColor:"#F9FAFB" 
           }}
        >
        <Topbar heading={heading} />
          <div style={{backgroundColor:"#FFFFFF", margin:"20px",paddingTop:"50px",marginTop:dimensions.height * 0.2,
            borderRadius:"20px",  boxShadow: "0px 0px 40px 1px #5F65FF15"
           }} >
          
             <div style={{ marginLeft: '40%',height:'84px',width:'84px'}}>
            <img src={successimage} />
            </div>
          
            <div style={{width:'100%',  marginTop:'7%',display:'flex',justifyContent:'center',padding:'0px'}}>
                <span
                  style={{
                      display: 'block', // Ensures the span behaves like a block element
                      maxWidth: '70%', // Limits the text width to 70% of the screen
                      fontSize: '20px',
                      fontFamily: 'Gilroy',
                      color: '#1B1A1B',
                      marginLeft: 'auto',
                      marginRight: 'auto', // Centers the text horizontally
                      textAlign: 'center', // Centers the text inside the span
                      wordWrap: 'break-word', // Ensures the text wraps to the next line if it exceeds the max width
                      marginBottom:'20px'
                  }}
                  >
                  {message}
                    {/* {"Report Downloading has started successfully. It will be saved in your device's download folder."} */}
                  </span>  
                    
            </div>
            
          </div>

          <Footer />
        </div>
    )
};
export default SuccessScreen;