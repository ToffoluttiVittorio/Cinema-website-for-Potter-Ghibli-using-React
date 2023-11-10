import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Bandeau from '../Composants_page/Bandeau.js';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Potter_one from '../API_request/Potter_one.js';
import Ghibli_one from '../API_request/Ghibli_one.js';
import "../Page_FilmDetails/FilmDetails.css"



function FilmDetails() {
    const location = useLocation();
    let id = location.state[0];
    let film = location.state[1];
    let indice = location.state[2];

    console.log(indice);
    
    if (id){
    } else {
        id = 0
    }
    if (film == "Potter"){
        film = <Potter_one index={id} indice = {indice}/>
    } else{
        film = <Ghibli_one filmIndex={id} indice = {indice}/>
    }
    
    const { title } = useParams();


    return(
        <div className="FilmDetails">
                        <Bandeau/>
            <div className='reste'>

            {film}
        </div>
        </div>

    )
}
export default FilmDetails;

