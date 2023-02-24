//estas primeras 3 lineas las importo habiendo instalado las dependencias correspondientes
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; 
import thunk from "redux-thunk";
import rootReducer from "../reducer";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
