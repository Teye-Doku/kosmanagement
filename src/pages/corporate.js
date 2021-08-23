import React,{ useEffect,useState} from 'react'
// import {
//  Link
// } from 'react-router-dom';

import Header from '../components/header';
import HeaderNav from '../components/headernav';
import CorporateDeclare from '../components/corporatedeclare';
import useHttp from '../hooks/useHttp';


import './corporate.css';


const Corporate = () => {
    const { sendRequest } = useHttp();
    const [ declares,setDeclares ] = useState(null);

    useEffect(()=> {
        const fetchData = async () => {
            
             try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/products/`)
                const filteredproducts = responseData.products.filter(pr => pr.invoiceCreated === false);
                setDeclares(filteredproducts);
             }catch(err) {}
        }
        fetchData();
     },[sendRequest])
    return(
        <div>
         <Header />
         <HeaderNav />
        <div className="main">
                <div className="main__view">
                    <div className="mainview__display">
                       {/* <CorporateDeclare />
                       <CorporateDeclare />
                       <CorporateDeclare /> */}
                       {
                           declares?.map( declare=> (<CorporateDeclare declare={declare} key={declare._id}/>))
                       }
                    </div>
                </div>
        </div>
        </div>
    );
}

export default Corporate;