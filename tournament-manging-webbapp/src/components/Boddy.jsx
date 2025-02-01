import AddPlayer from './AddPlayer';
import Table from './Table.jsx';
import PropTypes from 'prop-types';

//#region klass för spelare
class Player {

    constructor(name, points = 0, games = 0, goalDif = 0) {
        this.name = name;
        this.points = points;
        this.games = games;
        this.goalDif = goalDif;
    }

    getName() {
        return this.name;
    }

    incrementPoint() {
        return new Player(this.name, this.points + 3, this.games, this.goalDif);
    }

    getPoints() {
        return this.points;
    }

    incrementGames() {
        return new Player(this.name, this.points, this.games + 1, this.goalDif);
    }

    getGames() {
        return this.games;
    }

    addGoalDif(goalDif) {
        return new Player(this.name, this.points, this.games, this.goalDif + goalDif);

    }

    reduceGoalDif(goalDif) {
        return new Player(this.name, this.points, this.games, this.goalDif - goalDif);
    }

    getGoalDif() {
        return this.goalDif;
    }

}
//#endregion

//Funktion som hanterar applikationens body tar emto den skapade truneringen
function Body({ tornament, setPlayers, players }) {

    //Funktion som tar emot alla inmatad spelares namn
    function returnPlayer(playeIn) {
        let newPlayer = new Player(playeIn);

        setPlayers(prevIn => [...prevIn, newPlayer]);

        
    }

    //Testfunktion
    /* function addGamesToOne() {
        setPlayers(prevPlayers => prevPlayers.map(player =>
            player.getName() == "Daniel" ? player.incrementGames() : player

        )
        )
    } */

    

    return (
        <>
            {/*Skriver ut modulen för att ange deltager med namn
            En gång för varje spelare som angets när tävlingen satts upp*/ }
            {tornament != null && <AddPlayer tornament={tornament.antalDeltagare} returnPlayer={returnPlayer} />}

            {/*Kollar om alla spelare är inmatade och visar tabellen med spelare*/}
            {(players != null && tornament != null && players.length == tornament.antalDeltagare) && <Table players={[...players].sort((a, b) => b.getPoints() - a.getPoints())} />}

{/*             <button onClick={() => Match()}>Add playerMatches</button> */}
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