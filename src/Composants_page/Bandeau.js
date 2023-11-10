import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logos.png"
import PageFilms from '../Pagefilm/PageFilms.js';
import "./Bandeau.css"

const date = new Date();
const timestamp = date.getTime();
const millisecparjour = 24 * 60 * 60 * 1000;
let nbrjour = Math.floor(timestamp/millisecparjour);
nbrjour = nbrjour - 19648;
const nbrfilmGhibli = 22;
const nbrfilmHarry = 8;
const indGhibli = nbrjour % nbrfilmGhibli;
const indHarry = nbrjour % nbrfilmHarry;

const dateOnly = date.toISOString().split('T')[0];


/**
 * The Bandeau function returns a div element containing a logo, buttons for Films, Calendrier, and
 * Tickets, and links to different pages.
 * @returns a JSX element.
 */
function Bandeau() {
  return (
    <div className="bandeau">
      <Link to="/Home">
        <img src={logo} alt="Logo" style={{ height: '60px', margin : '15px'}} />
      </Link>
      <Link to="/Films" element={<PageFilms />}>
        <button >Films</button>
      </Link>
      <Link to="/Calendrier"state={[indGhibli, indHarry, dateOnly]}>
        <button >Calendrier</button>
      </Link>
      <Link to="/Ticket">
        <button style={{margin : '15px'}}>Tickets</button>
      </Link>
    </div>
  );
}


export default Bandeau;

