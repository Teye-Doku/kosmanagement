import React,{ useEffect,useState} from 'react'
// import {
//   Link
// } from 'react-router-dom'
import Header from '../components/header';
import HeaderNav from '../components/headernav';
import AccountDeclare from '../components/accountdeclare';
import useHttp from '../hooks/useHttp';

import './accounts.css';


const Accounts = () => {
    const [ declares,setDeclares ] = useState(null);
    const { sendRequest } = useHttp();
    
    useEffect(()=> {
        const fetchData = async () => {
             try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/products/`)
                const filteredproducts = responseData.products.filter(pr => pr.paid === false);
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
                     {/* <AccountDeclare />
                    <AccountDeclare />
                    <AccountDeclare /> */}

                    {
                           declares?.map( declare=> (<AccountDeclare declare={declare} key={declare._id}/>))
                       }
                     </div>
                </div>
        </div>
        </div>
    );
}

export default Accounts;