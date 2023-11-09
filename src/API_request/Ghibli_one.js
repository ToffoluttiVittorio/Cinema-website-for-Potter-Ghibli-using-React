import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CinemaRoom from "../Gestion_Place/CinemaRoom";

function encodeSpacesToURL(string) {
  return encodeURIComponent(string).replace(/%20/g, "_");
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


function Ghibli_one({ filmIndex, indice  }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Effectuer la requête à l'API
    fetch('https://ghibliapi.vercel.app/films')
      .then(response => response.json())
      .then(data => setData(data[filmIndex])) // Utiliser filmIndex pour sélectionner le film
      .catch(error => console.error('Erreur lors de la requête :', error));
  }, [filmIndex]); // Ajoutez filmIndex dans la liste des dépendances

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


