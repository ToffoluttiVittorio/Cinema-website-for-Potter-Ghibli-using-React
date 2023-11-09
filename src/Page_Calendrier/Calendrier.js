import Bandeau from '../Composants_page/Bandeau';
import "../Composants_page/Bandeau.css"
import "../Page_Calendrier/Calendrier.css"
import "../Page_Calendrier/Catest.css"
import Ghibli_one from '../API_request/Ghibli_one';
import Potter_one from '../API_request/Potter_one';
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../Page_FilmDetails/FilmDetails.css"

function Calendrier() {


  const location = useLocation();
  const indGhibli = location.state[0];
  const indHarry = location.state[1];
  const dateonly = location.state[2];



  return (
    <div className="Calendrier">
      <Bandeau />
      <div className='reste'>
      <div className="button-container">

      <Link to="/Calendrier/Date" >
        <button className="cal-button" >
          Calendar
        </button>
      </Link>
      </div>

      <p style={{fontWeight: 'bold', fontSize: '30px'}}>Film à l'affiche :</p>

      <Ghibli_one filmIndex={indGhibli}/>
      <Potter_one index={indHarry}/>
      </div>
      </div>
  );
}

export default Calendrier;
