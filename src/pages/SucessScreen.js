import * as React from 'react';
import successimage from '../Sources/SuccessTick.png'
import Topbar from '../Components/TopBar';
import Footer from '../Components/Footer';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SuccessScreen = () =>{
  const navigate = useNavigate();
    const location = useLocation();
    
    const { message,heading} = location.state || {};
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
        <>
        <Topbar heading={heading } />
<div style={{height:dimensions.height * 0.5}} >
    <div style={{marginTop:dimensions.height * 0.3, marginLeft: '40%',height:'84px',width:'84px'}}>
    <img src={successimage} />
    </div>
    <div style={{width:'100%',  marginTop:'3%',display:'flex',justifyContent:'center',padding:'0px'}}>
        <span
  style={{
    display: 'block', // Ensures the span behaves like a block element
    maxWidth: '70%', // Limits the text width to 70% of the screen
    fontSize: '20px',
    fontFamily: 'Gilroy',
    color: '#131313',
    marginLeft: 'auto',
    marginRight: 'auto', // Centers the text horizontally
    textAlign: 'center', // Centers the text inside the span
    wordWrap: 'break-word', // Ensures the text wraps to the next line if it exceeds the max width
  }}
>
  {message}
</span>
    </div>

</div>

<Footer />
</>
    )
};
export default SuccessScreen;