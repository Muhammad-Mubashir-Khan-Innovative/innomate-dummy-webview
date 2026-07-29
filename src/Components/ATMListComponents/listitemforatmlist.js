import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import styles from '../../styles.module.css'
import atmicon from '../../Sources/DevID.svg'
import locationicon from '../../Sources/locationicon.png'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import CommandMenu from '../ActionCenterComponents/CommandMenu';
import { AppContext } from '../../context.js';
import icon from '../../Sources/BLoc.svg'
import rightArrow from '../../Sources/RightArrow.png'
import downArrow from '../../Sources/downArrow.png'
import swal from 'sweetalert';
import { CircularProgress } from '@mui/material';
import { isOutOfService as isDeviceOutOfService, markOutOfService, clearOutOfService, getRemainingMinutes } from '../../Utilities/outOfServiceStore';

const ATMListitem = ({ deviceid, location, ShowDetailsButton, ShowCommandsButton, selectionMode, isOutOfService, messageText }) => {

  const [showCommands, setShowCommands] = useState(false);
  const [Rebootloading, setRebootloading] = useState(false);
  const [SendInServiceloading, setSendInServiceloading] = useState(false);
  const [loading,setLoading]=useState(false);
  const [SendOutOfServiceloading, setSendOutOfServiceloading] = useState(false);
  const [outOfServiceLock, setOutOfServiceLock] = useState(() => isDeviceOutOfService(deviceid));
  const [outOfServiceRemaining, setOutOfServiceRemaining] = useState(() => getRemainingMinutes(deviceid));
  const { state, setUser, setATMList, setATMs,setError, setDeviceid } = useContext(AppContext);

  useEffect(() => {
    const refreshLock = () => {
      setOutOfServiceLock(isDeviceOutOfService(deviceid));
      setOutOfServiceRemaining(getRemainingMinutes(deviceid));
    };
    refreshLock();
    const interval = setInterval(refreshLock, 30000);
    return () => clearInterval(interval);
  }, [deviceid]);

  const actions = [
    "Execute Job",
    "Bring In Service",
    "Reboot Device",
    "Set Out Of Service",
  ];
  const navigate = useNavigate();

  const handleViewDetailsClick = () => {
   // if (!isOutOfService) {
    const propData = { id: deviceid};
    navigate('/ATMHealth', { state: { propData } });
    //}
  };


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
    handleClose();
  };

  const DemoSendInService = () => {
    if (!isDeviceOutOfService(deviceid)) {
      swal({
        icon: 'warning',
        title: 'Already In Service',
        text: `Device ID ${deviceid} is already In Service.`,
        button: 'Okay',
      });
      return;
    }
    clearOutOfService(deviceid);
    setOutOfServiceLock(false);
    setOutOfServiceRemaining(null);
    navigate('/SuccessScreen', {
      state: {
        message: 'Your Device ID ' + String(deviceid) + ' has been sent to Bring in Service!',
        heading: 'Bring In Service',
      },
    });
  }

  const DemoSendOutOfService = () => {
    if (isDeviceOutOfService(deviceid)) {
      swal({
        icon: 'warning',
        title: 'Already Out of Service',
        text: `Device ID ${deviceid} is already Out of Service. It will become available again in about ${getRemainingMinutes(deviceid)} minute(s).`,
        button: 'Okay',
      });
      return;
    }
    markOutOfService(deviceid);
    setOutOfServiceLock(true);
    setOutOfServiceRemaining(getRemainingMinutes(deviceid));
    navigate('/SuccessScreen', {
      state: {
        message: 'Your Device ID ' + String(deviceid) + ' has been sent to be Out of Order.',
        heading: 'Send Out Of Service',
      },
    });
  }

  const DemoReboot = () => {
    navigate('/SuccessScreen', {
      state: {
        message: 'Your Device ID ' + String(deviceid) + ' has been Rebooted Successfully!',
        heading: 'Reboot Device',
      },
    });
  }

  const ExecuteJob = () => {
    console.log("In Execute Job")
    console.log(deviceid)
    setLoading(true);
    //setDeviceid(deviceid)
    setTimeout(() => {
      setLoading(false);
      navigate('/ExecuteJob');
    }, 500);
  };

  return (
    <>
      <div style={{width:selectionMode ? '80%' : '92%', height:showCommands ? '260px':'80px'}} className={styles.atmlistitemmaindiv}  >
        <div style={{ display: 'flex',flexDirection:"column", width:selectionMode ? '80%' : '70%' }}>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <img
              src={atmicon}
              alt="Description"
              className={styles.atmlisticon}

            />
            <h4 className={styles.atmlistheading} style={{ marginTop: '8px'}} ><b>Device ID:</b> {deviceid}</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <img
              src={icon}
              alt="Description"
              className={styles.atmlisticon}
              style={{ marginTop: '0px' }}
            />
            <h4 className={styles.atmlistheading} style={{ marginTop: '8px', overflow: 'hidden' }}><b>Location:</b> {location}</h4>
          </div>
        </div>
      
        <div style={{ width: '30%',marginTop:ShowCommandsButton? '15px' : '0px'}}>
        {ShowDetailsButton && (
          <Button
              //disabled={!isOutOfService}
              className={styles.responsivetext}
              onClick={handleViewDetailsClick}
             
              variant="text"
              sx={{
                float: 'right',
                textTransform: 'none !important',
                fontSize: '12px',
                fontFamily: 'Gilroy',
                fontWeight:'400',
                minWidth:'100px',
                marginTop:'24px', //isOutOfService ? '5px' : '15px', // Adjust margin based on isOutOfService
              color: '#5F65FF',//messageText ? 'black !important' : 'white', // Change text color to black when disabled
                opacity: isOutOfService ? 1 : 1, // Prevent opacity change on disabled state
              }}
               endIcon={<img
              src={rightArrow}
              alt="Description"
              

            />}
            >
              <b>{isOutOfService ? messageText : 'View Details '  }</b> {/* Show only the first 15 characters of messageText */}
          </Button>
        )}

        {ShowCommandsButton && !selectionMode && (
          //  <CommandMenu deviceid={deviceid}/>
                  <Button
                id="demo-customized-button"
                variant="text"
                sx={{
                  height:'30px',
                  width: '102px',
                  // backgroundColor: '#4197CB',
                  fontSize: '13px',
                  borderRadius:'8px',
                  color: '#5F65FF',
                  //marginLeft: '40px',
                  textTransform: 'none',
                  display: 'inline-flex',
                  marginTop:'10px',
                  padding: '0px 0px',
                  '& .MuiButton-endIcon': {
                    marginLeft: '10px', // Remove the margin-left property
                  },
                }}
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              
                disableElevation
                onClick={() => {setShowCommands(!showCommands)}}
                endIcon={
                  showCommands ?
                   <img
                    src={downArrow}
                    alt="Description"
                   /> 
                  :
                  <img
                    src={rightArrow}
                    alt="Description"
                 /> 
               }
              >
                Commands

              </Button>
            )}
        </div>

        {/* Action Panel */}
        {ShowCommandsButton && (
          <div className={styles.actionPanel} style={{display:`${showCommands ? 'block':"none"}`}}>
              <div className={styles.actionRow}>
                <span>Execute Job</span>
                {loading ? (
                    <CircularProgress 
                    size={26}
                    sx={{
                      marginRight:"4%",
                      color:"#5F65FF"
                    }} />
                  ) : (
                    <button
                      onClick={ExecuteJob}
                      className={styles.runBtn}
                    >
                      Run
                    </button>
                  )}
              
              </div>

              <div className={styles.actionRow}>
                <span>Bring In Service</span>
                {SendInServiceloading ? (
                    <CircularProgress
                    size={26}
                    sx={{
                      marginRight:"4%",
                      color:"#5F65FF"
                    }} />
                  ) : !outOfServiceLock ? (
                    <button
                      className={styles.runBtn}
                      disabled
                      style={{ opacity: 0.5, cursor: 'not-allowed' }}
                    >
                      Already In Service
                    </button>
                  ) : (
                    <button
                      onClick={DemoSendInService}
                      className={styles.runBtn}
                    >
                      Run
                    </button>
                  )}
              </div>

              <div className={styles.actionRow}>
                <span>Set Out Of Service</span>
                {SendOutOfServiceloading ? (
                    <CircularProgress
                    size={26}
                    sx={{
                      marginRight:"4%",
                      color:"#5F65FF"
                    }} />
                  ) : outOfServiceLock ? (
                    <button
                      className={styles.runBtn}
                      disabled
                      style={{ opacity: 0.5, cursor: 'not-allowed' }}
                    >
                      {`Out of Service (${outOfServiceRemaining}m)`}
                    </button>
                  ) : (
                    <button
                      onClick={DemoSendOutOfService}
                      className={styles.runBtn}
                    >
                      Run
                    </button>
                  )}
              </div>

              <div className={styles.actionRow}>
                <span>Reboot Device</span>
                {Rebootloading ? (
                    <CircularProgress 
                    size={26}
                    sx={{
                      marginRight:"4%",
                      color:"#5F65FF"
                    }} />
                  ) : (
                    <button
                      onClick={DemoReboot}
                      className={styles.runBtn}
                    >
                      Run
                    </button>
                  )}
              </div>

             
          </div>
        )}
         
      </div>
    
    </>
   
  );
};
export default ATMListitem;
