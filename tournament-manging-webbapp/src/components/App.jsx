//import { useState } from 'react'
import { useState } from 'react';
import Navbar from './Navbar'
import Body from './Boddy';

//import './App.css'

function App() {

  //useState för att kunna hämta den skapade tävlingen 
  const [tornament, setTournament] = useState(null);

  //Funktion som hämntar den skapade turneringen 
  function getTournament(currentTornament) {

    //Sätter det inkommande värdet i Tornament i useState
    setTournament(currentTornament);
    console.log("tournament i main: ", tornament.antalDeltagare)
  }

  //Returnerar alla kmomponenter som ska ingå i vår DOM
  return (
    <>
      {/*Komponent för navbar som returnerar parametrarna för trävlingen*/}
      <Navbar getTournament={getTournament} />

      {tornament != null && <Body tornament={tornament} />}

    </>
  )
}

export default App  
