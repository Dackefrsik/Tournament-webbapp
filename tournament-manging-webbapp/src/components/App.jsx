//import { useState } from 'react'
import { useState } from 'react';
import Navbar from './Navbar'
import Body from './Boddy';

function App() {

  //useState för att kunna hämta den skapade tävlingen 
  const [tornament, setTournament] = useState(null);

  const [players, setPlayers] = useState([]);

  //Funktion som hämntar den skapade turneringen 
  function getTournament(currentTornament) {

    //Sätter det inkommande värdet i Tornament i useState
    setTournament(currentTornament);

  }

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
