import Bandeau from '../Composants_page/Bandeau.js';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Potterone from '../API_request/Potter_one.js';
import Ghiblione from '../API_request/Ghibli_one.js';
import "../Page_FilmDetails/FilmDetails.css"



/**
 * The function `FilmDetails` is a React component that renders different film components based on the
 * film name and index passed through the URL parameters.
 * @returns a JSX element.
 */
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
    if (film === "Potter"){
        film = <Potterone index={id} indice = {indice}/>
    } else{
        film = <Ghiblione filmIndex={id} indice = {indice}/>
    }

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

