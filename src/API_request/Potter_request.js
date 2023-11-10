import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

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

/**
 * The function "ind" calculates the new index value based on the current index and the difference
 * between the current index and a given value.
 * @param indHarry - The parameter "indHarry" represents the current index of the Harry Potter film.
 * @param index - The index parameter represents the current index position.
 * @returns the updated value of the variable "indHarry".
 */
function ind(indHarry, index){
  if (index < indHarry){
    indHarry =  nbrfilmHarry - Math.abs(indHarry - index) ;
  }else {
    indHarry = index - indHarry
  }
  return indHarry
};

/**
 * The function affichage_seance calculates and returns the formatted date for a given index and number
 * of days.
 * @param indHarry - The parameter "indHarry" is not defined in the code snippet provided. Please
 * provide the definition of "indHarry" so that I can assist you further.
 * @param index - The index parameter is used to specify the starting index of the session.
 * @param num - The `num` parameter represents the number of days to add to the current date.
 * @returns a formatted date string.
 */
function affichage_seance(indHarry,index, num){
  const indice = ind(indHarry, index) + num;
  const dateActuelle = new Date();
  dateActuelle.setDate(dateActuelle.getDate() + indice);
  const options = { day: 'numeric', month: 'long' };
  const dateFormatee = dateActuelle.toLocaleDateString('fr-FR', options); 
  return dateFormatee
};

/**
 * The PotterMovies function is a React component that fetches data from an API and displays a list of
 * Harry Potter movies with their details.
 * @returns The function `PotterMovies` returns JSX elements that display a list of Harry Potter
 * movies. The movies are fetched from an API and rendered in a `<ul>` element. Each movie is displayed
 * with its title, box office, budget, directors, summary, poster, and buttons for different showtimes.
 * The movie's trailer and wiki links are also displayed. If the data is still loading, a
 */
function PotterMovies() {
  const [data, setData] = useState(null);

  useEffect(() => {

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

              <h2>{movie.attributes.title}</h2>
              <p>Box Office: {movie.attributes.box_office}</p>
              <p>Budget: {movie.attributes.budget}</p>
              <p>Directeurs: {movie.attributes.directors.join(', ')}</p>
              <p>Résumé: {movie.attributes.summary}</p>
                <img
                src={movie.attributes.poster} alt={""}
                style={{ width: '40%', marginBottom: '10px' }} 
                />

              <Link to={`/Films/${formatTitleForURL(movie.attributes.title)}`} 
                state = {[index,`Potter`,ind(indHarry, index)+0]} >
              <Button variant="primary">{affichage_seance(indHarry,index,0)}</Button>
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