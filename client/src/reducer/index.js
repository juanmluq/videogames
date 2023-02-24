
const initialState = {
    videoGames : [], //este lo uso de variable auxiliar para poder renderizar segun lo que necesite
    detail: [],
    allVideoGames: [], //a este estado lo tengo de soporte para que traiga todos los videogames
    genres: [],
    url: ""
}

function rootReducer (state= initialState, action){
    switch(action.type){
        case 'GET_VIDEOGAMES': 
            return{
                ...state,
                videoGames: action.payload,
                allVideoGames: action.payload
            }
            case 'GET_LOGIN': // con esta accion me traigo todos los videogames al arreglo videoGames y al allVideoGames
            return{
                url: action.payload
            }
            case "GET_NAME_VIDEOGAMES" :
                return {
                    ...state,
                    videoGames: action.payload
                }
            
            case "GET_GENRES" :
                return{
                    ...state,
                    genres: action.payload
                }
            
            case "FILTER_BY_PLATFORMS" :
            const allVideoGameses = state.allVideoGames 
            const platformsFilterd = action.payload === "All" ? allVideoGameses : allVideoGameses.filter(el => el.platforms[0] === action.payload)
            //aca digo que si payload=all es todo devolveme todo en la constante sino filtralo y devolveme los videogames por platforms = payload
            return {
                ...state,
                videoGames: platformsFilterd
            }

            case "POST_VIDEOGAMES" :
                return {
                    ...state,
                    
                }
            case "FILTER_CREATED" :
                //aca digo que si elijo la opcion created traigo lo que esta en DB sino traigo lo que no esta en DB
                const allVideoGames = state.allVideoGames
                const createdFilter = action.payload === "created" ?  state.allVideoGames.filter(el => el.createdInDb) : allVideoGames.filter(el => !el.createdInDb)
                return {
                    ...state,
                    videoGames: action.payload === "All" ? state.allVideoGames : createdFilter
                }

            case "ORDER_BY_NAME" :
                    let sortedArr = action.payload === "asc" ?
                    state.videoGames.sort(function (a,b) { //el sort compara 2 valores y va poniendo a la derecha o a la izq segun su valor
                        if(a.name > b.name){
                            return 1;
                        }
                        if(b.name > a.name){
                            return -1;
                        }
                        return 0;
                    }) : state.videoGames.sort(function (a, b) {
                        if(a.name > b.name) {
                            return -1;
                        }
                        if(b.name > a.name ){
                            return 1;
                        }
                        return 0;
                    })
                    return {
                        ...state,
                        videoGames: sortedArr
                    }
                    case "GET_DETAIL" :
                        return {
                            ...state,
                            detail: action.payload
                        }

                default:
                return state;
    }

}

export default rootReducer;
