import { useState,useEffect,useCallback,useRef} from 'react';

const useHttp = () => {
  const [ loading,setLoading ] = useState(false);
  const [ error,setError ] = useState(null);

   const activeHttpRequests = useRef([]);
  const sendRequest = useCallback( async(url,method='GET',body=null,headers={})=>{
         setLoading(true);

         const httpAbortCtrl = new AbortController();
         activeHttpRequests.current.push(httpAbortCtrl);
         try {
            const response = await fetch(url,{
              method:method,
              body:body,
              headers:headers,
              signal:httpAbortCtrl.signal
            });
            const responseData = response.json();
             
            activeHttpRequests.current = 
             activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);

            if(!response.ok) {
               throw new Error('oops, something went wrong');
            }
            setLoading(false);
            setError(null);
            return responseData;
         }catch(error) {
           setLoading(false);
           setError(error.message);
         }
  },[])

  useEffect(() => {
    
    return () => {
        activeHttpRequests.current.forEach(reqCtrl => reqCtrl.abort());
      }
  }, [])
 const clearError = () => setError(null);
  return { loading,error,clearError,sendRequest}
}



export default useHttp;