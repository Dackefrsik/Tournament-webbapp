//import { useState } from 'react'
import { useRef, useState } from 'react';
import Navbar from './Navbar'
import AddPlayer from './AddPlayer';
import Table from './Table.jsx';
//import './App.css'

//#region klass för spelare
class Player{

  constructor(name, points = 0, games = 0, goalDif = 0){
    this.name = name;
    this.points = points;
    this.games = games;
    this. goalDif = goalDif;
  }

  getName(){
    return this.name;
  }

  incrementPoint(){
    return  new Player(this.name, this.points + 3, this.games, this.goalDif);
  }

  getPoints(){
    return this.points;
  }

  incrementGames(){
  return  new Player(this.name, this.points, this.games + 1, this.goalDif);
  }

  getGames(){
    return this.games;
  }

  addGoalDif(goalDif){
    return  new Player(this.name, this.points, this.games, this.goalDif + goalDif);

  }

  reduceGoalDif(goalDif){
    return  new Player(this.name, this.points, this.games, this.goalDif - goalDif);
  }

  getGoalDif(){
    return this.goalDif;
  }
   
}
//#endregion

//#region klass för varje match
class match{
  constructor(home, away, homeGoal, awayGoal){
    this.home = home;
    this.away = away;
    this.homeGoal = homeGoal;
    this.awayGoal = awayGoal;
  }

  getHome(){
    return this.home;
  }

  getAway(){
    return this.away;
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

  //Testfunktion
  function addGamesToOne(){
   setPlayers(prevPlayers => prevPlayers.map(player => 
    player.getName() == "Daniel" ?  player.incrementGames() : player

    )
  )
  }

  //Usestate för matcher
  const [matches, setMatch] = useState([]);

  //Funktion för att registrera matcher
  function Match(){

    let matchCheck = true;

    matches.forEach(sinelMatch => {
      if(sinelMatch.getHome() == "Daniel" && sinelMatch.getAway() == "Erik"){
        console.log("Matchen har redan spelats");
        matchCheck = false;
      }
    })
    let newMatch;

    if(matchCheck){
      newMatch = new match("Daniel", "Erik", 3, 2);
    }

    if(matchCheck){
      setMatch(prevMatches => [...prevMatches, newMatch]);

      setPlayers(players => players.map(player => {
        console.log("match");
  
          if(player.name == newMatch.getHome()){
            console.log("home")
            if(newMatch.homeGoal > newMatch.awayGoal){
              console.log("bigger");
              return player.incrementPoint().incrementGames().addGoalDif(newMatch.homeGoal - newMatch.awayGoal);;
            }
          }
          else if(player.name == newMatch.getAway()){
            if(newMatch.homeGoal > newMatch.awayGoal){
              return player.incrementGames().reduceGoalDif(newMatch.homeGoal - newMatch.awayGoal);
            }
          }
        return player;
        }
      )
    )
    }
    
    
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
      {(players != null && tornament != null && players.length == tornament.antalDeltagare) && <Table players={[...players].sort((a,b) => b.getPoints() -a.getPoints())}/>}
    
        <button onClick={() => Match()}>Add playerMatches</button>
    
    </>   
  )
}

export default App  
