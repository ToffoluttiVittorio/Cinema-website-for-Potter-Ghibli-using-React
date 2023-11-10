import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { Link } from 'react-router-dom';
import Calendrier from './Calendrier.js';
import "../Page_FilmDetails/FilmDetails.css"
import Bandeau from "../Composants_page/Bandeau.js";


const { differenceInDays, parseISO } = require('date-fns');

/**
 * The function calculates the number of days between a given date and a reference date.
 * @param date - The `date` parameter is a string representing a date in the format 'YYYY-MM-DD'.
 * @returns The function `calculateDays` returns the difference in days between the input `date` and
 * the reference date '2023-11-07'.
 */
function calculateDays(date) {
  const dateObject = parseISO(date); 
  const dateDeReference = parseISO('2023-11-07'); 
  return differenceInDays(dateObject, dateDeReference);
}

/**
 * The function transfo_date takes a date value as input, transforms it into a specific format,
 * calculates the number of days since a certain date, and returns the indices for two different film
 * series along with the transformed date.
 * @param value - The `value` parameter is a string representing a date in a valid format, such as
 * "2021-01-01".
 * @returns an array containing the following values:
 * 1. `indGhibli`: The index of the Ghibli film based on the number of days passed since the given
 * date.
 * 2. `indHarry`: The index of the Harry film based on the number of days passed since the given date.
 * 3. `dateOnly`: The formatted date in the format "YYYY-MM-DD".
 */
function transfo_date(value){
  var dateObject = new Date(value);

  const date = new Date(dateObject);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateOnly = `${year}-${month}-${day}`;

  const timestamp = calculateDays(dateOnly); 

  var nbrjour = timestamp + 20;
  const nbrfilmGhibli = 22;
  const nbrfilmHarry = 8;
  const indGhibli = nbrjour % nbrfilmGhibli;
  const indHarry = nbrjour % nbrfilmHarry

  return([indGhibli,indHarry,dateOnly]);
}

/**
 * The Catest function is a React component that renders a calendar and a button to validate a selected
 * date.
 * @returns a JSX element. It consists of a div with the class name "div" and two child elements. The
 * first child element is a component called "Bandeau" and the second child element is another div with
 * the class name "reste". Inside the "reste" div, there is another div with the class name "Calendar"
 * which contains a component called "Calendar". There
 */
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
