import React, { useEffect,useState } from 'react'
import {
    Link,
    useHistory
} from 'react-router-dom';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { IconButton } from '@material-ui/core';
import Header from '../components/header';
import HeaderNav from '../components/headernav';
import Declare from '../components/declare';
import useHttp from '../hooks/useHttp';


import './home.css';


const Home = () => {
    const [ declares,setDeclares ] = useState(null);
    const history = useHistory();
    const { loading,error,sendRequest } = useHttp();

    const onOpenUpload = () => history.push('/upload')
    
    useEffect(()=> {
       const fetchData = async () => {
        
            try {
               const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/products/`)
               setDeclares(responseData.products);
               console.log(responseData);
            }catch(err) {}
       }
       fetchData();
    },[sendRequest])
    
    const deteleDeclare = (id) => {
        setDeclares(prevsData => prevsData.filter(declare => declare._id !== id));
    }

    return(
        <div>
         <Header />
         <HeaderNav />
        <div className="main">
                {/* <div className="sidebar">
                <p>
                    <Link to="/">icums</Link>
                </p>
                <p>  
                    <Link to="/corporate">corporate affairs</Link>
                </p>
                <p>
                    <Link to="/accounts">accounts</Link>
                </p>
                </div> */}
                <div className="main__view">
                    <div className="upload__section">
                       <IconButton onClick={onOpenUpload}>
                          
                           <AttachFileIcon  /> upload declaration
                       </IconButton>
                    </div>
                    <div className="mainview__display">
                         {loading && <p>Loading...</p>}
                         {
                             declares?.map( declare => (<Declare 
                                                        key={declare._id} 
                                                        onDelete={deteleDeclare}
                                                        declare={declare}/>
                                                       ))
                         }
                     
                    </div>
                </div>
        </div>
        </div>
    );
}

export default Home;