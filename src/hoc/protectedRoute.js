import React,{ useState,useContext } from 'react';
import {
    Redirect,
    Route
} from 'react-router-dom';
import AuthContext from '../context/authcontext';


const ProtectedRoute = ({component:Component,...rest}) => {
    const auth = useContext(AuthContext);
    
    
    return <Route 
     {...rest}
     render={
         (props) => {
             if(auth.isLoggedIn) {
                 return <Component {...props} />
             }else {
                 return <Redirect to={{
                     pathname:'/',
                     state:{
                         from:props.location
                     }
                 }}/>
             }
         }
     }
    />
}

export default ProtectedRoute;