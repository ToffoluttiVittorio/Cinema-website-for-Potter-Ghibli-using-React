import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Pagefilms from './Pagefilm/PageFilms';
import Calendrier from './Page_Calendrier/Calendrier';
import FilmDetails from './Page_FilmDetails/FilmDetails';
import Catest from './Page_Calendrier/Catest';
import PageAuth from "./Auth/PageAuth";
import Home from "./Home/Home"
import CinemaRoom from './Gestion_Place/CinemaRoom';
import Ticket from './userTicket/userTicket'

function App(){
  return (
 
      <div className="App">
          <Routes>
            <Route path="/" element={<PageAuth/>} /> 
            <Route path="/Calendrier" element={<Calendrier/>} />
            <Route path="/Films" element={<Pagefilms/>} />
            <Route path="/Films/:title" element={<FilmDetails/>} />
            <Route path="/Calendrier/Date" element={<Catest/>} />
            <Route path="/Films/Salle" element={<CinemaRoom/>} />
            <Route path="/Home" element={<Home/>} /> 
            <Route path="/Ticket" element={<Ticket/>} />
            <Route/>
          </Routes>
      </div>
   
    );
};

export default App;
