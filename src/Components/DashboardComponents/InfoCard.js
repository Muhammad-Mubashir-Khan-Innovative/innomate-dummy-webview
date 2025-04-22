import * as React from 'react';
import styles from '../../styles.module.css';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

   const InfoCard =({onClick,background, image, heading,text}) => 
   {

    const navigate = useNavigate();

    return(

<Item onClick={onClick}  className={styles.ItemInfoCardDashboard} style={{ backgroundColor: background }}>
<div  className={styles.ItemDivDashboard}>
  <div> 
    <img
    style={{height:'29px',width:'30px'}}
    src={image}
    alt="Styled "
  // Apply CSS class
  /></div>
  <div>
    <h2 style={{color:'#FFFFFF'}} className={styles.Heading}>{heading}</h2>
    <p style={{ fontSize: '12px',color:'#FFFFFF',marginLeft:'10px' }} className={`${styles.text} ${styles.responsivetext}`}>{text}</p>
  </div>
</div>
</Item>
    );
};
export default InfoCard;