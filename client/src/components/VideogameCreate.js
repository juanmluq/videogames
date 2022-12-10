import React, { useState, useEffect } from "react";
import{ Link, useHistory } from "react-router-dom";
import { postVideoGames, getGenres } from "../actions/index"
import { useDispatch, useSelector } from "react-redux";
import "./Videogamecreate.css"

function validate(input) {
    let errors ={};
    if(!input.name){ 
        errors.name = "Se requiere un nombre";
    } else if(!input.released){
        errors.released = "Fecha de Lanzamiento debe ser completado";
    }
    return errors;
}

export default function VideoGameCreate(){
    const dispatch = useDispatch()
     const history = useHistory() 
    const genres = useSelector(state => state.genres) //estos son los generos que traigo desde el reducer
    const [errors, setErrors] = useState({});//esto es para el validate

    const [ input, setInput ] = useState({//aca uso el input para guardar los datos que cargo en la pagina
        name: "",
    rating: "",
    released: "",
    platform: [],
    image: "",
    Genr: []
})
function handleChange(e){
    setInput({ //cuando entre a esta funcion: al estado input ademas de lo que tiene agregale el target.value 
        //de lo que este modificando. Es decir si me paro en el input nombre el name es "name" y lo que escriba
        // ahi va a setear el name de mi objeto input con lo que le escriba en el la pagina. Si me paro en el input description va a setear description del objeto.
        ...input,
        [e.target.name] : e.target.value
    })
    setErrors(validate({//setea el estado errors pasandoles la funcion validate con el estado input y el target 
        ...input,
        [e.target.name]: e.target.value
    }));
    console.log(input) //con esto veo en consola que se va cargando en el input
}

function handleCheck(e){
    if(e.target.checked){//si el target esta chequeado hace:
        setInput({
            ...input,
            platform: [...input.platform, e.target.value]
        })}
}

function handleSelect(e){ //cada vez que hago click renderiza cada cosa que voy seleccionando
    setInput({ 
     ...input,
        Genr : [...input.Genr, e.target.value] //cuando mando Genr le digo traeme todo lo que ya tenia y agregale el target.value
    })
}

function handleSubmit(e) {
    e.preventDefault();
    console.log(input)
    dispatch(postVideoGames(input))
    alert("Videogame creado!!")
    setInput({
        name: "",
        rating: "",
        released: "",
        platform: [],
    image: "",
    Genr: []
    })
     history.push("/home") //cuando termine de hacer lo anterior llevame al home. El history.push  redirige
}

function handleDelete(el){//con esta funcion elimino un genre de los que cargue en pantalla
    setInput({
        ...input,
        Genr: input.Genr.filter(gen => gen !== el)//devuelve todo menos el elemento que yo cliquee
    })
}

useEffect(()=> {
    dispatch(getGenres());
    },[dispatch]);

    return (
        <div className="create">
            <Link to="/home"><button className="myBtns">Volver</button></Link>
            <br/><br/>

            <h1>Crea tu Video Game!</h1>
        <form class="row g-4" onSubmit={(e) => handleSubmit(e)}>
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nombre:</label>
                <input class="form-control" id="inputEmail4" placeholder="Nombre Videogame"
                type= "text"
                value = {input.name}
                name = "name"
                onChange={(e) => handleChange(e)} 
               />
               {errors.name && (//si esta mi estado errors.name entonces renderizame un p con el errors.name. Esta es la forma de controlar el formulario 
                <p className="error">{errors.name}</p>//averiguar porque hay una propiedad del input que se llama algo asi como require que te tira un error cuando no escribi ningun texto en el input
               )}
            </div>
            <div class="col-md-6">
            <label for="inputPassword4" class="form-label">Fec Lanzamiento:</label>
                <input class="form-control" id="inputPassword4" placeholder="11-11-1111"
                type= "text"
                value = {input.released}
                name = "released"
                onChange={(e) => handleChange(e)}
                  />
            </div>
            <div class="col-md-12">
            <label for="inputAddress" class="form-label">Rating:</label>
                <input class="form-control" id="inputAddress" placeholder="1.11"
                type= "text"
                value = {input.rating}
                name = "rating"
                onChange={(e) => handleChange(e)}
                  />
            </div>

            <div class="col-md-12">
            <label for="inputAddress2" class="form-label">Imagen:</label>
                <input class="form-control" id="inputAddress2" placeholder="link url"
                type= "text"
                value = {input.image}
                name = "image"
                onChange={(e) => handleChange(e)}
                />
                </div>

            <div>
                {/* esta parte es para poder seleccionar varias plataformas 
                el CHECKBOX es para que aparezcan todos los inputs en pantalla. 
                En cambio el select es para tener una lista desplegable*/}

                <label>Plataformas:</label>
                <br></br>
                <label ><input
                type= "checkbox"
                value = "Xbox One"
                name = "Xbox One"
                onChange={(e) => handleCheck(e)}                
                /> Xbox One ~</label>
                <label><input
                type= "checkbox"
                value = "PC"
                name = "PC"
                onChange={(e) => handleCheck(e)}
                /> PC ~</label>
                <label><input
                type= "checkbox"
                value = "PlayStation 5"
                name = "PlayStation 5"
                onChange={(e) => handleCheck(e)}
                /> PlayStation 5 </label><br></br>
                <label><input
                type= "checkbox"
                value = "PlayStation 4"
                name = "PlayStation 4"
                onChange={(e) => handleCheck(e)}
                /> PlayStation 4 ~</label>
                <label ><input
                type= "checkbox"
                value = "iOS"
                name = "iOS"
                onChange={(e) => handleCheck(e)}
                /> iOS ~</label>
                <label><input
                type= "checkbox"
                value = "Nintendo Switch"
                name = "Nintendo Switch"
                onChange={(e) => handleCheck(e)}
                /> Nintendo Switch </label>
            </div>
            <div class="col-md-4">
    <label for="inputState" class="form-label">Generos: </label>
            {/* El select es para tener una lista desplegable */}
            <select id="inputState" class="form-select" onChange={(e) => handleSelect(e)}>
                {/* con esto recorro los generos que traje de la api y devuelvo una lista desplegable en la pagina con todos los generos */}
                {genres.map((gen) => (
                    <option selected value={gen.name}>{gen.name}</option>
                ))}
            </select>
            </div>
            <div class="col-12">
            <button class="btn btn-primary" type= "submit">Crear Videogame</button>
            </div>
        </form>
        {input.Genr.map(el => //genre es el estado local
            <div class="col-md-4">
                <p>{el} <button class="btn-close-black" aria-label="Close" onClick={()=> handleDelete(el)}>x</button></p>
                
            </div>)}
        </div>
    )

}