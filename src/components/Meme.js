export default function Meme(meme){
    return(
    <li key={meme.id}>
        <h1>{meme.name}</h1>
        <img src={meme.url}></img>
    </li>
    )
}