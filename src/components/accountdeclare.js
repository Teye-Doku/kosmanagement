import React, { useContext } from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import { IconButton } from '@material-ui/core';
import moment from 'moment';
import useHttp from '../hooks/useHttp';
import './accountdeclare.css';
import AuthContext from '../context/authcontext';

const AccountDeclare = props => {
  const {loading,sendRequest } = useHttp();
  const auth = useContext(AuthContext);

  const payDeclare = async () => {
      try {
         const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/products/${props.declare._id}/pay`,
         'PUT',
         null,
         {
          'Content-Type':'application/json',
          Authorization: 'Bearer ' + auth.token
      }
         );
         console.log(responseData);
      }catch(err){}
  }
    return(
        <div className="account-declare">
            <div className="account-declare__icon">
               <IconButton >
                 <FolderIcon  />
               </IconButton>
           </div>
           <div className="account-declare__detail">
             <span className="account-declare__name">{props.declare.name}</span>
             <span className="account-declare__date">{moment(props.declare.date).format('MM-DD-YYYY')}</span>
           </div>
            {!loading && <button disable={props.declare?.paid} onClick={payDeclare}  className="account-declare__pay">{props.declare?.paid ? 'paid':'pay'}</button>}
        </div>
    );
};

export default AccountDeclare;