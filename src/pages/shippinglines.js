import React,{ useEffect,useState } from 'react'
import {
    useParams
} from 'react-router-dom';
import Record from '../components/record';

import Header from '../components/header';
import HeaderNav from '../components/headernav';
import useHttp from '../hooks/useHttp';

import './declaredetail.css';


const ShippingLines = () => {
    const { product } = useParams();
    const { loading,sendRequest } = useHttp();
    const [ shippinglines,setShippinglines ] = useState();
    
    useEffect(()=>{
         const fetchShippinglines = async () => {
             try {
               const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/shippings/myshippinglines/${product}`);
               setShippinglines(responseData.shippinglines);
               console.log(responseData.shippinglines);
             }catch(err) {}
         }
         fetchShippinglines();
    },[])
    const deleteRecord = (id) => {
        setShippinglines(prevsData => prevsData.filter(shippingline => shippingline._id !== id));
    }
    return(
        <div>
         <Header />
         <HeaderNav />
        <div className="main">
                <div className="main__view">
                   
                    <div className="mainview__display">
                         { loading && <p>loading..</p> }
                         { shippinglines && shippinglines.map( record => (
                              <Record key={record._id} onDelete={deleteRecord} url={'/shippings'} record={record} />
                         ))}
                         {shippinglines?.length == 0 && <p>No shippinglines attached</p>}
                    </div>
                </div>
        </div>
        </div>
    );
}

export default ShippingLines;