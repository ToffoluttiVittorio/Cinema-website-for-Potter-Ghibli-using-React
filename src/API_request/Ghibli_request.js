import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Ghibli_request.css"

function encodeSpacesToURL(string) {
  return encodeURIComponent(string).replace(/%20/g, "_");
}

const date = new Date();
const timestamp = date.getTime();
const millisecparjour = 24 * 60 * 60 * 1000;
let nbrjour = Math.floor(timestamp/millisecparjour);
nbrjour = nbrjour - 19648;
const nbrfilmGhibli = 22;
const indGhibli = nbrjour % nbrfilmGhibli;

function ind(indGhibli, index){
  if (index < indGhibli){
    indGhibli =  nbrfilmGhibli - Math.abs(indGhibli - index) ;
  }else {
    indGhibli = index - indGhibli
  }
  return indGhibli
};

function affichage_seance(indGhibli,index, num){
  const indice = ind(indGhibli, index) + num;
  const dateActuelle = new Date();

  // Ajoutez l'indice de jours à la date actuelle
  dateActuelle.setDate(dateActuelle.getDate() + indice);

  // Formatez la date au format "jour mois" (par exemple, "26 novembre")
  const options = { day: 'numeric', month: 'long' };
  const dateFormatee = dateActuelle.toLocaleDateString('fr-FR', options); 
  return dateFormatee
};

function Ghibli() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Effectuer la requête à l'API
    fetch('https://ghibliapi.vercel.app/films')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Erreur lors de la requête :', error));
  }, []);

  return (
    <div className="Ghibli">
      <h1>Films du Studio Ghibli</h1>
      {data ? (
        <ul>
          {data.map((film,index) => (
            <li key={film.id}>
              <h2>{film.title}</h2>

              <p>Année de sortie: {film.release_date}</p>
              <p>Réalisateur: {film.director}</p>
               <img src={film.image} alt={`Image de ${film.title}`} 
               style={{ width: '37%', borderRadius:'5%', marginBottom: '50px'  }} 
              /> 
              <div className='bouton_link'>
              <Link to={`/Films/${encodeSpacesToURL(film.title)}`}
                state = {[index,"Ghibli",ind(indGhibli, index)+0]} >
              <button >{affichage_seance(indGhibli,index,0)}</button>
              </Link>
              <Link to={`/Films/${encodeSpacesToURL(film.title)}`}
                state = {[index,"Ghibli",ind(indGhibli, index) + 22]} >
              <button >{affichage_seance(indGhibli,index,22)}</button>
              </Link>
              <Link to={`/Films/${encodeSpacesToURL(film.title)}`}
                state = {[index,"Ghibli",ind(indGhibli, index) + 44]} >
              <button >{affichage_seance(indGhibli,index,44)}</button>
              </Link>
              <Link to={`/Films/${encodeSpacesToURL(film.title)}`}
                state = {[index,"Ghibli",ind(indGhibli, index) + 66]} >
              <button >{affichage_seance(indGhibli,index,66)}</button>
              </Link>
              </div>
              <p>Description: {film.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default Ghibli;
