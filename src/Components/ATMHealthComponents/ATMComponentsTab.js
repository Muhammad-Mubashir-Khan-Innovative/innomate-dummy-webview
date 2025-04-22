import React from 'react';
import { useEffect,useState } from 'react';
import { Grid, Box, Typography, Divider } from '@mui/material';

const ATMComponentsHealthTab = ({Tab}) => {

  const keys = Object.keys(Tab);
  const values = Object.values(Tab);

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

  return (
<Box sx={{ height: dimensions.height * 0.7, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
  <Grid container sx={{ flexGrow: 1 }}>
    {keys.map((key, index) => {
      let displayKey;

  if (key === 'CardReader') {
        displayKey = 'Card Reader';
      }
      else if (key === 'CashDispenser') {
        displayKey = 'Cash Dispenser';
      }
      else if (key === 'Host Communication Error') {
        displayKey = 'Host Communication';
      }
      else if (key === 'JournalPrinter') {
        displayKey = 'Journal Printer';
      }
      else if (key === 'OutofCash') {
        displayKey = 'Out of Cash';
      }
      else if (key === 'RecieptPrinter') {
        displayKey = 'Reciept Printer';
      }
      else if (key === 'LstTnxTime') {
        displayKey = 'Lst Tnx Time';
      }
       else {
        displayKey = key;
      }

      return (
        <Grid
          item
          xs={12}
          container
          key={key}
          sx={{
            flexGrow: 1,
            alignItems: 'center',
            ...(index !== keys.length - 1 && { borderBottom: '1px solid #ccc' }), // Add border only if not last item
          }}
        >
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ textAlign: 'left', paddingLeft: '25%', color: '#838383', fontFamily: 'Gilroy' }}>
              {displayKey}:
            </Typography>
          </Grid>
          <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center',marginLeft:'10px;' }}>
        <Box
          sx={{
            width: 15,
            height: 15,
            borderRadius: '50%',
            backgroundColor:values[index] == 'Operational' ? '#54CA36': '#EC2E22' ,
            marginRight: '5px',
          }}
        />
        <Typography
          variant="body1"
          sx={{ textAlign: 'left',fontWeight:'bold', fontFamily: 'Gilroy', wordWrap: 'break-word' }}
        >
          {values[index]}
        </Typography>
      </Box>
          </Grid>
        </Grid>
      );
    })}
  </Grid>
  <div style={{height:"10vh"}}></div>
</Box>

  );
};

export default ATMComponentsHealthTab;
