import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  IconButton,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  bgcolor: "#FDFDFF",
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
  textAlign: "center",
};

const OtpModal = ({ open, onClose, onConfirm, onResend }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [seconds, setSeconds] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!open) return;
    setOtp(["", "", "", ""]);
    setSeconds(60);
    setCanResend(false);
  }, [open]);

  // countdown logic
  useEffect(() => {
    if (seconds > 0 && open) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else if (seconds === 0) {
      setCanResend(true);
    }
  }, [seconds, open]);

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = () => {
    if (canResend) {
      onResend?.();
      setOtp(["", "", "", ""]);
      setSeconds(60);
      setCanResend(false);
    } else {
      onConfirm?.(otp.join(""));
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Typography variant="h6" fontWeight={600} mb={1} style={{color:"#3E3E3E"}}>
          Enter the OTP
        </Typography>
        <Typography variant="body2" mb={2} style={{color:"#5F5F5F"}}>
          Verification code has been sent to your email id.
        </Typography>

        <Stack direction="row" spacing={1.5} justifyContent="center" mb={2} >
          {otp.map((val, i) => (
            <TextField
              key={i}
              id={`otp-${i}`}
              value={val}
              onChange={(e) => handleChange(e.target.value, i)}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: "18px",
                  width: "40px",
                  height:"40px",
                 },
              }}
               sx={{
                  '& .MuiOutlinedInput-root': {
                    border:"solid",
                    borderRadius: '12px',
                    borderColor:"#12110D66",
                    borderWidth:"0.5px"


                  },
                }}
              variant="outlined"
              size="small"
            />
          ))}
        </Stack>

        {!canResend ? (
          <Typography variant="body2" mb={2} style={{color:"#5F5F5F"}}>
            Resend code in <b>00:{seconds < 10 ? `0${seconds}` : seconds}</b>
          </Typography>
        ) : (
          <Typography variant="body2" color="primary" mb={2} style={{color:"#5F5F5F"}}>
            You can now resend the OTP
          </Typography>
        )}

        <Button
         
          variant="contained"
          onClick={handleSubmit}
          sx={{ textTransform: "none", backgroundColor:"#5F65FF",width:"50%",height:"60px",fontSize:"20px", borderRadius:"12px" }}
        >
          {canResend ? "Resend OTP" : "Confirm"}
        </Button>
      </Box>
    </Modal>
  );
};

export default OtpModal;
