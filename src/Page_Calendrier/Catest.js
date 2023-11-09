import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { Link } from 'react-router-dom';
import Calendrier from './Calendrier';
import "../Page_FilmDetails/FilmDetails.css"
import Bandeau from "../Composants_page/Bandeau";


const { differenceInDays, parseISO } = require('date-fns');

function calculateDays(date) {
  const dateObject = parseISO(date); // Convertir la date en objet Date
  const dateDeReference = parseISO('2023-11-07'); // Date de référence
  return differenceInDays(dateObject, dateDeReference);
}

function transfo_date(value){
  var dateObject = new Date(value);

  const date = new Date(dateObject);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateOnly = `${year}-${month}-${day}`;

  const timestamp = calculateDays(dateOnly); // Exemple d'utilisation avec une date

  var nbrjour = timestamp + 20;
  const nbrfilmGhibli = 22;
  const nbrfilmHarry = 8;
  const indGhibli = nbrjour % nbrfilmGhibli;
  const indHarry = nbrjour % nbrfilmHarry

  return([indGhibli,indHarry,dateOnly]);
}

function Catest() {
  const [value, onChange] = useState(new Date());
  const dateActuelle = new Date(); 

  return (
    <div className="div">
    <Bandeau/>
      <div className="reste">
            <div className="Calendar">  
        <Calendar onChange={onChange} value={value} minDate={dateActuelle}/>
        <Link to="/Calendrier" element={<Calendrier/>} state = {transfo_date(value)} >
        <button>Valider cette date</button>
      </Link>
      </div>
    </div>
    </div>
  );
}

export default Catest;
