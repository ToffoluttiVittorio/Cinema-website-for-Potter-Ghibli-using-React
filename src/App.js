import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Pagefilms from './Pagefilm/PageFilms.js';
import Calendrier from './Page_Calendrier/Calendrier.js';
import FilmDetails from './Page_FilmDetails/FilmDetails.js';
import Catest from './Page_Calendrier/Catest.js';
import PageAuth from "./Auth/PageAuth.js";
import Home from "./Home/Home.js"
import CinemaRoom from './Gestion_Place/CinemaRoom.js';
import Ticket from './userTicket/userTicket.js'

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
