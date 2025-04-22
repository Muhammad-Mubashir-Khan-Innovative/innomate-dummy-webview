import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const CircularProgressWithRange = ({ value, min, max,size=60,color }) => {
  // Scale the value to a percentage between 0 and 100
  const scaledValue = ((value - min) / (max - min)) * 100;
 
  return (
      <Box
    position="relative"
    display="inline-flex"
    width={size}
    height={size}
  >
    <CircularProgress
      variant="determinate"
      value={scaledValue}
      size={size}
      thickness={4}
      sx={{
        color: {color}, // Custom color code
        '& .MuiCircularProgress-circle': {
          strokeLinecap: 'round',
        },
      }}
    />
    <Box
      position="absolute"
      top="50%"
      left="50%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Typography fontSize={'13px'} variant="caption" component="div" color="text.secondary">
      <Box sx={{alignContent: 'center',justifyContent: 'center', display:'flex'}} component="span">{value}</Box>
      <Box component="span" display="block">ATMS</Box>
      </Typography>
    </Box>
  </Box>
  );
};



export default CircularProgressWithRange;
