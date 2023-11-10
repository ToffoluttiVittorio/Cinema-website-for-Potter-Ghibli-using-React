import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CinemaRoom from "../Gestion_Place/CinemaRoom.js";

/**
 * The function "hoursToMinutes" converts a time string in the format "XhY" to the total number of
 * minutes.
 * @param timeString - The timeString parameter is a string that represents a time in hours and
 * minutes. It should be in the format "XhY", where X is the number of hours and Y is the number of
 * minutes.
 * @returns the total number of minutes converted from the input time string.
 */
function hoursToMinutes(timeString) {
  const timeParts = timeString.split("h");
  let hours = parseInt(timeParts[0]) * 60; 
  let minutes = 0;
  if (timeParts[1]){
    minutes = parseInt(timeParts[1]);
  }else{
    minutes = 0
  }
  const resultat = hours + minutes;
  return resultat;
}

/**
 * The function takes a base hour and a running time as input, extracts the first word from the running
 * time, parses it to an integer, adds it to the base hour, rounds the total to the nearest quarter
 * hour, and returns the result in the format "XhXX".
 * @param base_hour - The base_hour parameter represents the starting hour in the format of "hh:mm"
 * (e.g., "08:30").
 * @param running_time - The `running_time` parameter is a string that represents the duration of time
 * in hours and minutes.
 * @returns a string in the format "XhY" where X represents the number of hours and Y represents the
 * number of minutes.
 */
function extractAndParseFirstWordToInt(base_hour,running_time) {

  const base = hoursToMinutes(base_hour);
  const words = running_time.split(" ");
  const firstWord = words[0];

  let parsedInt = parseInt(firstWord);
  const total =  parsedInt + base;
  const quarters = Math.ceil(total / 15); 
  const roundedMinutes = quarters * 15; 
  const hours = Math.floor(roundedMinutes / 60); 
  const remainingMinutes = roundedMinutes % 60; 
  if (remainingMinutes===0){
    return `${hours}h00`;
  }else{
    return `${hours}h${remainingMinutes}`;
  }
}


/**
 * The function `Ghibli_one` is a React component that fetches data from the Studio Ghibli API and
 * displays information about a specific film, including its title, release date, director, image, and
 * description. It also provides buttons to select different showtimes for the film.
 * @returns a JSX element that displays information about a film from Studio Ghibli. The film's title,
 * release date, director, image, and description are displayed. Additionally, there are buttons that
 * link to a cinema room component with different showtimes for the film.
 */
function Ghibli_one({ filmIndex, indice  }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://ghibliapi.vercel.app/films')
      .then(response => response.json())
      .then(data => setData(data[filmIndex])) 
      .catch(error => console.error('Erreur lors de la requête :', error));
  }, [filmIndex]); 

  return (
    <div className="Ghibli_one">
      <h1>Films du Studio Ghibli</h1>
      {data ? (
        <div>
          <h2>{data.title}</h2>
          <p>Année de sortie: {data.release_date}</p>
          <p>Réalisateur: {data.director}</p>

               <img src={data.image} alt={`Image de ${data.title}`} 
               style={{ width: '37%', borderRadius:'5%' }} 
              /> 
          <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "20px",
              }}
          >
          <Link to="/Films/Salle" element={<CinemaRoom/>}
            state = {["15h",[data.title],indice]} >
            <button style={{ padding: "10px", marginBottom: "10px" }}>15h</button>
          </Link>
          <Link to="/Films/Salle" element={<CinemaRoom/>}
            state = {[extractAndParseFirstWordToInt("15h",data.running_time),[data.title],indice]} >
            <button style={{ padding: "10px", marginBottom: "10px" }}>{extractAndParseFirstWordToInt("15h",data.running_time)}</button>
          </Link>
          <Link to="/Films/Salle" element={<CinemaRoom/>}
            state = {[extractAndParseFirstWordToInt(extractAndParseFirstWordToInt("15h",data.running_time),data.running_time),[data.title],indice]} >
            <button style={{ padding: "10px", marginBottom: "10px" }}>{extractAndParseFirstWordToInt(extractAndParseFirstWordToInt("15h",data.running_time),data.running_time)}</button>
          </Link>
          <Link to="/Films/Salle" element={<CinemaRoom/>}
            state = {[extractAndParseFirstWordToInt(extractAndParseFirstWordToInt(extractAndParseFirstWordToInt("15h",data.running_time),data.running_time),data.running_time),[data.title],indice]} >
            <button style={{ padding: "10px", marginBottom: "10px" }}>{extractAndParseFirstWordToInt(extractAndParseFirstWordToInt(extractAndParseFirstWordToInt("15h",data.running_time),data.running_time),data.running_time)}</button>
          </Link>
          </div>
          <p>Description: {data.description}</p>
        </div>
        
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default Ghibli_one;


