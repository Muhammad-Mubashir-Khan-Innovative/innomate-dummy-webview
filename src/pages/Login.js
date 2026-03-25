import React, { useContext, useState } from "react";
import { Alert, TextField, Box } from "@mui/material";
import styles from "../styles.module.css";
import apiRequest from "../Utilities/apiUtility";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useEffect, useCallback } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import { AppContext } from "../context.js";
import { ContinuousColorLegend } from "@mui/x-charts";
import OtpModal from "../Components/OtpModal.jsx";
import swal from "sweetalert";
import InnoImage from "../Sources/InnoLogo.svg";
import Smile from "../Sources/Smile.svg";
import InputField from "../Components/InputField.jsx";
import Warning from "../Sources/Warning.png";
import DataFile from "../Utilities/DataFile.js"

function Login() {
  const { state, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setusername] = React.useState("");
  const handleUsernameChange = (event) => {
    setusername(event.target.value);
  };
  const [loading, setLoading] = React.useState(false);
  const [password, setpassword] = React.useState("");
  const [passworderror, setpassworderror] = React.useState(false);
  const [isBiometricEnable, setisBiometricEnable] = React.useState(false);
  const [ErrorMxg, setErrorMxg] = React.useState("");
  ///////////////////////////////
  const [open, setOpen] = useState(false);
  const [deviceId, setDeviceId] = useState()
  const [OS, setOS] = useState()
  const [version, setVersion] = useState()
  const [model, setModel] = useState()
  const [allowRegister,setAllowRegister] = useState(false)
  //////////////////////////////
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handlepasswordChange = (event) => {
    setpassword(event.target.value);
    setpassworderror(false);
    setErrorMxg("");
  };

  const apiURL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    // Define a global function to receive data from React Native
    window.receiveCredentials = (credentials) => {

      //setusername(credentials.username);
      setusername("Mubashir")
      //setpassword(credentials.password);
      setpassword("admin")
      setTimeout(() => {
        document.getElementById("loginButton").click();
      }, 1000);
    };

    window.receiveDeviceId = (deviceId) => {
      sessionStorage.setItem("deviceID", deviceId);
      setDeviceId(deviceId)
    };

    window.receiveOS = (os) => {
      setOS(os)
    };

    window.receiveVersion = (ver) => {
      setVersion(ver)
    };

    window.receiveModel = (mod) => {
      setModel(mod)
    };

    window.handleFlag = (IsBiometricEnableReq) => {
      setisBiometricEnable(IsBiometricEnableReq);
    };

    window.ReactNativeWebView.postMessage("logout");
    sessionStorage.removeItem("IsLoggedIn");
    setUser(null);
    window.handleFlag = window.handleFlag || (() => {});
    window.receiveCredentials = window.receiveCredentials || (() => {});
    window.receiveDeviceId = window.receiveDeviceId || (() => {});
  }, []);

  useEffect(() => {
    if (state.user) {
      navigate("/dashboard");
      if (isBiometricEnable) {
        handleLoginSuccess();
      }
     window.ReactNativeWebView.postMessage("true");
    }
  }, [state.user]);

  useEffect(() => {
    const initialHeight = window.innerHeight;

    const handleResize = () => {
      const heightDiff = initialHeight - window.innerHeight;

      if (heightDiff > 150) {
        setKeyboardOpen(true);   // keyboard is open
      } else {
        setKeyboardOpen(false);  // keyboard is closed
      }
    };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

  const handleLoginSuccess = () => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        username: username,
        password: password,
      })
    );
  };

  const DemoLogin = () => {
    if(username.trim() === "" || password.trim() === "")
    {
      setErrorMxg("Please enter both Email Address and Password");
      return;
    }
    setLoading(true);
    const data = DataFile.DemoLogin
    setLoading(false);
    if (data.username === username && data.password === password ){
      console.log(data.username + " " + data.password)
      setUser(DataFile.DemologinResponse);
      sessionStorage.setItem("IsLoggedIn", "Y");
    }else{
      setErrorMxg("Incorrect Email Address or Password.");
      setpassworderror(true);
    }

  }

  const Login = () => {
    setLoading(true);
    apiRequest("POST",apiURL+"/Authentication/login", {
      body: {
        UserID: username,
        Password: password,
        DeviceID: "220e83df6e757bc0", //sessionStorage.getItem("deviceID"),
      },
    }).then((response) => {
      //console.log(response)
      setLoading(false);
      if (response.error) {
        setErrorMxg("Server is not responding, Please try again later.");
      } else if (response.ResponseCode == "00") {
        setUser(response);
        sessionStorage.setItem("IsLoggedIn", "Y");
      } else if (response.ResponseCode == "01") {
        setpassworderror(true);
      } else {
        setErrorMxg(response.ResponseMessage);
      }
    });
  };

    const register = () => {
    setAllowRegister(false)
      apiRequest("POST", "/Authentication/SettingOTP", {
          body: {
            UserID: username,
            DeviceID: deviceId,
           //DeviceID: "6da2e8428eec0388"
          },
        }).then((response) => {
          console.log(response)
          if (response.error === "HTTP error! Status: 401") {
            swal("Session Expired! Please login again.", {
              buttons: {
                Okay: true,
              },
            }).then((value) => {
              switch (value) {
                case "Okay":
                  setUser(null);
                  sessionStorage.removeItem("IsLoggedIn");
                  window.ReactNativeWebView.postMessage("logout");
                  navigate("/"); // Navigate to login screen
                  break;
              }
            });
            return;
          } else if (response.error) {
            swal("Server stopped responding, Please try again later.", {
              buttons: {
                Okay: true,
              },
            }).then((value) => {
              switch (value) {
                case "Okay":
                  sessionStorage.removeItem("IsLoggedIn");
                  setUser(null);
                  window.ReactNativeWebView.postMessage("logout");
                  navigate("/");
                  break;
              }
            });
            return;
          } else if (response !== null) {
            if (response.ResponseCode == "00") {
              console.log("its Done")
              setErrorMxg("OTP sent successfully to your registered email address.")
              setOpen(true)
              
            } else if (response.ResponseCode == "82" 
              || response.ResponseCode == "84" 
              || response.ResponseCode == "85"
              || response.ResponseCode == "83" ) {
              console.log("its Done")
              setErrorMxg(response.ResponseMessage)
            } else {
            swal(
              "Exception Occured while Authorising User. Please co-ordinate with Vendor",
              {
                buttons: {
                  Okay: true,
                },
              }
            ).then((value) => {
              switch (value) {
                case "Okay":
                  sessionStorage.removeItem("IsLoggedIn");
                  setUser(null);
                  window.ReactNativeWebView.postMessage("logout");
                  navigate("/");
                  break;
              }
            });
            return;
            }
          } else {
            swal(
              "Exception Occured while Authorising User. Please co-ordinate with Vendor",
              {
                buttons: {
                  Okay: true,
                },
              }
            ).then((value) => {
              switch (value) {
                case "Okay":
                  sessionStorage.removeItem("IsLoggedIn");
                  setUser(null);
                  window.ReactNativeWebView.postMessage("logout");
                  navigate("/");
                  break;
              }
            });
            return;
          }
          
        });

    
  }

  return (
    <>
      <div className={styles.LoginContainer}>
        <div className={styles.LoginHeaderText}>
          <img src={InnoImage}/>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className={styles.LoginHeading}>
            <p>Welcome <img src={Smile} style={{ height:"25px",width:"25px"}}/></p> 
          </div>
          
          <div className={styles.Logintext} >
            <p>Sign in to continue to Innomate</p>
          </div>
        </div>

        <div className={styles.LoginInputFieldArea}>
         <Typography
                variant="subtitle1"
                align="left"
                style={{ width:"90%",fontFamily: "Gilroy", color:"#1B1A1B", marginTop:"15px",marginBottom:"-10%" }}
              >
                Username
         </Typography>

          <TextField
            id="username"
            error={passworderror}
            className={styles.InputField}
            value={username}
            required
            onChange={handleUsernameChange}
            style={{margin:'-20px'}}
            sx={{ 
              "& .MuiOutlinedInput-root": { 
                borderRadius: "12px",backgroundColor:"#ffffffff", color:"black",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e0dedeff",
                  borderWidth: "2px",
                },
              } }}
            label=""
            variant="outlined"
          />

           <Typography
                variant="subtitle1"
                align="left"
                style={{ width:"90%",fontFamily: "Gilroy", color:"#1B1A1B", marginTop:"35px",marginBottom:"-10%" }}
              >
                Password
         </Typography>

          <FormControl
            sx={{ 
              "& .MuiOutlinedInput-root": { 
                borderRadius: "12px",
                backgroundColor:"#FFFFFF",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e0dedeff",
                  borderWidth: "2px",
                }, 
              } }}
            className={styles.InputField}
            variant="outlined"
          >
          
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password} // Controlled input
              onChange={handlepasswordChange}
              error={passworderror}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    style={{color:"#000000ff"}}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label=""
            />
           
          </FormControl>

         {(ErrorMxg &&
         <div
          style={{
            display: "flex",
            width: "85%",
            margin:"auto",
            marginTop: "5%",
            color: "#DC3545",
            justifyContent: "center",
            alignContent:"center",
            border:"solid",
            borderWidth:"0.5px",
            borderRadius:"12px",
            minHeight:"40px",
            padding:"3px",
            backgroundColor:"#FFEFF1"
          }}
        >
           <img src={Warning}
            style={{width:"24px", height:"24px", margin:"auto", marginLeft:"5px"}}
           />
          <Typography
            variant="caption"
            align="left"
            gutterBottom
            sx={{ display: "block", fontSize: "12px", margin:"auto", marginLeft:"5px" }}
          >
            {ErrorMxg}
            
          </Typography>
         </div>)}  
          
        </div>
       
        <div className={styles.LoginButtonContainer}>
          {!keyboardOpen && (
          <Button
            id="loginButton"
            variant="contained"
            sx={{
              backgroundColor: "#5F65FF",
              borderRadius: "12px",
              height: "100%",
              width: "80%",
              marginLeft:"10%",
              //margin:"auto",
              position: "relative",
              "&:hover": {
                backgroundColor: "#5F65FF",
              },
            }}
            onClick={DemoLogin}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className={styles.loader}></div> // Show loader if loading
            ) : (
              "Login"
            )}
          </Button>
          )}
        </div>

         <div>
          {(allowRegister &&
            <Button
              id="loginButton"
              variant="outlined"
              sx={{
                // backgroundColor: "#5F65FF",
                color:"#5F65FF",
                borderColor:"#5F65FF",
                borderRadius: "12px",
                height: "54px",
                width: "80%",
                marginLeft:"10%",
                // marginTop:"5%",
                padding:"10px",
                bottom:"84px",
                //margin:"auto",
                position: "fixed",
                "&:hover": {
                  backgroundColor: "#5F65FF",
                },
              }}
              onClick={register}
            >
              Register
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
