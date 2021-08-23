import React,{ useEffect,useState } from 'react'
import {
    useParams
} from 'react-router-dom';
import Record from '../components/record';

import Header from '../components/header';
import HeaderNav from '../components/headernav';
import useHttp from '../hooks/useHttp';

import './declaredetail.css';


const NumberPlates = () => {
    const { product } = useParams();
    const { loading,sendRequest } = useHttp();
    const [ numberplates,setNumberplates ] = useState();
    
    useEffect(()=>{
         const fetchNumberplates = async () => {
             try {
               const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/numberplates/mynumberplates/${product}`);
               setNumberplates(responseData.numberplates);
               console.log(responseData.numberplates);
             }catch(err) {}
         }
         fetchNumberplates();
    },[])
    const deleteRecord = (id) => {
        setNumberplates(prevsData => prevsData.filter(numberplate => numberplate._id !== id));
    }
    return(
        <div>
         <Header />
         <HeaderNav />
        <div className="main">
                <div className="main__view">
                   
                    <div className="mainview__display">
                         { loading && <p>loading..</p> }
                         { numberplates && numberplates.map( record => (
                              <Record key={record._id} onDelete={deleteRecord} url={'/numberplates'} record={record} />
                         ))}
                         {numberplates?.length == 0 && <p>No numberplates attached</p>}
                    </div>
                </div>
        </div>
        </div>
    );
}

export default NumberPlates;