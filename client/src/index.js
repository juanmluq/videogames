//las primeras 5 lineas se crean con el Create React App
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"; //importo el Provider
import { store } from "./store"; //importo el store

ReactDOM.render(
   //envuelvo la app en el Provider sino redux no actúa
   <React.StrictMode>
<Provider store={store}> 
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
