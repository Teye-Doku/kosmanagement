import React,{ useEffect,useState } from 'react'
import {
    useParams
} from 'react-router-dom';
import Billladen from '../components/billladen';
import Record from '../components/record';

import Header from '../components/header';
import HeaderNav from '../components/headernav';
import useHttp from '../hooks/useHttp';

import './declaredetail.css';


const BillList = () => {
    const { product } = useParams();
    const { loading,sendRequest } = useHttp();
    const [ bills,setBills ] = useState();
    
    useEffect(()=>{
         const fetchBills = async () => {
             try {
               const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/billladens/mybills/${product}`);
               setBills(responseData.bills);
               console.log(responseData.bills);
             }catch(err) {}
         }
         fetchBills();
    },[])
    const deleteRecord = (id) => {
        setBills(prevsData => prevsData.filter(bill => bill._id !== id));
    }
    return(
        <div>
         <Header />
         <HeaderNav />
        <div className="main">
                <div className="main__view">
                   
                    <div className="mainview__display">
                         { loading && <p>loading..</p> }
                         { bills && bills.map( record => (
                              <Record key={record._id} onDelete={deleteRecord} url={'/billadens'} record={record} />
                         ))}
                         {bills?.length == 0 && <p>No Bills attached</p>}
                    </div>
                </div>
        </div>
        </div>
    );
}

export default BillList;