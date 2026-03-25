import React, { useState, useContext } from 'react';
import { Box, Typography, IconButton, Badge } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded';
import CircleIcon from '@mui/icons-material/Circle';
import { AppContext } from '../context';
import deleteIcon from '../Sources/delete.svg';
import NotificationItem from '../Sources/NotificationItem.png'
import styles from '../styles.module.css'

const NotificationCard = ({id, date, Notification, isRead, firstItem, onDelete }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

    const { state, setUser, setNotifications } = useContext(AppContext);

    const handleDeleteClick = () => {
      //onDelete(id);
      console.log(id);
    };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px',
        maxHeight: '100px',
        borderBottom: '1px solid white',
        borderRadius: "10px",
        boxShadow: "0px 0px 30px 1px #5F65FF15",
        maxWidth: dimensions.width,
        backgroundColor: '#FFFFFF',
        marginBottom: "10px"
      
      }}
    >
      {/* Left Side */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '85%', marginTop: '7px' }}>
        <IconButton sx={{ marginTop: '-15px', marginRight: '10px',marginLeft:'5px', width: '15%' }}>
          <Badge color="default">
            {/* <CircleNotificationsRoundedIcon sx={{ fontSize: '40px', color:"#5F65FF",  }} /> */}
             <img src={NotificationItem} alt="Menu" />
          </Badge>
        </IconButton>
        <Box sx={{ width: '100%', marginBottom: '10px' }}>
          <Typography sx={{ color: '#1B1A1B',fontSize: '14px', fontFamily: 'Gilroy !important', marginBottom: '10px', marginTop: '10px' }} variant="body1">
            {Notification}
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#091C3F', opacity: '45%', marginBottom: '12px' }}>
            {date ? new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }).format(new Date(date))
                    : null}
          </Typography>
        </Box>
      </Box>

      {/* Right Side */}
      {isRead ? 
        <Box sx={{ width: '15%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '3%' }}>
          <img
              src={deleteIcon}
              alt="Description"
              style={{height:'20px'}}
              onClick={handleDeleteClick}
          />
        </Box>
      :       
        <Box sx={{ width: '15%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '3%' }}>
            <CircleIcon sx={{ color: '#EB5757', fontSize: '15px' }} />

        </Box>}
      {/* {!isRead && (
        <Box sx={{ width: '15%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '3%' }}>
          <CircleIcon sx={{ color: '#EB5757', fontSize: '15px' }} />
        </Box>
      )} */}
    </Box>
  );
};

export default NotificationCard;
