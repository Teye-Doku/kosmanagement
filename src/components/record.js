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
import './record.css';

const Record = props => {
    const { sendRequest } = useHttp();
    
    const history = useHistory();

    const deleteRecord = async () => {
        try {
          const deleteddata = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/${props.url}/${props.record._id}`,
             'DELETE'  
            );
            props.onDelete(props.record._id);
        }catch(err){}
        
    }
    const viewInBrowser = () => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/${props.record.imagedoc}`, {
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
          `${props.record.imagedoc.split('\\')[1]}.pdf`,
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
         <div className="record" >
           <div className="record__icon">
               <IconButton onClick={viewInBrowser}>
                 <FolderIcon  />
               </IconButton>
           </div>
           <div className="record__detail" >
             <span className="record__name">{props.record.name}</span>
             <span className="record__date">{moment(props.record.date).format('MM-DD-YYYY')}</span>
           </div>
           <IconButton onClick={deleteRecord}><DeleteIcon/></IconButton>

           
         </div>
     );
}

export default Record;