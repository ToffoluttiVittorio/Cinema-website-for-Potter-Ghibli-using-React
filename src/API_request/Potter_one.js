import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CinemaRoom from "../Gestion_Place/CinemaRoom.js";


/**
 * The function "hoursToMinutes" takes a time string in the format "XhY" and converts it to minutes.
 * @param timeString - A string representing a time in the format "XhY", where X is the number of hours
 * and Y is the number of minutes.
 * @returns the total number of minutes represented by the input time string.
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
 * The Potter_one function fetches data from an API and displays information about a Harry Potter
 * movie, including its title, box office, budget, directors, summary, poster, running time, trailer,
 * and wiki link.
 * @returns The function `Potter_one` returns JSX elements that display information about a Harry
 * Potter movie. If the `data` state is not null, it renders the movie title, box office, budget,
 * directors, summary, poster image, and buttons for different showtimes. If the `data` state is null,
 * it displays a "Chargement en cours..." message.
 */
function Potter_one({ index, indice }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.potterdb.com/v1/movies")
      .then((response) => response.json())
      .then((data) => setData(data.data[index])) 
      .catch((error) => console.error("Erreur lors de la requête :", error));
  }, [index]);


    return (
      <div className="Potter_one">
        <h1>Films Harry Potter</h1>
        {data ? (
          <ul>
            <li key={data.id}>

              <h2>{data.attributes.title}</h2>
              <p>Box Office: {data.attributes.box_office}</p>
              <p>Budget: {data.attributes.budget}</p>
              <p>Directeurs: {data.attributes.directors.join(", ")}</p>
              <p>Résumé: {data.attributes.summary}</p>
                <img
                  src={data.attributes.poster}
                  alt={`Image de ${data.attributes.title}`}
                  style={{ width: "40%" }}
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
                state = {["15h",[data.attributes.title],indice]} >
                <button style={{ padding: "10px", marginBottom: "10px" }}>15h</button>
              </Link>
              <Link to="/Films/Salle" element={<CinemaRoom/>}
                state = {[extractAndParseFirstWordToInt("15h",data.attributes.running_time),[data.attributes.title],indice]} >
                <button style={{ padding: "10px", marginBottom: "10px" }}>{extractAndParseFirstWordToInt("15h",data.attributes.running_time)}</button>
              </Link>
              <Link to="/Films/Salle" element={<CinemaRoom/>}
                state = {[extractAndParseFirstWordToInt(extractAndParseFirstWordToInt("15h",data.attributes.running_time),data.attributes.running_time),[data.attributes.title],indice]} >
                <button style={{ padding: "10px", marginBottom: "10px" }}>{extractAndParseFirstWordToInt(extractAndParseFirstWordToInt("15h",data.attributes.running_time),data.attributes.running_time)}</button>
              </Link>
              <Link to="/Films/Salle" element={<CinemaRoom/>}
                state = {[extractAndParseFirstWordToInt(extractAndParseFirstWordToInt(extractAndParseFirstWordToInt("15h",data.attributes.running_time),data.attributes.running_time),data.attributes.running_time),[data.attributes.title],indice]} >
                <button style={{ padding: "10px", marginBottom: "10px" }}>{extractAndParseFirstWordToInt(extractAndParseFirstWordToInt(extractAndParseFirstWordToInt("15h",data.attributes.running_time),data.attributes.running_time),data.attributes.running_time)}</button>
              </Link>
            </div>
            <p>{data.attributes.running_time}</p>
            <p>Bande-annonce: {data.attributes.trailer}</p>
            <p>Wiki: {data.attributes.wiki}</p>
          </li>
        </ul>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default Potter_one;

