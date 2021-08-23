import React,{ useState,useContext } from 'react';
import  kosimage  from '../images/logo.png';
import './login.css';
import {
 Link,
 useHistory
}from 'react-router-dom';
import { useForm } from 'react-hook-form';
import  useHttp from '../hooks/useHttp';
import AuthContext from '../context/authcontext';


const Login = () => {
     const auth = useContext(AuthContext);
     const history = useHistory();
     const { register,handleSubmit,errors  } = useForm({
         mode:"onBlur"
     });
     const { loading,error,sendRequest,clearError } = useHttp();
     const onSubmit = async (values) => {
           try{
            
             const responseData = await sendRequest(
                 `${process.env.REACT_APP_BACKEND_URL}/users/login`,
                 'POST',
                 JSON.stringify(values),
                 {
                     'Content-Type':'application/json'
                 }
             );
             auth.login(responseData.userId,responseData.token);
             history.push('/');
             console.log(responseData)
           }catch(err){}
     }
    return(
        <div className="login">
            <img src={kosimage} alt="" className="login__logo"/>
            <div className="login__body">
               <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="email" name="email" ref={register({
                           required:'email is required',
                           pattern:{
                             value:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                             message:'Email is invalid'
                           }
                    })}/>
                    {errors.email && <span style={{color:'red'}}>{errors.email.message}</span>}
                    <input type="password" placeholder="password" name="password" ref={register({
                         required:'Password is required',
                         minLength:{
                           value:6,
                           message:'Password must at least 6 characters'
                         }
                    })}/>
                    {errors.password && <span style={{color:'red'}}>{errors.password.message}</span>}
                    <button onClick={handleSubmit} type="submit">login</button>
                    { loading&& <p>loading</p>}
               </form>
            <p>not having account? <Link to="/signup" className="link">sign up</Link> </p>
             { error &&  (<div onClick={clearError} className="errorbar"> 
                           <div className="errorclose"> x</div>
                           <div className="errormessage"><p> User does not exists</p></div>
                          </div>)}
            </div>
        </div>
    )
}
export default Login;