import React,{ useEffect,useState } from 'react'
import {
    useParams
} from 'react-router-dom';

import Header from '../components/header';
import HeaderNav from '../components/headernav';
import Detail from '../components/detail';
import useHttp from '../hooks/useHttp';

import './declaredetail.css';


const Declaredetail = () => {
    const { id } = useParams();
    const { loading,sendRequest } = useHttp();
    const [ declare,setDeclare ] = useState();
    
    useEffect(()=>{
         const fetchDeclare = async () => {
             try {
               const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/products/${id}`);
               setDeclare(responseData.product);
             }catch(err) {}
         }
         fetchDeclare();
    },[])
    return(
        <div>
         <Header />
         <HeaderNav />
        <div className="main">
                <div className="main__view">
                   
                    <div className="mainview__display">
                         { loading && <p>loading..</p> }
                         { !loading && <Detail id={id} declare={declare} />}
                    </div>
                </div>
        </div>
        </div>
    );
}

export default Declaredetail;