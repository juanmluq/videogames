import React from "react";
import "./landingpage.css"
import son from "./sounds.mp3"
import { useEffect,  } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getLogin } from "../actions";



export default function LandingPage(){

    const dispatch = useDispatch();
    const url = useSelector((state)=> state.url);

    function sonar(){
        var soni = new Audio();
        soni.src = son;
        soni.play()
    }
    

    useEffect (()=> {
        dispatch(getLogin()) //esto es lo mismo que en clases hacer mapdispatchtoprops. Es decir despacho la accion
    },[dispatch]) 


    
    return (
        <div>
        <div className="landing">
            <h1>Bienvenidos a mi pagina</h1>
         <div className="area">
            <h5>Luque Juan Manuel</h5>
            <h6>Desarollador Web </h6>
            <h6>Full Stack 1170259063</h6>
        </div>
        <br/>
                <a  href={url}  onClick={ () => sonar() } className="myBtn">Ingresar</a>
        </div>
        </div>
    )
} 



