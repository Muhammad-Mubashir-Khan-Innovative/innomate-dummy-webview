import React, { useState } from 'react';
import { Box, Typography, IconButton, Badge } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CircleIcon from '@mui/icons-material/Circle';

const NotificationCard = ({ date, Notification, isRead, firstItem }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px',
        maxHeight: '100px',
        borderBottom: '1px solid #E0E0E0',
        maxWidth: dimensions.width,
        backgroundColor: '#FFFFFF',
      
      }}
    >
      {/* Left Side */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '85%', marginTop: '7px' }}>
        <IconButton sx={{ marginTop: '-15px', marginRight: '10px',marginLeft:'5px', width: '15%' }}>
          <Badge color="default">
            <NotificationsNoneOutlinedIcon sx={{ fontSize: '25px' }} />
          </Badge>
        </IconButton>
        <Box sx={{ width: '100%', marginBottom: '10px' }}>
          <Typography sx={{ fontSize: '16px', fontFamily: 'Gilroy !important', marginBottom: '10px', marginTop: '10px' }} variant="body1">
            {Notification}
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#091C3F', opacity: '45%', marginBottom: '15px' }}>
            {date}
          </Typography>
        </Box>
      </Box>

      {/* Right Side */}
      {!isRead && (
        <Box sx={{ width: '15%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '3%' }}>
          <CircleIcon sx={{ color: '#EB5757', fontSize: '15px' }} />
        </Box>
      )}
    </Box>
  );
};

export default NotificationCard;
