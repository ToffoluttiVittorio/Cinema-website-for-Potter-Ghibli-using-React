import React from 'react';
import Bandeau from '../Composants_page/Bandeau.js';
import "../Composants_page/Bandeau.css"
import Cookies from 'js-cookie';

import "./Home.css"
import "../Page_FilmDetails/FilmDetails.css"

/**
 * The Home function is a React component that renders a webpage displaying information about the Films
 * Ghibli / Harry Potter movie sessions.
 * @returns The Home component is returning a JSX element.
 */
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
