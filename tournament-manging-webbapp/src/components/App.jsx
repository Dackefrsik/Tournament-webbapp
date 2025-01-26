//import { useState } from 'react'
import { useState } from 'react';
import Navbar from './Navbar'
import AddPlayer from './AddPlayer';
//import './App.css'

function App() {

  const [tornament, setTournament] = useState(null);

  function getTournament(currentTornament){

    setTournament(currentTornament);
    console.log("tournament i main: ", tornament.antalDeltagare)
    return tornament;
  }
  

  return (
    <>
      <Navbar getTournament={getTournament}/>
      {tornament != null && <AddPlayer tornament={tornament.antalDeltagare} /> }
    </>
  )
}

export default App
