import React, { useEffect, useState } from 'react';
import CinemaSeat from './CinemaSeat';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import Bandeau from '../Composants_page/Bandeau';
import "../Page_FilmDetails/FilmDetails.css"



const CinemaScreen = () => {
    return (
      <rect x="70" y="20" width="350" height="30" fill="midnightblue" />
    );
  };

const CinemaRoom = () => {
  const location = useLocation();
  const numeroSeance = location.state[0];
  const categorie = location.state[1][0];
  let indice_date = location.state[2];

  if (!indice_date){
    indice_date = 0;
  }

  console.log(numeroSeance,categorie,indice_date);


  const today = new Date();
  today.setDate(today.getDate() + indice_date);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const dateOnly = `${year}-${month}-${day}`;
  console.log(dateOnly);
  
    const [data, setData] = useState([]);

    const covidCrisis = true;
    const covid = [0,2,4,6,8,11,13,15,17,19,20,22,24,26,28,31,33,35,37,39,40,42,44,46,48,51,53,55,57,59];

    useEffect(() => {
      fetch(`http://localhost:8888/tickets?date=${dateOnly}&categorie=${categorie}&numeroSeance=${numeroSeance}`)
        .then((response) => response.json())
        .then((responseData) => {
          // Mappez les numéros de siège de chaque ticket et stockez-les dans un tableau
          let seatNumbers = responseData.data.map((ticket) => ticket.numeroSiege);

          if (covidCrisis){
            seatNumbers = seatNumbers.concat(covid);
          }
          setData(seatNumbers);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des tickets :', error);
        });
    }, []); 
  

  const userEmail = Cookies.get('user_email');
  const totalSeats = 6 * 10;
  const [showPopup, setShowPopup] = useState(false);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const updateSeatState = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      } else {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
  };

    const handleConfirmReservation = () => {

      const encodedEmail = encodeURIComponent(userEmail);
      let userId = null;
      
      fetch(`http://localhost:8888/users/${encodedEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then(response => {
          if (response) {
            if (response.status === 200) {
              return response.json();
            } else if (response.status === 404) {
            } else {
              console.error('Erreur de communication avec le serveur');
            }
          } else {
            console.error('Réponse non définie');
          }
        })
        .then(data => {
          if (data && data.data) {
            userId = data.data.id;
      
            // Créez un nouvel objet FormData
            selectedSeats.forEach((valeur) => {
              const formData = new URLSearchParams();

              

              formData.append("categorie", categorie);
              formData.append("date", dateOnly);
              formData.append("numeroSeance", numeroSeance);
              formData.append("numeroSiege", valeur);
              formData.append("userId", userId);

              console.log(dateOnly,valeur);
      
              // Envoyez les données au serveur Express en utilisant la méthode PUT
              return fetch('http://localhost:8888/tickets', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
              });
            });
          }
        })
        .catch(error => {
          console.error('Erreur lors de la requête:', error);
        });
        window.location.href = '/Ticket';
  };

  return (
    <div>
    <Bandeau/>
    <div className='reste'>
      <h1>Salle de Cinéma</h1>
      <svg width="500" height="400">
        <CinemaScreen />
        {Array.from({ length: totalSeats }).map((_, index) => (
          <CinemaSeat
            key={index}
            seatNumber={index}
            isClickable={data.includes(index) ? 2 : 1}
            updateSeatState={updateSeatState}
          />
        ))}
      </svg>
      <p>Places sélectionnées : {selectedSeats.join(', ')}</p>

      <button onClick={() => setShowPopup(true)}>Valider</button>

      {showPopup && (
        <div className="popup">
          <p>Êtes-vous sûr de réserver ces places ?</p>
          <button onClick={handleConfirmReservation}>Oui</button>
          <button onClick={() => window.location.href = '/Films/Salle'}>Non</button>
        </div>
      )}
      </div>
    </div>
  );
};

export default CinemaRoom;
