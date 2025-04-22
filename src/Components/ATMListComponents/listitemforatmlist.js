import * as React from 'react';
import { useState } from 'react';
import styles from '../../styles.module.css'
import atmicon from '../../Sources/atmicon.png'
import locationicon from '../../Sources/locationicon.png'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import CommandMenu from '../ActionCenterComponents/CommandMenu';
import icon from '../../Sources/location.svg'



const ATMListitem = ({ deviceid, location, ShowDetailsButton, ShowCommandsButton, selectionMode, isOutOfService, messageText }) => {

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


  return (
    <>
      <div style={{width:selectionMode ? '80%' : '92%'}} className={styles.atmlistitemmaindiv} >
        <div style={{ display: 'flex', flexDirection: 'column', width:selectionMode ? '80%' : '70%' }}>

          <div style={{ display: 'flex', flexDirection: 'row', height: '40px' }}>
            <img
              src={atmicon}
              alt="Description"
              className={styles.atmlisticon}

            />
            <h4 className={styles.atmlistheading} >Device ID : {deviceid}</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <img
              src={icon}
              alt="Description"
              className={styles.atmlisticon}
              style={{ marginTop: '0px' }}
            />
            <h4 className={styles.atmlistheading} style={{ marginTop: '4px', overflow: 'hidden' }}>Location: {location}</h4>
          </div>
        </div>
      
        <div style={{ width: '30%',marginTop:ShowCommandsButton? '15px' : '0px'}}>
        {ShowDetailsButton && (
          <Button
              //disabled={!isOutOfService}
              className={styles.responsivetext}
              onClick={handleViewDetailsClick}
              variant="contained"
              sx={{
                float: 'right',
                backgroundColor:"#4197CB",
                textTransform: 'none !important',
                fontSize: '12px',
                fontFamily: 'Gilroy',
                minWidth:'100px',
                marginTop:'15px', //isOutOfService ? '5px' : '15px', // Adjust margin based on isOutOfService
              color: 'white',//messageText ? 'black !important' : 'white', // Change text color to black when disabled
                opacity: isOutOfService ? 1 : 1, // Prevent opacity change on disabled state
              }}
            >
              {isOutOfService ? messageText : 'View Details'} {/* Show only the first 15 characters of messageText */}
          </Button>
        )}

{ShowCommandsButton && !selectionMode && (
  <CommandMenu deviceid={deviceid}/>
)}


{/* {ShowCommandsButton && (
  <>
    <div style={{ float: 'right', textTransform: 'none !important', fontSize: '12px', fontFamily: 'Gilroy', marginTop: '10px' }}>
      <Backdrop open={open} onClick={handleClose} sx={{ zIndex: 1 }} />
      <FormControl
        variant="outlined"
        size="small"
        sx={{
          minWidth: 105,
          borderColor: '#FFFFFF', // Border color for FormControl
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#4197CB', // Border color for the input field
            },
            '&:hover fieldset': {
              borderColor: '#4197CB', // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#4197CB', // Border color when focused
            },
          },
        }}
      >
       {!value && ( <InputLabel
          sx={{
            fontSize: '12px',
            color: '#FFFFFF', // Ensure label text is white
            transition: 'color 0.3s ease',
            '&.Mui-focused': {
              color: '#FFFFFF', // Keep label color white when focused
            },
            '&.MuiInputLabel-shrink': {
              color: '#FFFFFF', // Keep label color white when it shrinks
            },
          }}
          id="dropdown-label"
          shrink={open} // Keep label full text or shrink based on open state
        > 
          View Cmd's
        </InputLabel>
       )}
        <Select labelId="dropdown-label" id="small-dropdown" value="{value}" onChange={handleChange} onOpen={handleOpen} onClose={handleClose} label="View Cmd's"
          MenuProps={{
            PaperProps: {
              sx: {
                width: '100vw',
                color: '#535353', // Text color of dropdown options
                backgroundColor: '#FFFFFF', // Background color of dropdown options
              },
            }, sx: { zIndex: 2 },
          }}
          sx={{
            height: 30,
            backgroundColor: '#4197CB',
            borderRadius:'8px', // Background color of the Select component
            color: '#FFFFFF', // Text color inside Select component
            '& .MuiSelect-select': {
              display: 'flex',
              color: '#FFFFFF',
              fontSize: '14px',
              alignItems: 'center',
              padding: '6px 14px',
            },
            '& .MuiSelect-icon': {
              marginLeft: '8px',
              color: '#FFFFFF', // Color of the dropdown icon
            },
          }}
          InputLabelProps={{
            shrink: open, // Shrink label only when dropdown is open
          }}
        >
          <MenuItem sx={{  fontSize: '14px' }} value={1}>
          <p>Execute Job</p>
          <Button sx={{backgroundColor:'#4197CB',float:'right',marginLeft:'55%'}} variant="contained" size="small">
          Run
        </Button>
          </MenuItem>
          <MenuItem sx={{  fontSize: '14px' }} value={2}>Reboot Device</MenuItem>
        </Select>
      </FormControl>
    </div>
  </>
)} */}

          </div>

      </div>
    </>
  );
};
export default ATMListitem;
