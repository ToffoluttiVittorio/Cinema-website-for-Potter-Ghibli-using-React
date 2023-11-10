import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


/**
 * The function encodes spaces in a string to URL-friendly format by replacing them with underscores.
 * @param string - The `string` parameter is the input string that you want to encode.
 * @returns a URL-encoded version of the input string with spaces replaced by underscores.
 */
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

/**
 * The function "ind" calculates the adjusted index value based on the given index and a reference
 * index.
 * @param indGhibli - The variable "indGhibli" represents the current index of a Ghibli film.
 * @param index - The index parameter represents the current index position in an array or list.
 * @returns the value of the variable "indGhibli" after performing some calculations.
 */
function ind(indGhibli, index){
  if (index < indGhibli){
    indGhibli =  nbrfilmGhibli - Math.abs(indGhibli - index) ;
  }else {
    indGhibli = index - indGhibli
  }
  return indGhibli
};

/**
 * The function affichage_seance takes in three parameters (indGhibli, index, num) and returns a
 * formatted date based on the current date and the provided parameters.
 * @param indGhibli - The parameter "indGhibli" is not defined in the given code. It seems to be a
 * function or variable that is expected to be passed as an argument to the function
 * "affichage_seance". Without knowing its definition, it is difficult to determine its purpose or how
 * it affects the function
 * @param index - The index parameter is used to specify the position of the desired element in the
 * indGhibli array.
 * @param num - The `num` parameter is a number that represents the number of days to add to the
 * current date. It is used to calculate the date for the seance.
 * @returns a formatted date string.
 */
function affichage_seance(indGhibli,index, num){
  const indice = ind(indGhibli, index) + num;
  const dateActuelle = new Date();

  dateActuelle.setDate(dateActuelle.getDate() + indice);
  const options = { day: 'numeric', month: 'long' };
  const dateFormatee = dateActuelle.toLocaleDateString('fr-FR', options); 
  return dateFormatee
};


/**
 * The Ghibli function fetches data from the Ghibli API and displays a list of films along with their
 * details and buttons for different showtimes.
 * @returns The Ghibli component returns a div containing a heading "Films du Studio Ghibli" and a list
 * of films fetched from the Ghibli API. Each film is displayed with its title, release date, director,
 * image, and description. Additionally, there are buttons for different showtimes for each film, which
 * are linked to a separate page for each film. If the data is still
 */
function Ghibli() {
  const [data, setData] = useState(null);

  useEffect(() => {

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
               <img src={film.image} alt={""}
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
