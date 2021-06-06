import {useData} from "../hooks/useData";
import {useState,useEffect} from "react";
import Meme from "./Meme";
import "../styles/memes.css";
export default function Memes(){
    const memesData = useData("https://api.imgflip.com/get_memes");
    const memes = memesData?.data?.memes;
    const msg = "Loading...";

    const [memeOnPage,setMemeOnPage] = useState(0);
    const [memesToShow,setMemesToShow] = useState([]);
    const [memesPerPage,setMemesPerPage] = useState(5);
    const [pages,setPages] = useState([]);
    
    
    useEffect(() => {
        memes && setPages(getNumberOfPages());
        setStartMemes();
    }, [memes]);

   

    function showMemes(e){
        setBtnsDefaultColor();
        let memeCount = e.target.value;
        let arr = [];
        let start = decideStart(memeCount);
        const end = decideEnd(memeCount);
        for(let i=start;i<end;i++){
            arr.push(memes[i]);
        }
        setMemesToShow(arr);
        goToTop(e.target);
       
    }

    function setStartMemes(){
        let arr = [];
        let start = 0;
        const end = memesPerPage;
        for(let i=start;i<end;i++){
            if(memes)
            arr.push(memes[i]);
        }
        setMemesToShow(arr);
    }

    function decideEnd(num){
        return num * memesPerPage;
    }

    function decideStart(num){
       if(isNaN(num)) return;
       const formula = (num * memesPerPage) - memesPerPage;
       return formula;
    }

    function getNumberOfPages(){
       let totalPages = Math.ceil(memes?.length/memesPerPage);
       let result = [];
       for(let i=0;i<totalPages;i++){
        result[i] = i;
       }
       
       return result;
    }

    //scroll to top when clicked on page btn

    function goToTop(currentBtn){
        const body = document.querySelector("body");
        const bounds = body.getBoundingClientRect();
        currentBtn.style.backgroundColor = "gainsboro";
        window.scrollTo(0,bounds.top);
    }

    //set color on current clicked btn
    function setBtnsDefaultColor(){
        const btns = document.querySelectorAll("button");
        btns.forEach(element => {
            element.style.backgroundColor = "black";
        });
    }

   

    return(
        <div className="main-memes-container">
            <ul className="container-memes">
               {memesToShow && memesToShow.map((meme,index)=>(
                 <Meme id={meme.id} name={meme.name} url={meme.url} key={index}></Meme>
               ))}
            </ul>

            <ul className="container-buttons">
                {pages && pages.map((m,index)=>(
                     <li key={index}><button onClick={showMemes} value={index+1}>{index+1}</button></li>
                ))}
            </ul>
        </div>
    )
}