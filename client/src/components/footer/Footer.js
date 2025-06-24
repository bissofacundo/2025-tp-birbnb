import React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import './Footer.css'

function Footer() {
  return (
    <>
    <footer className="footer">
        <div className='copyright'>
            <p>© {new Date().getFullYear()} Birbnb, Inc.</p>
        </div>
        <div className="footer-right">
            <Select defaultValue="Español (AR)" indicator="" startDecorator={<LanguageIcon/>} variant="standard" disableUnderline="true" className='language-select' >
                <Option value="Español (AR)" >Español (AR)</Option>
                <Option value="English (US)">English (US)</Option>
                <Option value="Français (FR)">Français (FR)</Option>
                <Option value="Italiano (IT)">Italiano (IT)</Option>
            </Select>        
            <Select defaultValue="$ ARS" indicator="" variant="standard" disableUnderline="true" className="coin-select" >
                <Option value="$ ARS">$ ARS</Option>
                <Option value="$ USD">$ USD</Option>
                <Option value="€ EUR">€ EUR</Option>
            </Select>
            <div className='social-icons'>
                <FacebookIcon />
                <InstagramIcon />
                <XIcon />
            </div>
        </div>
    </footer>
    </>
  );
}

export default Footer;