import {useState,useEffect} from "react";
export function useData(path){
    const [data,setData] = useState([]);
   
  useEffect(async()=>{
    const fetchedData = await getData(path);
    setData(fetchedData);
  },[]);

  async function getData(path){
    try{
      const result = await fetch(path);
      const fetchedData = await result.json();
      console.log(fetchedData);
      return fetchedData;
    }catch(e){
      console.log(e.message);
    }
    return null;
  }

  return data;
}