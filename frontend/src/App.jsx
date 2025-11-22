import React,{useState,useEffect} from 'react'
import Home from './Home'
import axios from 'axios'
import AddUrl from './AddUrl';
const App = () => {


  const [urls, setUrls] = useState([]);
  const [reload,setReload] = useState(false)

  const url = " http://localhost:2000"


  useEffect(() => {
   const fetchData = async () =>{
    const api = await axios.get(`${url}/api/links`,{
      headers:{"Content-Type":"application/json,"},
    });
    console.log(api.data.url);
    setUrls(api.data.url)
   };
   fetchData()
  }, [reload])
  
  return (
    <>
    <AddUrl urls={urls} reload={reload} setReload={setReload}/>
    <Home urls={urls} url={url} reload={reload} setReload={setReload}/>
    </>
  )
}

export default App