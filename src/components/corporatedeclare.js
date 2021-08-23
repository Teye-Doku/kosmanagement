import React, { useContext } from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import moment from 'moment';
import { IconButton } from '@material-ui/core';
import './corporatedeclare.css';
import useHttp from '../hooks/useHttp';
import AuthContext from '../context/authcontext';

const CorporateDeclare = (props) => {
   const { loading,sendRequest } = useHttp();
   const auth = useContext(AuthContext);
   const invoiceGenered =async() => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/products/${props.declare._id}/invoice`,
         'PUT',
         null,
         {
            'Content-Type':'application/json',
            Authorization: 'Bearer ' + auth.token
        }
         );
      }catch(err){}
   }
    return(
        <div className="corporate-declare">
            <div className="corporate-declare__icon">
               <IconButton >
                 <FolderIcon  /> 
               </IconButton>
           </div>
           <div className="corporate-declare__detail">
             <span className="corporate-declare__name">{props.declare?.name}</span>
             <span className="corporate-declare__date">{moment(props.declare?.date).format('MM-DD-YYYY')}</span>
           </div>
           { !loading &&  <button onClick={invoiceGenered} className="corporate-declare__invoiced">{props.declare?.invoiceCreated ? "invoiced" :"invoice"}</button>}
        </div>
    );
};


export default CorporateDeclare;