//import { useState } from 'react'
import { useRef, useState } from 'react';
import Navbar from './Navbar'
import AddPlayer from './AddPlayer';
import Table from './Table.jsx';
//import './App.css'

function App() {

  //useState för att kunna hämta den skapade tävlingen 
  const [tornament, setTournament] = useState(null);

  //Funktion som hämntar den skapade turneringen 
  function getTournament(currentTornament){

    //Sätter det inkommande värdet i Tornament i useState
    setTournament(currentTornament);
    console.log("tournament i main: ", tornament.antalDeltagare)
  }

  //Use state som innehåller alla spelar namn 
  const [players, setPlayers] = useState([]);

  //Funktion som tar emot alla inmatad spelares namn
  function returnPlayer(playeIn){
    console.log("player Name: " + playeIn);
   /*  players.push(playeIn); */

   setPlayers(prevIn => [...prevIn, playeIn]);

    console.log("Alla tillagda spelare: " + players);
  }  
  //Returnerar alla kmomponenter som ska ingå i vår DOM
  return (
    <>
      {/*Komponent för navbar som returnerar parametrarna för trävlingen*/}
      <Navbar getTournament={getTournament}/>

      {/*Skriver ut modulen för att ange deltager med namn
      En gång för varje spelare som angets när tävlingen satts upp*/ }
      {tornament != null && <AddPlayer tornament={tornament.antalDeltagare} returnPlayer={returnPlayer} /> }
    
      {/*Kollar om alla spelare är inmatade och visar tabellen med spelare*/}
      {(players != null && tornament != null && players.length == tornament.antalDeltagare) && <Table players={players}/>}
    </>
  )
}

export default App
