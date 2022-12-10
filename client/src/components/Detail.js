import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import "./Detail.css"

export default function Detail(props){
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch])

    const miVideoGame = useSelector((state)=> state.detail)
  
    return (
    <div className="detail">
        {
            
            miVideoGame.length>0 ?
            <div>
                <h1>{miVideoGame[0].name}</h1>
                <img src={miVideoGame[0].Img? miVideoGame[0].Img : miVideoGame[0].image } className="imag"/>
                <p></p>
                <h3>Lanzamiento: { miVideoGame[0].released }</h3>
                <h4>Rating: {miVideoGame[0].rating}</h4>
                <h4>Plataformas: {miVideoGame[0].platforms.map(el => ("*" + el + " "))}</h4>
                {/* en el caso que en base de datos yo hubiera creado los genres con el name genre deberia hacer el codigo adentro del corchete asi: 
                {!miVideoGame[0].createdInDb ? miVideoGame[0].genres + " " : miVideoGame[0].genres.map(el => el.name + (" "))} 
                esto es porque en la api viene como genres y en db lo tendria como genre por eso hay que validarlo de esta forma*/}
                <h4>Generos: {!miVideoGame[0].createdInDb ? miVideoGame[0].genres + " " : miVideoGame[0].Genres.map(el => el.name + " ")}</h4>
                    <a href={`https://${miVideoGame[0].website}`} type="button" className= "myBtns" >Jugar</a>
            </div> : <p>Loading...</p>
        }
        <br></br>
        <Link to= "/home" >
            <button type="button" className= "myBtns" >Volver</button>
        </Link>
    </div>
    )
}