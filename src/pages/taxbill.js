import React,{ useEffect,useState } from 'react'
import {
    useParams
} from 'react-router-dom';
import Record from '../components/record';

import Header from '../components/header';
import HeaderNav from '../components/headernav';
import useHttp from '../hooks/useHttp';

import './declaredetail.css';


const Taxbills = () => {
    const { product } = useParams();
    const { loading,sendRequest } = useHttp();
    const [ taxbills,setTaxbills ] = useState();
    
    useEffect(()=>{
         const fetchTaxbills = async () => {
             try {
               const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/taxbills/mytaxbills/${product}`);
               setTaxbills(responseData.taxbills);
               console.log(responseData.taxbills);
             }catch(err) {}
         }
         fetchTaxbills();
    },[])
    const deleteRecord = (id) => {
        setTaxbills(prevsData => prevsData.filter(taxbill => taxbill._id !== id));
    }
    return(
        <div>
         <Header />
         <HeaderNav />
        <div className="main">
                <div className="main__view">
                   
                    <div className="mainview__display">
                         { loading && <p>loading..</p> }
                         { taxbills && taxbills.map( record => (
                              <Record key={record._id} onDelete={deleteRecord} url={'/taxbills'} record={record} />
                         ))}
                         {taxbills?.length == 0 && <p>No taxbills attached</p>}
                    </div>
                </div>
        </div>
        </div>
    );
}

export default Taxbills;