import React from 'react';
import './headernav.css';
import {
 Link
} from 'react-router-dom'

const HeaderNav = () => {
     return(
         <div className="headernav">
               <span> <Link to="/">Icums</Link></span>
               <span> <Link to="/corporate">Corporate Affairs</Link> </span>
               <span> <Link to="/accounts">Accounts</Link></span>
         </div>
     )
}

export default HeaderNav;