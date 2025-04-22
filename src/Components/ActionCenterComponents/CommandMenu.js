import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useState,useContext } from 'react';
import { useEffect } from 'react';
import apiRequest from '../../Utilities/apiUtility';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress } from '@mui/material';
import { AppContext } from '../../context.js';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Backdrop from '@mui/material/Backdrop';
import DataFile from '../../Utilities/DataFile.js';


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    backgroundColor: '#EBF4FA',
  },
}));

const CommandMenu = ({deviceid,bgcolor,height,width}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { state, setUser, setATMList, setATMs,setError } = useContext(AppContext);
  const [Rebootloading, setRebootloading] = useState(false);
  const [SendInServiceloading, setSendInServiceloading] = useState(false);
  const [loading,setLoading]=useState(false);
  const [SendOutOfServiceloading, setSendOutOfServiceloading] = useState(false);
  const apiURL = process.env.REACT_APP_API_URL;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate(); // Hook for navigation
  

  const handleClose = () => {
    setAnchorEl(null);
  };
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

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const DemoSendInService = () => {
    navigate('/SuccessScreen', {
      state: {
        message: 'Your Device ID ' + String(deviceid) + ' has been sent to Bring in Service!',
        heading: 'Bring In Service',
      },
    });
  }

  const SendInService = () => {
    setSendInServiceloading(true);
    apiRequest('POST', apiURL+'/CommandExecutionController/BringInService', {
      headers:{
        "Authorization": "Bearer "+ state?.user?.Token
      },
      body: {
          "DeviceID": deviceid,
          "UserID":state?.user?.UserID
      }
    }).then(response => {
      setSendInServiceloading(false);
      console.log(response.error)
      if (response.error === "HTTP error! Status: 401") {
        swal("Session Expired! Please login again.", {
          buttons: {
            Okay: true,
          },
        }).then(value => {
          switch (value) {
            case "Okay":
              setUser(null);
             sessionStorage.removeItem("IsLoggedIn");
              window.ReactNativeWebView.postMessage("logout");
              navigate('/'); // Navigate to login screen
              break;
          }
        });
        return;
      }
      else if(response.error){
        swal("Server stopped responding, Please try again later.", {
          buttons: {
            Okay: true,
          },
        })
        .then((value) => {
          switch (value) {
            case "Okay":
              navigate('/ActionCenter');
              break;  
          }
        });
      return;
      
      }
      else if(response !== null){
       if(response.ResponseCode=='00'){
        navigate('/SuccessScreen', {
          state: {
            message: 'Your Device ID ' + String(deviceid) + ' has been sent to Bring in Service!',
            heading: 'Bring In Service',
          },
        });
       }
       else if (response.ResponseCode=="46" ){
        swal("Exception Occured during Bring Out Of Service Execution. Try again later", {
          buttons: {
            Okay: true,
          },
        })
        .then((value) => {
          switch (value) {
            case "Okay":
              navigate('/ActionCenter');
              break;  
          }
        });
      return;
       }
       else if (response.ResponseCode=="47" ){
        swal("Bring In Service Command Execution failed.", {
          buttons: {
            Okay: true,
          },
        })
        .then((value) => {
          switch (value) {
            case "Okay":
              navigate('/ActionCenter');
              break;  
          }
        });
      return;
       }
      }
    else{
      swal("Exception Occured while executing Commands.", {
        buttons: {
          Okay: true,
        },
      })
      .then((value) => {
        switch (value) {
          case "Okay":
            navigate('/ActionCenter');
            break;  
        }
      });
    return;
    }

    });
  };

  const ExecuteJob = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/ExecuteJob', {
        state: {
          deviceid:String(deviceid),
        },
      });
    }, 500);
  };

  const DemoSendOutOfService = () => {
    navigate('/SuccessScreen', {
      state: {
        message: 'Your Device ID ' + String(deviceid) + ' has been sent to be Out of Order.',
        heading: 'Send Out Of Service',
      },
    });
  }

  const SendOutOfService = () => {
    setSendOutOfServiceloading(true);
    apiRequest('POST', apiURL+'/CommandExecutionController/BringOutOfService', {
      headers:{
        "Authorization": "Bearer "+ state?.user?.Token
      },
      body: {
          "DeviceID": deviceid,
          "UserID":state.user.UserID
      }
    }).then(response => {
      setSendOutOfServiceloading(false);
      if (response.error === "HTTP error! Status: 401") {
        swal("Session Expired! Please login again.", {
          buttons: {
            Okay: true,
          },
        }).then(value => {
          switch (value) {
            case "Okay":
              setUser(null);
             sessionStorage.removeItem("IsLoggedIn");
              window.ReactNativeWebView.postMessage("logout");
              navigate('/'); // Navigate to login screen
              break;
          }
        });
        return;
      }
      else if(response.error){
        console.log(response.error)
        swal("Server stopped responding, Please try again later.", {
          buttons: {
            Okay: true,
          },
        })
        .then((value) => {
          switch (value) {
            case "Okay":

              navigate('/ActionCenter');
              break;  
          }
        });
      return;
      
      }
      else if(response !== null){
       if(response.ResponseCode=='00'){
        console.log("In success")
        navigate('/SuccessScreen', {
          state: {
            message: 'Your Device ID ' + String(deviceid) + ' has been sent to be Out of Order.',
            heading: 'Send Out Of Service',
          },
        });
       }
       else if (response.ResponseCode=="52" ){
        swal("Bring Out Of Service Command Execution Failed. Try again later", {
          buttons: {
            Okay: true,
          },
        })
        .then((value) => {
          switch (value) {
            case "Okay":
              navigate('/ActionCenter');
              break;  
          }
        });
      return;
       }
       else if (response.ResponseCode=="51" ){
        swal("Exception Occured during Bring Out Of Service Execution. Try again later", {
          buttons: {
            Okay: true,
          },
        })
        .then((value) => {
          switch (value) {
            case "Okay":
              navigate('/ActionCenter');
              break;  
          }
        });
      return;
       }
      }
    else{
      swal("Exception Occured while fetching ATM's. Please co-ordinate with Vendor", {
        buttons: {
          Okay: true,
        },
      })
      .then((value) => {
        switch (value) {
          case "Okay":
           sessionStorage.removeItem("IsLoggedIn");
            setUser(null);
            window.ReactNativeWebView.postMessage("logout");
            navigate('/');
            break;  
        }
      });
    return;
    }

    });
  };

  const DemoReboot = () => {
    navigate('/SuccessScreen', {
      state: {
        message: 'Your Device ID ' + String(deviceid) + ' has been Rebooted Successfully!',
        heading: 'Reboot Device',
      },
    });
  }

  const reboot = () => {
    setRebootloading(true);
    apiRequest('POST', apiURL+'/CommandExecutionController/RebootATM', {
      headers:{
        "Authorization": "Bearer "+ state?.user?.Token
      },
      body: {
          "DeviceID": deviceid,
          "UserID":state.user.UserID
      }
    }).then(response => {
      setRebootloading(false);
      if (response.error === "HTTP error! Status: 401") {
        swal("Session Expired! Please login again.", {
          buttons: {
            Okay: true,
          },
        }).then(value => {
          switch (value) {
            case "Okay":
              setUser(null);
             sessionStorage.removeItem("IsLoggedIn");
              window.ReactNativeWebView.postMessage("logout");
              navigate('/'); // Navigate to login screen
              break;
          }
        });
        return;
      }
      else if(response.error){
        swal("Server stopped responding, Please try again later.", {
          buttons: {
            Okay: true,
          },
        })
        .then((value) => {
          switch (value) {
            case "Okay":
              navigate('/ActionCenter');
              break;  
          }
        });
      return;
      
      }
      else if(response !== null){
       if(response.ResponseCode=='00'){
        navigate('/SuccessScreen', {
          state: {
            message: 'Your Device ID ' + String(deviceid) + ' has been Rebooted Successfully!',
            heading: 'Reboot Device',
          },
        });
       }
       else if (response.ResponseCode=="42" ){
        swal("Reboot Command Execution Failed. Try again later", {
          buttons: {
            Okay: true,
          },
        })
        .then((value) => {
          switch (value) {
            case "Okay":
              navigate('/ActionCenter');
              break;  
          }
        });
      return;
       }
       else if (response.ResponseCode=="41" ){
        swal("Exception Occured during Reboot ATM execution. Try again later", {
          buttons: {
            Okay: true,
          },
        })
        .then((value) => {
          switch (value) {
            case "Okay":
              navigate('/ActionCenter');
              break;  
          }
        });
      return;
       }
      }
    else{
      swal("Exception Occured while fetching ATM's. Please co-ordinate with Vendor", {
        buttons: {
          Okay: true,
        },
      })
      .then((value) => {
        switch (value) {
          case "Okay":
           sessionStorage.removeItem("IsLoggedIn");
            setUser(null);
            window.ReactNativeWebView.postMessage("logout");
            navigate('/');
            break;  
        }
      });
    return;
    }

    });
  };


  return (
    
    <div style={{ width:width ? width :  '100%', backgroundColor: bgcolor  }}>
      <Button
        id="demo-customized-button"
        sx={{
          height:height? height : '30px',
          width: '102px',
          backgroundColor: '#4197CB',
          fontSize: '13px',
          borderRadius:'8px',
          textTransform: 'none',
          display: 'inline-flex',
          padding: '0px 0px',
          '& .MuiButton-endIcon': {
            marginLeft: '0px', // Remove the margin-left property
          },
        }}
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon sx={{ padding: '0px', margin: '0px' }} />}
      >
        View Cmd's
      </Button>

      {/* Backdrop Component */}
      <Backdrop
        open={open}
        onClick={handleClose}
        sx={{
          zIndex: 1,
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        }}
      />

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          width: '100vw', // Set the menu width to 100% of the viewport width
          maxWidth: '100vw',
          '& .MuiPaper-root': {
            backgroundColor: '#EBF4FA', // Set the background color for the menu items container
          },
        }}
      >
        <MenuItem
          sx={{ width: dimensions.width, backgroundColor: '#EBF4FA' }}
          onClick={handleClose}
          disableRipple
        >
          <div style={{ width: dimensions.width * 0.65 }}>
            Execute Job
          
          </div>
          <div>
            <Button onClick={ExecuteJob} sx={{ backgroundColor: '#4197CB', textTransform: 'none' }} variant="contained" size="small">
              Run
            </Button>
          </div>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          sx={{ width: dimensions.width, backgroundColor: '#EBF4FA' }}
          onClick={handleClose}
          disableRipple
        >
          <div style={{ width: dimensions.width * 0.65 }}>
            Bring In Service
          </div>
          <div>
          {SendInServiceloading ? (
              <CircularProgress size={20} sx={{ marginLeft: 1 }} />
            ) : (
              <Button
                onClick={DataFile.Demo ? DemoSendInService : SendInService}
                sx={{ backgroundColor: '#4197CB', textTransform: 'none' }}
                variant="contained"
                size="small"
              >
                Run
              </Button>
            )}
          </div>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          sx={{ width: dimensions.width, backgroundColor: '#EBF4FA' }}
          onClick={handleClose}
          disableRipple
        >
          <div style={{ width: dimensions.width * 0.65 }}>
            Reboot Device
          </div>
          <div>
            {Rebootloading ? (
              <CircularProgress size={20} sx={{ marginLeft: 1 }} />
            ) : (
              <Button
                onClick={DataFile.Demo ? DemoReboot : reboot}
                sx={{ backgroundColor: '#4197CB', textTransform: 'none' }}
                variant="contained"
                size="small"
              >
                Run
              </Button>
            )}
          </div>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          sx={{ width: dimensions.width, backgroundColor: '#EBF4FA' }}
          onClick={handleClose}
          disableRipple
        >
          <div style={{ width: dimensions.width * 0.65 }}>
            Send Out of Service
          </div>
          <div>
          {SendOutOfServiceloading ? (
              <CircularProgress size={20} sx={{ marginLeft: 1 }} />
            ) : (
              <Button
                onClick={DataFile.Demo ? DemoSendOutOfService  : SendOutOfService }
                sx={{ backgroundColor: '#4197CB', textTransform: 'none' }}
                variant="contained"
                size="small"
              >
                Run
              </Button>
            )}
          </div>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />
      </StyledMenu>
    </div>
  );
};

export default CommandMenu;
