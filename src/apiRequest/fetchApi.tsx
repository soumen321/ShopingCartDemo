import axios from 'axios';
import React,{ useEffect,useState} from 'react';

const useFetch = (url:string) =>{

  const [items, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () =>{
    setIsLoading(true);
    try {
        const response = await axios.request({
            method: 'GET',
            url: url,
          })
          setIsLoading(false);
          setData(response.data)
        
    } catch (error) {
        setIsLoading(false);
        console.error(error);
    }

  }


  useEffect(() => {   
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);   
    fetchData();
  };

  return {items, isLoading, error, refetch};
}

export default useFetch;