import React, { useContext } from "react";
import { Alert, TextField } from "@mui/material";
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
      setusername(credentials.username);
      setpassword(credentials.password);
      setTimeout(() => {
        document.getElementById("loginButton").click();
      }, 1000);
    };

    window.receiveDeviceId = (deviceId) => {
      sessionStorage.setItem("deviceID", deviceId);
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

  const handleLoginSuccess = () => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        username: username,
        password: password,
      })
    );
  };

  const DemoLogin = () => {
    setLoading(true);
    const data = DataFile.DemoLogin
    setLoading(false);
    if (data.username === username && data.password === password ){
      console.log(data.username + " " + data.password)
      setUser(DataFile.DemologinResponse);
      sessionStorage.setItem("IsLoggedIn", "Y");
    }else{
      setpassworderror(true);
    }

  }

  const Login = () => {
    setLoading(true);
    apiRequest("POST", apiURL + "/Authentication/login", {
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

  return (
    <>
      <div className={styles.LoginContainer}>
        <div className={styles.LoginHeaderText}>
          <p>Login</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className={styles.LoginHeading}>
            <p>Login Details</p>
          </div>

          <div className={styles.Logintext}>
            <p>Hey you’re back, fill in your details to get back in</p>
          </div>
        </div>
        <div className={styles.LoginInputFieldArea}>
          <TextField
            id="username"
            error={passworderror}
            className={styles.InputField}
            value={username}
            onChange={handleUsernameChange}
            style={{margin:'-20px'}}
            sx={{ 
              "& .MuiOutlinedInput-root": { 
                borderRadius: "24px",backgroundColor:"#FFFFFF",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF",
                  borderWidth: "2px",
                },
              } }}
            label="Email"
            variant="outlined"
          />

          <FormControl
            sx={{ 
              "& .MuiOutlinedInput-root": { 
                borderRadius: "24px",
                backgroundColor:"#FFFFFF",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF",
                  borderWidth: "2px",
                }, 
              } }}
            className={styles.InputField}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password} // Controlled input
              onChange={handlepasswordChange}
              error={passworderror}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    style={{color:"#4197CB"}}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {passworderror && (
              <FormHelperText
                style={{ color: "#FF0000", fontSize: "13px" }}
                id="component-error-text"
              >
                Wrong Username OR Password
              </FormHelperText>
            )}
          </FormControl>
        </div>
        {/* <div className={styles.ForgotLink}>
          <Link href="#">Forgot Password?</Link>
        </div> */}

        {/* <div style={{ display:'flex',bohellottom:0,flexDirection:'column' , marginLeft:'40%', padding: '1px',width:'fit-content' }}>
          <IconButton onClick={requestFingerprint} sx={{padding:'5px !important',border: '2px solid #4177Cb',borderRadius:'5px',margin:'auto !important' }}  aria-label="fingerprint" color="secondary">
            <Fingerprint sx={{ color: "#4197CB", fontSize: 45,padding:'0px !important' }} />
          </IconButton>
          <p style={{color:"#4197CB",fontSize:'14px',margin:'auto'}}>Fingerprint</p>
        </div> */}
        <div className={styles.LoginButtonContainer}>
          <Button
            id="loginButton"
            variant="contained"
            sx={{
              backgroundColor: "#4197CB",
              borderRadius: "30px",
              height: "100%",
              width: "80%",
              position: "relative",
              "&:hover": {
                backgroundColor: "#4197CB",
              },
            }}
            // special
            onClick={DataFile.Demo ? DemoLogin : Login}
            //onClick={DemoLogin}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className={styles.loader}></div> // Show loader if loading
            ) : (
              "Login"
            )}
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            marginTop: "100px",
            color: "rgb(255, 0, 0)",
            justifyContent: "center",
            alignContent:"centers"
          }}
        >
          <Typography
            variant="caption"
            gutterBottom
            sx={{ display: "block", fontSize: "12px" }}
          >
            {ErrorMxg}
          </Typography>
        </div>
      </div>
    </>
  );
}

export default Login;
