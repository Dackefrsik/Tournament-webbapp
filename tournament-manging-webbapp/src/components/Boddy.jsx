import AddPlayer from './AddPlayer';
import Table from './Table.jsx';
import PropTypes from 'prop-types';

//#region klass för spelare
class Player {

    constructor(name, points = 0, games = 0, goalDif = 0, matches = []) {
        this.name = name;
        this.points = points;
        this.games = games;
        this.goalDif = goalDif;
        this.matches = matches;
    }

    getName() {
        return this.name;
    }

    incrementPoint() {
        return new Player(this.name, this.points + 3, this.games, this.goalDif, this.matches);
    }

    incrementPointDraw() {
        return new Player(this.name, this.points + 1, this.games, this.goalDif, this.matches);
    }

    getPoints() {
        return this.points;
    }

    incrementGames() {
        return new Player(this.name, this.points, this.games + 1, this.goalDif, this.matches);
    }

    getGames() {
        return this.games;
    }

    addGoalDif(goalDif) {
        return new Player(this.name, this.points, this.games, this.goalDif + goalDif, this.matches);

    }

    reduceGoalDif(goalDif) {
        return new Player(this.name, this.points, this.games, this.goalDif - goalDif, this.matches);
    }

    getGoalDif() {
        return this.goalDif;
    }

    addMatch(newMatch){
        return new Player(this.name, this.points, this.games, this.goalDif, [this.matches, newMatch])
    }

}
//#endregion

//Funktion som hanterar applikationens body tar emto den skapade truneringen
function Body({ tornament, setPlayers, players }) {

    //#region Funktion som tar emot alla inmatad spelares namn
    function returnPlayer(playeIn) {
        let newPlayer = new Player(playeIn);

        setPlayers(prevIn => [...prevIn, newPlayer]);        
    }
    //#endregion

    return (
        <>
            {/*Skriver ut modulen för att ange deltager med namn
            En gång för varje spelare som angets när tävlingen satts upp*/ }
            {tornament != null && <AddPlayer tornament={tornament.antalDeltagare} returnPlayer={returnPlayer} />}

            {/*Kollar om alla spelare är inmatade och visar tabellen med spelare*/}
            {(players != null && tornament != null && players.length == tornament.antalDeltagare) && <Table players={[...players].sort((a, b) => b.getPoints() - a.getPoints())} />}

        </>

    )
}

//Validerar mina props
Body.propTypes ={
    tornament : PropTypes.object.isRequired,
    setPlayers : PropTypes.func.isRequired,
    players : PropTypes.arrayOf(
        PropTypes.object.isRequired
    )
}

export default Body