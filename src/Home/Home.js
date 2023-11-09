import React from 'react';
import Bandeau from '../Composants_page/Bandeau';
import "../Composants_page/Bandeau.css"
import Cookies from 'js-cookie';

import "./Home.css"
import "../Page_FilmDetails/FilmDetails.css"

function Home() {
  const userEmail = Cookies.get('user_email');
  return (
    <div className="Home">
      <Bandeau/>
      <div className='reste'>
    <div className='restehome'>
    <p>Ceci est le site de consultation des séances des Films Ghibli / Harry Potter fait par Vittorio Toffolutti</p>
  </div>
  </div>
</div>


  );
}

export default Home;
