import { useState } from 'react';
import Navbar from './MainSections/Navbar'
import Body from './MainSections/Boddy';

function App() {

  //#region useState
  //useState för att kunna hämta den skapade tävlingen 
  const [tournament, setTournament] = useState(null);

  //useState för spelare
  const [players, setPlayers] = useState([]);

  //useState för matcher
  const [matches, setMatch] = useState([]);
  //#endregion

  //#region Funktion som hämntar den skapade turneringen 
  function getTournament(currentTournament) {

    //Sätter det inkommande värdet i Tornament i useState
    setTournament(currentTournament);

  }
  //#endregion

  //#region Funktion för att tömma nuvarande turnering och börja om
  function clearTournament(){

    console.log("Running function clear")
    //Tömmer turnings och spelarobjeklt
    setTournament(null);
    setPlayers([]);
    setMatch([]);
  }
  //#endregion

  //Returnerar alla kmomponenter som ska ingå i vår DOM
  return (
    <>
        {/*Komponent för navbar som returnerar parametrarna för trävlingen*/}
        <Navbar setTornament={getTournament} players={players} setPlayers={setPlayers} matches={matches} setMatches={setMatch} clear={clearTournament} />

        {tournament != null && <Body tournament={tournament} setPlayers={setPlayers} players={players}/>}
    </>
  )
}

export default App  
