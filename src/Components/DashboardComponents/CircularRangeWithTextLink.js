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
<CircularProgressWithRange min={min} max={max} value={value}  color={progressbarcolor}  />
<span style={{width:'100%'}}>
<h3 style={{fontFamily:['Gilroy','sans-serif'],fontWeight:'normal',marginLeft:'5%',marginTop:'10%',marginBottom:'1%',color:"#243465"}}>{heading}</h3>
<a onClick={handleNavigation('/ATMList',status)} style={{fontFamily:['Gilroy','sans-serif'],fontSize:'12px',marginLeft:'5%',marginTop:'3%',color:'#848A9C',textDecoration:"none"}} href='#'  rel="noopener noreferrer">{text}
</a>
</span>
<NavigateNextIcon onClick={handleNavigation('/ATMList',status)} sx={{marginTop:'10%'}}/>
</span>
 <Divider variant="middle" />
 </>
    );
};
export default CircularRangeWithTextLink;

