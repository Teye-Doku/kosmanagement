import React,{ useEffect,useState } from 'react'
import {
    useParams
} from 'react-router-dom';
import Record from '../components/record';

import Header from '../components/header';
import HeaderNav from '../components/headernav';
import useHttp from '../hooks/useHttp';

import './declaredetail.css';


const Terminals = () => {
    const { product } = useParams();
    const { loading,sendRequest } = useHttp();
    const [ terminals,setTerminals ] = useState();
    
    useEffect(()=>{
         const fetchTerminals = async () => {
             try {
               const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/terminals/myterminals/${product}`);
               setTerminals(responseData.terminals);
               console.log(responseData.terminals);
             }catch(err) {}
         }
         fetchTerminals();
    },[])
    const deleteRecord = (id) => {
        setTerminals(prevsData => prevsData.filter(terminal => terminal._id !== id));
    }
    return(
        <div>
         <Header />
         <HeaderNav />
        <div className="main">
                <div className="main__view">
                   
                    <div className="mainview__display">
                         { loading && <p>loading..</p> }
                         { terminals && terminals.map( record => (
                              <Record key={record._id} onDelete={deleteRecord} url={'/terminals'} record={record} />
                         ))}
                         {terminals?.length == 0 && <p>No Terminals attached</p>}
                    </div>
                </div>
        </div>
        </div>
    );
}

export default Terminals;