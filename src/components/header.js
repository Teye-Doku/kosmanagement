import React from 'react'
import { useHistory } from 'react-router-dom';
import  kosimage  from '../images/logo.png';

import './header.css';


 const Header = () =>{
     const history = useHistory();

     const switchToAuth = () => history.push('/signup');
    return (
        <header className="header">
            <img src={kosimage} alt=""/>

            <div className="header__nav">
                <span onClick={switchToAuth}>
                      create account
                </span>
            
                    {/* <IconButton>
                    <PersonOutlineOutlinedIcon />
                    </IconButton> */}
                
            </div>
        </header>
    )
}

export default Header;
