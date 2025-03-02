import AddPlayer from '../AddPlayer/AddPlayer.jsx';
import Table from '../Table/Table.jsx';
import PropTypes from 'prop-types';

//#region klass för spelare
class Player {

    //Konstruktor för att skapa objekt av en spelare
    constructor(name, points, games, goalDif, matches, sport) {
        this.name = name;
        this.points = points;
        this.games = games;
        this.goalDif = goalDif;
        this.matches = matches;
        this.sport = sport;
    }

    //Get för spelarnamn
    getName() {
        return this.name;
    }

    //Funktion för att öka poäng vid vinst
    incrementPoint() {
        if(this.sport == "Fotboll" || this.sport == "Ishockey" || this.sport == "Innebandy"){
            return new Player(this.name, this.points + 3, this.games, this.goalDif, this.matches, this.sport);

        }
        else if(this.sport == "Rugby"){
            return new Player(this.name, this.points + 4, this.games, this.goalDif, this.matches, this.sport);
        }
        else if(this.sport == "Handboll"){
            return new Player(this.name, this.points + 2, this.games, this.goalDif, this.matches, this.sport);
        }

    }

    //Funktion för att öka poäng vid oavgjort
    incrementPointDraw() {
        if(this.sport == "Fotboll" || this.sport == "Handboll" || this.sport == "Innebandy" || this.sport == "Ishockey"){
            return new Player(this.name, this.points + 1, this.games, this.goalDif, this.matches, this.sport);
        }
        else if(this.sport == "Rugby"){
            return new Player(this.name, this.points + 2, this.games, this.goalDif, this.matches, this.sport);
        }
    }

    //Funktion för att hämta poäng
    getPoints() {
        return this.points;
    }

    //Funktion som plussar på målskillnaden
    addGoalDif(goalDif) {
        return new Player(this.name, this.points, this.games, this.goalDif + goalDif, this.matches, this.sport);

    }

    //Funktion som ökar målskillnaden
    reduceGoalDif(goalDif) {
        return new Player(this.name, this.points, this.games, this.goalDif - goalDif, this.matches, this.sport);
    }

    //Funktion som hämtar målskillnaden
    getGoalDif() {
        return this.goalDif;
    }

    //Funktion som lägger till en ny match 
    addMatch(newMatch){
        return new Player(this.name, this.points, this.games, this.goalDif, [...this.matches, newMatch], this.sport)
    }

    //Funktion som hämtar spelade matcher
    getMatches(){
        return this.matches;
    }
}
//#endregion

//Funktion som hanterar applikationens body tar emto den skapade truneringen
function Body({ tournament, setPlayers, players, matches }) {

    //#region Funktion som tar emot alla inmatad spelares namn
    function returnPlayer(playeIn) {
        let newPlayer = new Player(playeIn, 0, 0, 0, [], tournament.sport);

        console.log(newPlayer);

        setPlayers(prevIn => [...prevIn, newPlayer]);        
    }
    //#endregion

    return (
        <>
            {/*Skriver ut komponenten för att ange deltager med namn
            En gång för varje spelare som angets när tävlingen satts upp*/ }
            {tournament != null && <AddPlayer tournament={tournament.antalDeltagare} returnPlayer={returnPlayer} players={players}/>}

            {/*Kollar om alla spelare är inmatade och visar tabellen med spelare*/}
            {(players != null && tournament != null && players.length == tournament.antalDeltagare) && <Table tournament={tournament} matches={matches} players={[...players].sort((a, b) => {
                
                //Om spelarna har samma poäng så sorterar den på målskillnad
                if(b.getPoints() == a.getPoints()){
                    return b.getGoalDif() - a.getGoalDif();
                }
                else{
                    //sorterar på poäng
                    return b.getPoints() - a.getPoints();
                }

            } )}/>}

        </>

    )
}

//Validerar mina props
Body.propTypes ={
    tournament : PropTypes.object.isRequired,
    setPlayers : PropTypes.func.isRequired,
    players : PropTypes.arrayOf(
        PropTypes.object.isRequired
    ),
    matches : PropTypes.array.isRequired
}

export default Body