import axios from "axios";

export function getVideoGames(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/videogames");//aca se hace la conexion con el back


        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: json.data
        })
    }
}

export function getLogin(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/inicio");

        return dispatch({
            type: "GET_LOGIN",
            payload: json.config.url
        })
    }
}

export function filterVideGamesByPlatforms(payload) {
    return {
        type: "FILTER_BY_PLATFORMS",
        payload
    }
}

export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function getNameVideoGames(name){
    return async function(dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/videogames?name=" + name);
            return dispatch({
                type: "GET_NAME_VIDEOGAMES",
                payload: json.data
            })
        }
     catch(error){
        console.log(error)
    }
 }
}

export function getGenres(){
    return async function(dispatch) {
        var info = await axios("http://localhost:3001/genres",{ //el axios por default hace un get. Es decir es lo mismo que hacer axios.get

        });
        return dispatch({type: "GET_GENRES", payload: info.data});
    };
}

export function postVideoGames(payload){
     return async function(dispatch) {
        const response= await axios.post("http://localhost:3001/videogame", payload); //axios.post dispara una ruta de post
        return response
     }
}


export function filterCreated(payload){
    return {
        type: "FILTER_CREATED",
        payload
    }
}

export function getDetail(id){
    return async function(dispatch) {
        try{
            var json = await axios.get("http://localhost:3001/videogames/" + id);
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}
