import Bandeau from '../Composants_page/Bandeau.js';
import "../Composants_page/Bandeau.css"
import "../Page_Calendrier/Calendrier.css"
import "../Page_Calendrier/Catest.css"
import Ghiblione from '../API_request/Ghibli_one.js';
import Potterone from '../API_request/Potter_one.js';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../Page_FilmDetails/FilmDetails.css"

/**
 * The Calendrier function is a React component that displays a calendar and information about movies
 * currently playing.
 * @returns The Calendrier component is returning a JSX element.
 */
function Calendrier() {

  const location = useLocation();
  const indGhibli = location.state[0];
  const indHarry = location.state[1];


  return (
    <div className="Calendrier">
      <Bandeau />
      <div className='reste'>
      <div className="button-container">

      <Link to="/Calendrier/Date" >
        <button className="cal-button" >
          Calendar
        </button>
      </Link>
      </div>

      <p style={{fontWeight: 'bold', fontSize: '30px'}}>Film à l'affiche :</p>

      <Ghiblione filmIndex={indGhibli}/>
      <Potterone index={indHarry}/>
      </div>
      </div>
  );
}

export default Calendrier;
