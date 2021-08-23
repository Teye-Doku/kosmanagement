import React from 'react'
import {
    Link
} from 'react-router-dom';

import Header from '../components/header';
import HeaderNav from '../components/headernav';
import Profile from '../components/profile';

import './profile.css';


const ProfilePage = () => {

    return(
        <div>
         <Header />
         <HeaderNav />
        <div className="main">
                <div className="sidebar">
                <p>
                    <Link to="/">icums</Link>
                </p>
                <p>
                    <Link to="/corporate">corporate affairs</Link>
                </p>
                <p>
                    <Link to="/accounts">accounts</Link>
                </p>
                </div>
                <div className="main__view">
                   
                    <div className="mainview__display">
                         <Profile />
                     
                    </div>
                </div>
        </div>
        </div>
    );
}

export default ProfilePage;