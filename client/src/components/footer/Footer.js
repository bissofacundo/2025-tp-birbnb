import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

function Footer() {
  return (
    <Box
        component="footer"
        sx={{
            py: 3,
            px: 2,
            position: 'fixed',
            bottom: '0',
            width: '100%',
            height: '0.5vh',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: "0",
            backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
        }}
        >
        <Typography variant="body1" align="left" paddingLeft="5vw" fontFamily="Inter" marginRight= 'auto'>
            © {new Date().getFullYear()} Birbnb, Inc.
        </Typography>
        <div style={{display:'flex', alignItems: 'center', paddingRight: '5vw', gap: '10px'}}>
        <Select defaultValue="Español (AR)" indicator="" startDecorator={<LanguageIcon/>} variant="standard" disableUnderline="true" sx={{ backgroundColor: "inherit"}} >
            <Option value="Español (AR)" >Español (AR)</Option>
            <Option value="English (US)">English (US)</Option>
            <Option value="Français (FR)">Français (FR)</Option>
            <Option value="Italiano (IT)">Italiano (IT)</Option>
        </Select>        
        <Select defaultValue="$ ARS" indicator="" variant="standard" disableUnderline="true" sx={{ backgroundColor: "inherit"}} >
            <Option value="$ ARS">$ ARS</Option>
            <Option value="$ USD">$ USD</Option>
            <Option value="€ EUR">€ EUR</Option>
        </Select>
        <div style={{display:'flex', alignItems: 'center', gap: '5px', paddingLeft: '0.75rem'}}>
        <FacebookIcon />
        <InstagramIcon />
        <XIcon />
        </div>
        </div>
    </Box>
  );
}

export default Footer;