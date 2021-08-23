import React from 'react';
import  moment  from 'moment'
import {
  useHistory
} from 'react-router-dom';
import FolderIcon from '@material-ui/icons/Folder';
// import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DeleteIcon from '@material-ui/icons/Delete';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {  IconButton } from '@material-ui/core';
import  useHttp from '../hooks/useHttp';
import './billladen.css';

const Billladen = props => {
    const { sendRequest } = useHttp();
    
    const history = useHistory();

    const deleteBill = async () => {
        try {
          const deleteddata = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/billladens/${props.bill._id}`,
             'DELETE'  
            );
            props.onDelete(props.bill._id);
        }catch(err){}
        
    }
    const viewInBrowser = () => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/${props.bill.bill}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `${props.bill.bill.split('\\')[1]}.pdf`,
        );
    
        // Append to html link element page
        document.body.appendChild(link);
    
        // Start download
        link.click();
    
        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
    }
   
     return(
         <div className="bill" >
           <div className="bill__icon">
               <IconButton onClick={viewInBrowser}>
                 <FolderIcon  />
               </IconButton>
           </div>
           <div className="bill__detail" >
             <span className="bill__name">{props.bill.name}</span>
             <span className="bill__date">{moment(props.bill.date).format('MM-DD-YYYY')}</span>
           </div>
           <IconButton onClick={deleteBill}><DeleteIcon/></IconButton>

           
         </div>
     );
}

export default Billladen;