import * as React from 'react';
import CircularProgressWithRange from '../DashboardComponents/CircularProgressRange.js';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context.js';
import { useContext } from 'react';

const CircularRangeWithTextLink =({min,max,value,heading,text,status,progressbarcolor})=>{
    const navigate = useNavigate(); // Hook for navigation
    const { state } = useContext(AppContext);
    const handleNavigation = (Route,status) => () => {
      navigate(Route, {
        state: {
          ATMStatusFilter:status,
        },
      }); // Navigate to the given path
    };
    return (
        <>
            <span style={{display:'inline-flex'}}>
              <CircularProgressWithRange 
                min={min} 
                max={max} 
                value={value}  
                color={progressbarcolor}  
               
              />
                <span style={{width:'100%',marginLeft:'5%'}}>
                    <h3 style={{fontFamily:['Gilroy','sans-serif'],fontWeight:'normal',marginTop:"2%",marginBottom:'1%',color:"#1B1A1B"}}>
                      {heading}
                      </h3>
                    <a onClick={handleNavigation('/ATMList',status)} 
                      style={{fontFamily:['Gilroy','sans-serif'],fontSize:'14px',color:'#999EA8',textDecoration:"none"}} 
                      href='#'  
                      rel="noopener noreferrer">{text}
                    </a>
                </span>
              <NavigateNextIcon onClick={handleNavigation('/ATMList',status)} sx={{marginTop:'4%',color:'#3E3E3E'}}/>
            </span>
            <Divider variant="middle" />
        </>
    );
};
export default CircularRangeWithTextLink;

