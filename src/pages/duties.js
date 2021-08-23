import React,{ useEffect,useState } from 'react'
import {
    useParams
} from 'react-router-dom';
import Record from '../components/record';

import Header from '../components/header';
import HeaderNav from '../components/headernav';
import useHttp from '../hooks/useHttp';

import './declaredetail.css';


const Duties = () => {
    const { product } = useParams();
    const { loading,sendRequest } = useHttp();
    const [ duties,setDuties ] = useState();
    
    useEffect(()=>{
         const fetchDuties = async () => {
             try {
               const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/duties/myduties/${product}`);
               setDuties(responseData.duties);
               console.log(responseData.duties);
             }catch(err) {}
         }
         fetchDuties();
    },[])
    const deleteRecord = (id) => {
        setDuties(prevsData => prevsData.filter(duty => duty._id !== id));
    }
    return(
        <div>
         <Header />
         <HeaderNav />
        <div className="main">
                <div className="main__view">
                   
                    <div className="mainview__display">
                         { loading && <p>loading..</p> }
                         { duties && duties.map( record => (
                              <Record key={record._id} onDelete={deleteRecord} url={'/duties'} record={record} />
                         ))}
                         {duties?.length == 0 && <p>No duties attached</p>}
                    </div>
                </div>
        </div>
        </div>
    );
}

export default Duties;