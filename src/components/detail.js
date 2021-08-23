import React ,{ useState,useEffect } from 'react';
import moment from 'moment';
import {
   useHistory
} from 'react-router-dom';
import FolderIcon from '@material-ui/icons/Folder';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import useHttp from '../hooks/useHttp';

import {  IconButton } from '@material-ui/core';
import './detail.css';


const Detail = (props) => {
  const history = useHistory();
  const { sendRequest,loading } = useHttp();
  const [ file,setFile ] = useState(null);
  const [ title,setTitle ] = useState('');

  const [ previewUrl,setPreviewUrl ] = useState();
  const [ attachBl,setAttachBl ] = useState(false);
  const [ attachInvoice,setAttachInvoice ] = useState(false) 
  const [ attachTaxbill,setAttachTaxbill ] = useState(false) 
  const [ attachMarker,setAttachMaker ] = useState(false);
  const [ attachTerminal,setAttachTerminal ] = useState(false);
  const [ attachDuty,setAttachDuty ] = useState(false);
  const [ attachNumberPlate,setAttachNumberPlate ] = useState(false);
  const [ attachShippingLine,setAttachShippingLine ] = useState(false);

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
      
    }
  const uploadBl= async (e)=> {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append('product',props.id);
      formdata.append('imagedoc',file);
      formdata.append('name',title)
       try {
         const responseData = await sendRequest( `${process.env.REACT_APP_BACKEND_URL}/billladens/`
         ,'POST',
          formdata
         )
         setTitle('');
       }catch(err) {}
  }
  const uploadInvoice= async (e)=> {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append('product',props.id);
      formdata.append('imagedoc',file);
      formdata.append('name',title)
       try {
         const responseData = await sendRequest( `${process.env.REACT_APP_BACKEND_URL}/invoices/`
         ,'POST',
          formdata
         )
         setTitle('');
       }catch(err) {}
  }
  const uploadTaxbill= async (e)=> {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append('product',props.id);
      formdata.append('imagedoc',file);
      formdata.append('name',title)
       try {
         const responseData = await sendRequest( `${process.env.REACT_APP_BACKEND_URL}/taxbills/`
         ,'POST',
          formdata
         )
         setTitle('');
       }catch(err) {}
  }
  const uploadMarker= async (e)=> {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append('product',props.id);
      formdata.append('imagedoc',file);
      formdata.append('name',title)
       try {
         const responseData = await sendRequest( `${process.env.REACT_APP_BACKEND_URL}/markers/`
         ,'POST',
          formdata
         )
         setTitle('');
       }catch(err) {}
  }
  const uploadTerminal= async (e)=> {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('product',props.id);
    formdata.append('imagedoc',file);
    formdata.append('name',title)
     try {
       const responseData = await sendRequest( `${process.env.REACT_APP_BACKEND_URL}/terminals/`
       ,'POST',
        formdata
       )
       setTitle('');
     }catch(err) {}
}
const uploadNumberplate= async (e)=> {
  e.preventDefault();
  const formdata = new FormData();
  formdata.append('product',props.id);
  formdata.append('imagedoc',file);
  formdata.append('name',title)
   try {
     const responseData = await sendRequest( `${process.env.REACT_APP_BACKEND_URL}/numberplates/`
     ,'POST',
      formdata
     )
     setTitle('');
   }catch(err) {}
}
const uploadDuty= async (e)=> {
  e.preventDefault();
  const formdata = new FormData();
  formdata.append('product',props.id);
  formdata.append('imagedoc',file);
  formdata.append('name',title)
   try {
     const responseData = await sendRequest( `${process.env.REACT_APP_BACKEND_URL}/duties/`
     ,'POST',
      formdata
     )
     setTitle('');
   }catch(err) {}
}
const uploadShippingline= async (e)=> {
  e.preventDefault();
  const formdata = new FormData();
  formdata.append('product',props.id);
  formdata.append('imagedoc',file);
  formdata.append('name',title)
   try {
     const responseData = await sendRequest( `${process.env.REACT_APP_BACKEND_URL}/shippings/`
     ,'POST',
      formdata
     )
     setTitle('');
   }catch(err) {}
}
     return(
       <div>
             <div className="detail">
           <div className="detail__icon">
               <IconButton >
                 <FolderIcon  />
               </IconButton>
           </div>
           <div className="detail__detail">
             <span className="detail__name">{props.declare?.name}</span>
             <div>
              <span className="detail__name">created-on:</span><span className="detail__date"> :{moment(props.declare?.date).format('MM-DD-YYYY')}</span>
             </div>
             <div>
              <span className="detail__name">sent-on:</span><span className="detail__date"> :12/05/2021</span>
             </div>
             <div>
              <span className="detail__name">invoice generated-on:</span><span className="detail__date"> :12/05/2021</span>
             </div>
             <div>
              <span className="detail__bl" onClick={()=> history.push(`/declare/bills/${props.id}`)}>bill of laden</span>
             </div>
             <div>
              <span className="detail__bl" onClick={()=> history.push(`/declare/terminals/${props.id}`)}>terminals</span>
             </div>
             <div>
              <span className="detail__bl" onClick={()=> history.push(`/declare/invoices/${props.id}`)}>invoices</span>
             </div>
             <div>
              <span className="detail__bl" onClick={()=> history.push(`/declare/taxbills/${props.id}`)}>taxbills</span>
             </div>
             <div>
              <span className="detail__bl" onClick={()=> history.push(`/declare/markers/${props.id}`)}>markers</span>
             </div>
             <div>
              <span className="detail__bl" onClick={()=> history.push(`/declare/numberplates/${props.id}`)}>numberplates</span>
             </div>
             <div>
              <span className="detail__bl" onClick={()=> history.push(`/declare/duties/${props.id}`)}>duties</span>
             </div>
             <div>
              <span className="detail__bl" onClick={()=> history.push(`/declare/shippings/${props.id}`)}>shippinglines</span>
             </div>
             <div>
             {props.declare?.paid && <span className="detail__paid">Paid</span>}
             </div>
           </div>
               
         </div>
          <div className="attach__container">
            <div className="attach__item" onClick={()=>{
              setAttachTaxbill(false)
              setAttachInvoice(false);
              setAttachBl(!attachBl);
              setAttachMaker(false);
              setAttachShippingLine(false);
              setAttachTerminal(false);
              setAttachDuty(false);
              setAttachNumberPlate(false);
            }}>
              <p>attach bl</p> <CreateIcon />
            </div>
            <div className="attach__item" onClick={()=>{
              setAttachTaxbill(false)
              setAttachInvoice(!attachInvoice);
              setAttachBl(false);
              setAttachMaker(false);
              setAttachShippingLine(false);
              setAttachTerminal(false);
              setAttachDuty(false);
              setAttachNumberPlate(false);
            }}>
              <p>attach invoice</p> <FolderIcon  />
            </div>
            <div className="attach__item" onClick={()=>{
              setAttachTaxbill(!attachTaxbill)
              setAttachInvoice(false);
              setAttachBl(false);
              setAttachMaker(false);
              setAttachShippingLine(false);
              setAttachTerminal(false);
              setAttachDuty(false);
              setAttachNumberPlate(false);
            }}>
              <p>attach  tax bill</p> <AddIcon />
            </div>
            <div className="attach__item" onClick={()=>{
              setAttachTaxbill(false)
              setAttachInvoice(false);
              setAttachBl(false);
              setAttachMaker(!attachMarker);
              setAttachShippingLine(false);
              setAttachTerminal(false);
              setAttachDuty(false);
              setAttachNumberPlate(false);
            }}>
              <p>attach marker</p> <AttachFileIcon />
            </div>
            <div className="attach__item" onClick={()=>{
              setAttachTaxbill(false)
              setAttachInvoice(false);
              setAttachBl(false);
              setAttachMaker(false);
              setAttachShippingLine(false);
              setAttachTerminal(!attachTerminal);
              setAttachDuty(false);
              setAttachNumberPlate(false);
            }}>
              <p>attach terminal</p> <CreateIcon />
            </div>
            <div className="attach__item" onClick={()=>{
              setAttachTaxbill(false)
              setAttachInvoice(false);
              setAttachBl(false);
              setAttachMaker(false);
              setAttachShippingLine(false);
              setAttachTerminal(false);
              setAttachDuty(false);
              setAttachNumberPlate(!attachNumberPlate);
            }}>
              <p>attach number plate</p> <FolderIcon />
            </div>
            <div className="attach__item" onClick={()=>{
              setAttachTaxbill(false)
              setAttachInvoice(false);
              setAttachBl(false);
              setAttachMaker(false);
              setAttachShippingLine(false);
              setAttachTerminal(false);
              setAttachDuty(!attachDuty);
              setAttachNumberPlate(false);
            }}>
              <p>attach duty</p> <AddIcon />
            </div>
            <div className="attach__item" onClick={()=>{
              setAttachTaxbill(false)
              setAttachInvoice(false);
              setAttachBl(false);
              setAttachMaker(false);
              setAttachShippingLine(!attachShippingLine);
              setAttachTerminal(false);
              setAttachDuty(false);
              setAttachNumberPlate(false);
            }}>
              <p>attach shippingLine</p> <AttachFileIcon />
            </div>
           
          </div>
          {
            attachInvoice && (
              <div className="detail__attach" >
              <p>ATTACH Invoice</p>
              <input type="file" onChange={pickedHandler} />
              <div className="detail__name">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="id of invoice" />
              </div>
              <div>
               {!loading && <button type="submit"  onClick={uploadInvoice} className="detail__upload">upload </button>}
               {loading && <p>sending...</p>}
              </div>
           </div>
            )
          }
          {
            attachTaxbill && (
              <div className="detail__attach" >
              <p>ATTACH Tax Bill</p>
              <input type="file" onChange={pickedHandler} />
              <div className="detail__name">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="id of bl" />
              </div>
              <div>
               {!loading && <button type="submit"  onClick={uploadTaxbill} className="detail__upload">upload</button>}
               {loading && <p>sending...</p>}
              </div>
           </div>
            )
          }
          {
            attachBl && (
              <div className="detail__attach" >
              <p>ATTACH BL</p>
              <input type="file" onChange={pickedHandler} />
              <div className="detail__name">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="id of bl" />
              </div>
              <div>
               {!loading && <button type="submit"  onClick={uploadBl} className="detail__upload">upload </button>}
               {loading && <p>sending...</p>}
              </div>
           </div>
            )
          }
          {
            attachMarker && (
              <div className="detail__attach" >
              <p>ATTACH Maker</p>
              <input type="file" onChange={pickedHandler} />
              <div className="detail__name">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="id of bl" />
              </div>
              <div>
               {!loading && <button type="submit"  onClick={uploadMarker} className="detail__upload">upload </button>}
               {loading && <p>sending...</p>}
              </div>
           </div>
            )
          }
          {
            attachNumberPlate && (
              <div className="detail__attach" >
              <p>ATTACH Number Plate</p>
              <input type="file" onChange={pickedHandler} />
              <div className="detail__name">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="id of bl" />
              </div>
              <div>
               {!loading && <button type="submit"  onClick={uploadNumberplate} className="detail__upload">upload </button>}
               {loading && <p>sending...</p>}
              </div>
           </div>
            )
          }
          {
            attachTerminal && (
              <div className="detail__attach" >
              <p>ATTACH Terminal</p>
              <input type="file" onChange={pickedHandler} />
              <div className="detail__name">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="id of bl" />
              </div>
              <div>
               {!loading && <button type="submit"  onClick={uploadTerminal} className="detail__upload">upload </button>}
               {loading && <p>loading...</p>}
              </div>
           </div>
            )
          }
          {
            attachDuty && (
              <div className="detail__attach" >
              <p>ATTACH Duty</p>
              <input type="file" onChange={pickedHandler} />
              <div className="detail__name">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="id of bl" />
              </div>
              <div>
               {!loading && <button type="submit"  onClick={uploadDuty} className="detail__upload">upload </button>}
               {loading && <p>sending...</p>}
              </div>
           </div>
            )
          }
          {
            attachShippingLine && (
              <div className="detail__attach" >
              <p>ATTACH shippingLine</p>
              <input type="file" onChange={pickedHandler} />
              <div className="detail__name">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="id of bl" />
              </div>
              <div>
               {!loading && <button type="submit"  onClick={uploadShippingline} className="detail__upload">upload </button>}
               {loading && <p>loading...</p>}
              </div>
           </div>
            )
          }
       </div>
     );
}

export default Detail;