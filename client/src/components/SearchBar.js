import React from "react";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { getNameVideoGames } from "../actions";
import "./SearchBar.css"
export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

function handleInputChange(e){
e.preventDefault()
setName(e.target.value)
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(getNameVideoGames(name))
}

    return (
        <div className="search">
            <input
            type = "text"
            placeholder = "Buscar..."
            onChange={(e) => handleInputChange(e)}
            />
            <button type= "submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}
