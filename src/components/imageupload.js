import React,{ useRef,useState,useEffect } from 'react';
import './imageupload.css';


const ImageUpload = props => {
    const filepickerRef = useRef();
    const [ file,setFile ] = useState();
    const [ previewUrl,setPreviewUrl ] = useState();

    useEffect(() => {
      if(!file) {
          return;
      };
      const fileReader = new FileReader();
      fileReader.onload = ()=> {
           setPreviewUrl(fileReader.result);
      }
      fileReader.readAsDataURL(file);
    }, [file])
    const pickedHandler = (event) => {
      let pickedFile;
      if(event.target.files && event.target.files.length ===1) {
          pickedFile = event.target.files[0];
          setFile(pickedFile);
      }else {
          return;
      }
      //this forwards the image file to parent component
      props.onForwardImage(pickedFile);
    }
    const pickImageHandler = () => {
       filepickerRef.current.click();
    }
  
   return (
    <div className="form-control">
      <input 
      type="file" 
      ref={filepickerRef}
      accept=".png,.jpg,.jpeg" 
      onChange={pickedHandler}
      style={{display:'none'}}
      />
      <div className={`image-upload ${props.center && 'center'} `}>
           <div className="image-upload__preview">
              { previewUrl &&  <img src={previewUrl} alt="Preview"/>}
              {!previewUrl && <p>please pick image</p>}
           </div>
      </div>
      <button className="pickimage__button" onClick={pickImageHandler}>PICK IMAGE</button>
    </div>
   );
}

export default ImageUpload;