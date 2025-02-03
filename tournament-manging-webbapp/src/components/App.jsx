import { useState } from 'react';
import Navbar from './Navbar'
import Body from './Boddy';

function App() {

  //#region useState
  //useState för att kunna hämta den skapade tävlingen 
  const [tornament, setTournament] = useState(null);

  //Usestate för spelare
  const [players, setPlayers] = useState([]);
  //#endregion

  //#region Funktion som hämntar den skapade turneringen 
  function getTournament(currentTornament) {

    //Sätter det inkommande värdet i Tornament i useState
    setTournament(currentTornament);

  }
  //#endregion

  //Returnerar alla kmomponenter som ska ingå i vår DOM
  return (
    <>
        {/*Komponent för navbar som returnerar parametrarna för trävlingen*/}
        <Navbar setTornament={getTournament} players={players} setPlayers={setPlayers}/>

        {tornament != null && <Body tornament={tornament} setPlayers={setPlayers} players={players}/>}
    </>
  )
}

export default App  
