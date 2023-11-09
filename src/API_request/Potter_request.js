import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Potter_request.css"

function formatTitleForURL(title) {
  return title.toLowerCase().replace(/ /g, '_');
}

const date = new Date();
const timestamp = date.getTime();
const millisecparjour = 24 * 60 * 60 * 1000;
let nbrjour = Math.floor(timestamp/millisecparjour);
nbrjour = nbrjour - 19648;
const nbrfilmHarry = 8;
const indHarry = nbrjour % nbrfilmHarry;

function ind(indHarry, index){
  if (index < indHarry){
    indHarry =  nbrfilmHarry - Math.abs(indHarry - index) ;
  }else {
    indHarry = index - indHarry
  }
  return indHarry
};

function affichage_seance(indHarry,index, num){
  const indice = ind(indHarry, index) + num;

  const dateActuelle = new Date();

  // Ajoutez l'indice de jours à la date actuelle
  dateActuelle.setDate(dateActuelle.getDate() + indice);

  // Formatez la date au format "jour mois" (par exemple, "26 novembre")
  const options = { day: 'numeric', month: 'long' };
  const dateFormatee = dateActuelle.toLocaleDateString('fr-FR', options); 
  return dateFormatee
};

function PotterMovies() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Effectuer la requête à l'API
    fetch('https://api.potterdb.com/v1/movies')
      .then(response => response.json())
      .then(data => {
        const trimmedData = data.data.slice(0, data.data.length - 3);
        setData({ data: trimmedData });
      })
      .catch(error => console.error('Erreur lors de la requête :', error));
  }, []);

  return (
    <div className="PotterMovies">
      <h1>Films Harry Potter</h1>
      {data ? (
        <div className="button-container">
        <ul>
          {data.data.map((movie,index) => (
            <li key={movie.id}>
              {/* <p>{index}</p>
              <p>{indHarry}</p> */}
              <h2>{movie.attributes.title}</h2>
              <p>Box Office: {movie.attributes.box_office}</p>
              <p>Budget: {movie.attributes.budget}</p>
              <p>Directeurs: {movie.attributes.directors.join(', ')}</p>
              <p>Résumé: {movie.attributes.summary}</p>
                <img
                src={movie.attributes.poster}
                alt={`Image de ${movie.attributes.title}`}
                style={{ width: '40%', marginBottom: '10px' }} 
                />

              <Link to={`/Films/${formatTitleForURL(movie.attributes.title)}`} 
                state = {[index,`Potter`,ind(indHarry, index)+0]} >
              <button >{affichage_seance(indHarry,index,0)}</button>
              </Link>
              <Link to={`/Films/${formatTitleForURL(movie.attributes.title)}`} 
                state = {[index,`Potter`,ind(indHarry, index)+8]} >
              <button >{affichage_seance(indHarry,index,8)}</button>
              </Link>
              <Link to={`/Films/${formatTitleForURL(movie.attributes.title)}`} 
                state = {[index,`Potter`,ind(indHarry, index)+16]} >
              <button >{affichage_seance(indHarry,index,16)}</button>
              </Link>
              <Link to={`/Films/${formatTitleForURL(movie.attributes.title)}`} 
                state = {[index,`Potter`,ind(indHarry, index)+24]} >
              <button >{affichage_seance(indHarry,index,24)}</button>
              </Link>
              <p>Bande-annonce: {movie.attributes.trailer}</p>
              <p>Wiki: {movie.attributes.wiki}</p>
            </li>
          ))}
        </ul>
        </div>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default PotterMovies;