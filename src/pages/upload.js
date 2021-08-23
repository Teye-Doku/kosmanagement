import React,{ useState,useRef,useEffect } from 'react';
import {
    useHistory
} from 'react-router-dom';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import useHttp from '../hooks/useHttp';
import  kosimage  from '../images/logo.png';


import './upload.css';


const Upload = () => {
    const uploadRef = useRef();
    const [ name,setName ] = useState("");
    const [ file,setFile ] = useState();
    const [ previewUrl,setPreviewUrl ] = useState("");
    const [ filename,setFilename ] =  useState('');
    const { loading,error,sendRequest } = useHttp();
    const history = useHistory();
   
    const openUpload = () => uploadRef.current.click();
    const handleSubmit = async (e) => {

        e.preventDefault();
        const formdata = new FormData();
        formdata.append('name',name);
        formdata.append('pdfdocument',file);
        

        try {
           const responseData = await  sendRequest(`${process.env.REACT_APP_BACKEND_URL}/products`,
           'POST',
             formdata
           )
           console.log(responseData);
           history.push('/');
        }catch(err){}
    }
    useEffect(()=>{
         if(!file) {
             return;
         }
         const fileReader =  new FileReader();
         fileReader.onload = () => {
             setPreviewUrl(fileReader.result); 
         }
         fileReader.readAsDataURL(file);
    },[file])
    const imagePicker = (e) => {
         let pickedFile;
         if(e.target.files && e.target.files.length === 1) {
             pickedFile = e.target.files[0];
             setFile(pickedFile);
             setFilename(pickedFile.name);
             console.log(pickedFile);
         }else {
              return;
         }
    }
    return(
        <div className="update">
            <img src={kosimage} alt="" className="update__logo"/>
            <div className="update__body">
               <form>
                     <p>click icon to upload</p>
                     <AttachFileIcon onClick={openUpload} />
                     <br />
                     { file && <p style={{color:'blue', textDecoration:'underline',cursor:'pointer'}}>{filename}</p>}
                    <input onChange={imagePicker} type="file" ref={uploadRef} style={{display:'none'}} />
                    <input type="text" placeholder="Enter declaration id" value={name} onChange={(e) => setName(e.target.value)}/>
                    <button onClick={handleSubmit} type="submit">Upload</button>
               </form>
            </div>
            
        </div>
    )
}
export default Upload;



