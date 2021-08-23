import React from 'react';
import './signup.css';
import  kosimage  from '../images/logo.png';
import {
 Link
}from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useHttp from '../hooks/useHttp';

const Signup = () => {
    
    const { register,handleSubmit,errors}  = useForm({
      mode:"onBlur"
    });
    const { loading,error,clearError,sendRequest } = useHttp();
    
      const onSubmt = async (values) => {
        
        try {
           const reponseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/register`,
            'POST',
            JSON.stringify(values),
            {
              'Content-Type':'application/json'
            } 
           )
        }catch(err) {}
         console.log(values);
      }

    return(
    
          <div className="signup">
            <img src={kosimage} alt="" className="signup__logo"/>
           
            <div className="signup__body">
               <form onSubmit={handleSubmit(onSubmt)}>
               <input type="text" placeholder="name" name="name" ref={register({
                      required:'name is required'
                    })}/>
                    {errors.name && <span style={{color:'red'}}>{errors.name.message}</span>}
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
                    })} />
                    {errors.password && <span style={{color:'red'}}>{errors.password.message}</span>}
                    <input type="number" placeholder="role" name="role" ref={register} />
                    <button  type="submit">signup</button>
                    { loading && <p>loading</p>}
               </form>
            <p>having account already ? <Link className="link" to="/login">login</Link> </p>
            { error &&  (<div onClick={clearError} className="errorbar"> 
                           <div className="errorclose"> x</div>
                           <div className="errormessage"><p> User already exists</p></div>
                          </div>)}
            </div>
        </div>
        
    )
}
export default Signup;