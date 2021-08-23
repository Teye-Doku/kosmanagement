import React,{ useEffect,useState } from 'react'
import {
    useParams
} from 'react-router-dom';
import Record from '../components/record';

import Header from '../components/header';
import HeaderNav from '../components/headernav';
import useHttp from '../hooks/useHttp';

import './declaredetail.css';


const Invoices = () => {
    const { product } = useParams();
    const { loading,sendRequest } = useHttp();
    const [ invoices,setInvoices ] = useState();
    
    useEffect(()=>{
         const fetchInvoices = async () => {
             try {
               const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/invoices/myinvoices/${product}`);
               setInvoices(responseData.invoices);
               console.log(responseData.invoices);
             }catch(err) {}
         }
         fetchInvoices();
    },[])
    const deleteRecord = (id) => {
        setInvoices(prevsData => prevsData.filter(invoice => invoice._id !== id));
    }
    return(
        <div>
         <Header />
         <HeaderNav />
        <div className="main">
                <div className="main__view">
                   
                    <div className="mainview__display">
                         { loading && <p>loading..</p> }
                         { invoices && invoices.map( record => (
                              <Record key={record._id} onDelete={deleteRecord} url={'/invoices'} record={record} />
                         ))}
                         {invoices?.length == 0 && <p>No invoices attached</p>}
                    </div>
                </div>
        </div>
        </div>
    );
}

export default Invoices;