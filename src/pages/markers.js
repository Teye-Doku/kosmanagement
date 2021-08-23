import React,{ useEffect,useState } from 'react'
import {
    useParams
} from 'react-router-dom';
import Record from '../components/record';

import Header from '../components/header';
import HeaderNav from '../components/headernav';
import useHttp from '../hooks/useHttp';

import './declaredetail.css';


const Markers = () => {
    const { product } = useParams();
    const { loading,sendRequest } = useHttp();
    const [ markers,setMarkers ] = useState();
    
    useEffect(()=>{
         const fetchMarkers = async () => {
             try {
               const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/markers/mymarkers/${product}`);
               setMarkers(responseData.markers);
               console.log(responseData.markers);
             }catch(err) {}
         }
         fetchMarkers();
    },[])
    const deleteRecord = (id) => {
        setMarkers(prevsData => prevsData.filter(markers => markers._id !== id));
    }
    return(
        <div>
         <Header />
         <HeaderNav />
        <div className="main">
                <div className="main__view">
                   
                    <div className="mainview__display">
                         { loading && <p>loading..</p> }
                         { markers && markers.map( record => (
                              <Record key={record._id} onDelete={deleteRecord} url={'/markers'} record={record} />
                         ))}
                         {markers?.length == 0 && <p>No markers attached</p>}
                    </div>
                </div>
        </div>
        </div>
    );
}

export default Markers;