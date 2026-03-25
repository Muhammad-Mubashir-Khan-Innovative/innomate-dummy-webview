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
<Box sx={{ height: dimensions.height * 0.7, display: 'flex', flexDirection: 'column',}}>
  <Grid container sx={{ flexGrow: 1, border:"solid",borderColor: "white",borderRadius:"20px",margin:"10px", marginLeft:"10px", backgroundColor:"#FFFFFF", boxShadow: "0px 0px 40px 1px #5F65FF15" }}>
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
            backgroundColor: '#FFFFFF',
            borderRadius:"20px",
            alignItems: 'center',
            ...(index !== keys.length - 1 && { borderBottomLeftRadius:"0px", borderBottomRightRadius:"0px", borderBottom: '1px solid #C7C7C780' }), // Add border only if not last item
          }}
        >
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ textAlign: 'left', paddingLeft: '15%', color: '#1B1A1B', fontFamily: ["Gilroy","sans-serif"],
                    fontWeight:"700",
                    fontSize:"15px",
            }}>
              {displayKey}:
            </Typography>
          </Grid>
          <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center',marginLeft:'15px;' }}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor:values[index] == 'Operational' ? '#17B26A': '#DC3545' ,
            marginRight: '5px',
          }}
        />
        <Typography
          variant="body1"
          sx={{ textAlign: 'left',fontSize:"15px", fontFamily: 'Gilroy', wordWrap: 'break-word', color: values[index] == 'Operational' ? '#17B26A': '#DC3545'}}
        >
          {values[index]}
        </Typography>
      </Box>
          </Grid>
        </Grid>
      );
    })}
  </Grid>
  <div style={{height:"5vh"}}></div>
</Box>

  );
};

export default ATMComponentsHealthTab;
