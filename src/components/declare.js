import React,{ useState } from 'react';
import  moment  from 'moment'
import {
  useHistory
} from 'react-router-dom';
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {  IconButton } from '@material-ui/core';
import  useHttp from '../hooks/useHttp';
import './declare.css';

const Declare = props => {
    
    const [ isOptionOpen,setIsOptionOpen ] = useState(false);
    const { sendRequest } = useHttp();
    const openOptions = () => setIsOptionOpen(true);
    const history = useHistory();

    const deleteDeclare = async () => {
        try {
          const deleteddata = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/products/${props.declare._id}`,
             'DELETE'
            );
            props.onDelete(props.declare._id);
        }catch(err){}
        setIsOptionOpen(false);
    }
    const editDeclare = () => {
        setIsOptionOpen(false);
    }

    const viewInBrowser = () => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/${props.declare.pdfdocument}`, {
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
        console.log(props.declare.pdfdocument.split('\\'))
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `${props.declare.pdfdocument.split('\\')[1]}.pdf`,
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
         <div className="declare" >
           <div className="declare__icon">
               <IconButton onClick={viewInBrowser} >
                 <FolderIcon  />
               </IconButton>
           </div>
           <div className="declare__detail" onClick={()=> history.push(`/declare/${props.declare._id}`)}>
             <span className="declare__name">{props.declare.name}</span>
             <span className="declare__date">{moment(props.declare.date).format('MM-DD-YYYY')}</span>
           </div>
           <IconButton onClick={openOptions}><MoreHorizIcon/></IconButton>

            { isOptionOpen && <div className="declare__options">
               <InsertDriveFileIcon onClick={editDeclare} />
               <DeleteIcon onClick={deleteDeclare} />
           </div>}
         </div>
     );
}

export default Declare;