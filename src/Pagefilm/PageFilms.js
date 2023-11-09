import React from 'react';
import Bandeau from '../Composants_page/Bandeau';
import "./PageFilms.css"
import "../API_request/Ghibli_request.css"
import Ghibli from '../API_request/Ghibli_request';
import Potter from '../API_request/Potter_request';

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
