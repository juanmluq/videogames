import React from "react";
import "./Paginado.css";
import son from "./sonnav.mp3"
export default function Paginado({videoGamesPerPage, allVideoGames, paginado}) {
    
    function sonar(e){
        var soni = new Audio();
        soni.src = son;
        soni.play()
    }

    const pageNumbers = []

    for (let i = 0; i<Math.ceil(allVideoGames/videoGamesPerPage); i++){
        // aca guardo un la cantidad de paginas que va a haber segun cantidad de videogames dividido cant de videogames por pagina
        pageNumbers.push(i + 1)
    }

    return (
         <nav  >
            <ul class="nav justify-content-center" >
                {/* aca recorro la cantidad de paginas y los muestro en pantalla para ingresar a la pagina deseada 
                ejemplo: 1 2 3 4 5  ahi hago click en la 4 y me muestra los 15 personas de esa pagina*/}
                {pageNumbers && 
                pageNumbers.map(number => (
                    <li class="nav-item" className="paginado" key={number} onClick={ (e) => sonar(e) }>
                         {/* en cada numero de pagina le pongo un onclick para cliquear y de esa forma dirigirme al nro de pag.
                         haciendo click se va a el estado paginado que esta en home y le setea el numero donde hicimos click despues
                         vuelve a entrar en esta esta pagina (Paginado) con ese mismo numero que se seteo en el estado paginado */}
                    <a class="nav-link active" aria-current="page" onClick={()=> paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
         </nav>
    )
}