import React from 'react';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

import {  IconButton } from '@material-ui/core';
import './profile.css';
const Profile = () => {
    return(
        <div className="profile">
        <div className="profile__icon">
            <IconButton >
              <PersonOutlineOutlinedIcon  />
            </IconButton>
        </div>
        <div className="profile__name">
            <p>Name:</p>
            <p>Icums</p>
        </div>
        <div className="profile__name">
            <p>Username:</p>
            <p>emmateye42</p>
        </div>
      </div>
    );
}
export default Profile;