import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CinemaRoom from "../Gestion_Place/CinemaRoom";


function formatTitleForURL(title) {
  return title.toLowerCase().replace(/ /g, "_");
}

function hoursToMinutes(timeString) {
  const timeParts = timeString.split("h"); // Divise la chaîne en heures et minutes
  let hours = parseInt(timeParts[0]) * 60; // Obtient les heures (en tant que nombre)
  let minutes = 0;
  if (timeParts[1]){
    minutes = parseInt(timeParts[1]);
  }else{
    minutes = 0
  }
  const resultat = hours + minutes;
  return resultat;
}

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


function Potter_one({ index, indice }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Effectuer la requête à l'API
    fetch("https://api.potterdb.com/v1/movies")
      .then((response) => response.json())
      .then((data) => setData(data.data[index])) // Utiliser l'index pour sélectionner le film
      .catch((error) => console.error("Erreur lors de la requête :", error));
  }, [index]); // Ajoutez l'index dans la liste des dépendances


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

