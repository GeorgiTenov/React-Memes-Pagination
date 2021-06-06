import './App.css';
import {useRef,useState,useContext,useEffect} from "react";
import {useData} from "./hooks/useData";
import Memes from "./components/Memes";
function App() {


  return (
    <div className="container">
      <Memes></Memes>
  </div>
  );
}


export default App;
