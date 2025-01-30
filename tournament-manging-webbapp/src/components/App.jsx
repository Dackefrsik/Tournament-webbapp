//import { useState } from 'react'
import { useRef, useState } from 'react';
import Navbar from './Navbar'
import AddPlayer from './AddPlayer';
import Table from './Table.jsx';
//import './App.css'

//#region klass för spelare
class Player{

  constructor(name, points = 1, games = 0, goalDif = 0){
    this.name = name;
    this.points = points;
    this.games = games;
    this. goalDif = goalDif;
  }

  getName(){
    return this.name;
  }

  setPoint(points){
    this.points += points;
  }

  getPoints(){
    return this.points;
  }

  setGames(games){
    this.games = games;
  }

  getGames(){
    return this.games;
  }

  addGoalDif(goalDif){
    this.goalDif += goalDif;
  }

  reduceGoalDif(goalDif){
    this.goalDif -= goalDif;
  }

  getGoalDif(){
    return this.goalDif;
  }

}
//#endregion

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
    let newPlayer = new Player(playeIn);

   setPlayers(prevIn => [...prevIn, newPlayer]);
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
