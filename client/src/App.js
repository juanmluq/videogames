import './App.css';
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom" //importo estas 3 switch esta deprecado en la version 6.
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import React from 'react';
import VideoGameCreate from './components/VideogameCreate';
import Detail from "./components/Detail"


function App() {
  return (
    <div className='App'>
    <BrowserRouter>
    <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path= '/home' component={Home}/>
    <Route path= '/videogame' component={VideoGameCreate}/>
    <Route path= '/home/:id' component={Detail}/>
    </Switch>
    </BrowserRouter>
    </div>
   );
}

export default App;
