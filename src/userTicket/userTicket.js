import React, { useEffect, useState } from 'react';
import Bandeau from '../Composants_page/Bandeau.js';
import Cookies from 'js-cookie';
import "../Page_FilmDetails/FilmDetails.css"

function UserTicket() {
  const userEmail = Cookies.get('user_email');
  const encodedEmail = encodeURIComponent(userEmail);
  const [userId, setUserId] = useState(null);
  const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
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
          setUserId(data.data.id);
        }
      });
  }, []);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8888/tickets/${userId}`)
        .then((response) => response.json())
        .then((responseData) => {
          setUserTickets(responseData.data);
        });
    }
  }, [userId]);

  const handleDeleteTicket = (ticketId) => {
    fetch(`http://localhost:8888/tickets/${ticketId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 204) {

          const updatedTickets = userTickets.filter((ticket) => ticket.id !== ticketId);
          setUserTickets(updatedTickets);
        } else {
          console.error('Erreur lors de la suppression du ticket');
        }
      })
      .catch((error) => {
        console.error('Erreur de communication avec le serveur', error);
      });
  };
  

  return (
    <div className="userTicket">
      <Bandeau />
    <div className='reste'>
      <h1>Vos tickets :</h1>
      <ul>
        {userTickets.length > 0 ? (
            userTickets.map((ticket) => (
                <li key={ticket.id}>
                    Film : {ticket.categorie}, Siège : {ticket.numeroSiege},
                    Date : {new Date(ticket.date).toLocaleDateString()}, Séance : {ticket.numeroSeance}
                    <button onClick={() => handleDeleteTicket(ticket.id)} style={{margin : '15px'}}>Supprimer</button>
                </li>
            ))
        ) : (
        <p>Vous ne possédez aucun ticket pour le moment .</p>
        )}
      </ul>
      </div>
    </div>
  );
}

export default UserTicket;