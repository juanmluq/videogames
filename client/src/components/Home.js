import React from "react";
import "./Home.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideoGames, filterVideGamesByPlatforms, filterCreated, orderByName} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import son from "./sonnav.mp3"
//en lugar de useHsitory con esta version hay que usar useNavigate. y en el lugar donde se ponia history.push() ahora se pone navigate() siendo navigate= useNavigate();
import { useNavigate } from "react-router-dom";

export default function Home(){

    const dispatch = useDispatch();//para usar esa constante e ir despachando esas acciones
    const genres = useSelector((state)=> state.genres);
    const allVideoGames = useSelector((state) => state.videoGames); //esto es lo mismo que en clases hacer mapstatetoprops. Con useSelector digo traeme todo lo que esta en el estado de videogames
    const [order, setOrder] =useState("")
    const [currentPage, setCurrentPage] = useState(1); //me guardo en un estado local una pagina actual. arranca en uno porque siempre empieza en la pagina uno
    const [videoGamesPerPage, setVideoGamesPerPage] = useState(6); //me guardo cuantos videojuegos quiero por pagina
    const indexOfLastVideoGames = currentPage * videoGamesPerPage; //indice del ultimo videogame = pagina actual * cant de videogames por pagina. En el caso inicial es 6
    const indexOfFirstVideoGame = indexOfLastVideoGames - videoGamesPerPage; //indice del primer videogame = indice ultimo - videogames por pargina. El primer caso es 0.
    const currentVideoGames = allVideoGames.slice(indexOfFirstVideoGame, indexOfLastVideoGames);// constante que guarde todos los videogames que voy a tener en cada pagina = allvideogames es el arreglo del estado de videogames. con el slice tomo una porcion del arreglo en este caso el indice del primer y ultimo videogames
    const paginado = (pageNumber) => { //le paso un nro de la pag y le seteo la pagina en ese numero de pagina
        setCurrentPage(pageNumber)
    }

    useEffect (()=> {
        dispatch(getVideoGames()) 
    },[dispatch]) //para que no se genere un loop infinito de llamados pongo el segundo parametro en este caso el arreglo con dispatch. Lo que se incluye adentro del arreglo es de lo que depende el component did mount(use effect)
    
    function handleClick(e) {
        e.preventDefault();//para que no se recargue la pagina
        dispatch(getVideoGames());
    }

    function handleSort (e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))//despacha la accion con el value
        setCurrentPage(1);//setea la pagina en la primera
        setOrder(`Ordenado ${e.target.value}`)//el estado local arranca vacio y con esto lo seteo y lo renderizo de forma ascendente y descendente
    };

function handleFilterPlatforms(e){//si hago click en aventura mando como e.target.value Adventure
    dispatch(filterVideGamesByPlatforms(e.target.value)) //llamo a la action filterVideGamesByGenres con Adventure
}
function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value))
}    

function sonar(e){
    var soni = new Audio();
    soni.src = son;
    soni.play()
}

//con alt + flecha arriba o abajo muevo una linea
    return (
        <div>
            <a href="http://localhost:3001/inicio" type="button" className= "myBtns" >Volver</a>
            <br/><br/>
            <h1>VIDEOGAMES</h1>
            <Link to= "/videogame" className="sacarsub"><p>Crear Personaje</p></Link> 
            {/* esto es para resetear los personajes */}
            <button onClick={e=> {handleClick(e)}}> 
                Volver a cargar todos los personajes
            </button>
            {/* aca hago mis filtros */}
            <div>
             
                <select onChange={e => handleFilterPlatforms(e)}>
                    {/* aca filtro por platforms */}
                    <option value= "All">Plataformas</option>
                    <option value = "PC">PC</option>
                    <option value= "PlayStation 5">PlayStation 5</option>
                    <option value = "PlayStation 4">PlayStation 4</option>
                    <option value = "Xbox One">Xbox One</option>
                    <option value = "Nintendo Switch">Nintendo Switch</option>
                    <option value = "iOS">iOS</option>
                    {/* hay mas platforms. Investigar como iterar todos y agregarlos */}
                    </select>

        <select onChange={e => handleFilterCreated(e)}>
        <option value= "All">Todos</option>
        <option value = "created">Creados</option>
        <option value= "Api">Existentes</option>
        </select>
        <div>
                 {/* el select es para ordenar o filtrar */}
                 <select onChange={e => handleSort(e)}>
                    <option value= "asc">Ascendente</option>
                    <option value = "desc">Descendente</option>
                </select>
            <Paginado //llamo a Paginado con los siguientes 3 parametros
              videoGamesPerPage={videoGamesPerPage}
              allVideoGames= {allVideoGames.length}
              paginado = { paginado } //aca le mando paginado que es donde voy a setear un nro de pagina
              onClick={ (e) => sonar(e) }/>
              <SearchBar />
        </div>
        <div className="cards"> 

            { 
            currentVideoGames && currentVideoGames.map( el => {
            //    sin el return no me renderiza
                //el fragment es como un div nada mas que no te toma ningun espacio en la pantalla -->
                 return ( 
                <fragment onClick={ (e) => sonar(e) }> 
                    <Link className="sacarsub" to= {"/home/" + el.id}>
                                        {/* img es lo que traigo de localhost:3001/videogames y image es lo que yo creo en la db */}
                <div ><Card name={el.name} image={el.Img ? el.Img : el.image} released={el.released} rating={el.rating} key={el.id} />
                </div> 
                </Link>
                </fragment>
            );
        })}
        </div>
            </div>
        </div>
    )
}