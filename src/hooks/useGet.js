import { useState,useEffect,useCallback} from 'react';
const useGet = () => {
   const [ loading,setLoading ] = useState(false);
   const [ error,setError ] = useState();

   const sendRequest = useCallback( async (url,method='GET',body=null,headers={})=> {
        setLoading(true);
        try {
           const response = await fetch(url,{
               method:method,
               body:body,
               headers:headers
           })
           const responseData = response.json();
           if(!response.ok) {
              throw new Error('could not handle request')
           }
           setLoading(false);
           return responseData;
        }catch(error) {
           setLoading(false);
           setError(error.message);
        }
   },[]);
   const clearError = useCallback(()=>{
       setError(null);
   },[])
   return { loading,error,sendRequest,clearError};
}

export default useGet;