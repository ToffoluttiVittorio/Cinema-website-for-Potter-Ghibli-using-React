import React from 'react';
import Bandeau from '../Composants_page/Bandeau.js';
import "./PageFilms.css"
import Ghibli from '../API_request/Ghibli_request.js';
import Potter from '../API_request/Potter_request.js';

/**
 * The function `PageFilms` returns a JSX element that represents a page displaying films, with a
 * header component called `Bandeau` and two other components called `Potter` and `Ghibli`.
 * @returns a JSX element.
 */
function PageFilms() {
  return (

    <div className="PageFilms">

      <Bandeau className="bandeau"/>
      
      <div className='reste'>
      <Potter/>
      <Ghibli/>
      </div>
      </div>

  );
} 

export default PageFilms;
