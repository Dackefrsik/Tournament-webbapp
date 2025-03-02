import CreateTornamentModal from "../ModalBoys/CreateTornamenModal";
import { useState } from "react";
import PropTypes from "prop-types";
import CreateAddResultModal from "../ModalBoys/CreatAddResultModal";

//Funktion för navbar, den tar emot funktionen som skickas till den som props
function Navbar({ setTornament, players, setPlayers, matches, setMatches, clear}) {

    //#region useStates
    //useState för antalet deltagare
    const [antalDeltagare, setDeltagare] = useState(null)

    const [tournament, setCurrentTournament] = useState(null);

    //#endregion

    //#region Funktion för att kunna spara den skapade turneringen 
    function returnTournament(newTournament) {
       
        setDeltagare(newTournament.antalDeltagare)

        //Returnerar turneringen 
        setTornament(newTournament);
        setCurrentTournament(newTournament);

        //setAntalMatcher(newTournament.antalMatcher * newTournament.antalDeltagare);

        console.log("Antalet matcher", newTournament.antalMatcher);
    }
    //#endregion
    
    return (
        <>
            <div className="sticky-top">
                <nav className="navbar navbar-expand-lg">
                    <button className="navbar-toggler ms-auto me-2 buttonColor" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse ms-3" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item mt-2 me-1 ms-1">
                                <div id="createTournament" type="button" className="btn buttonColor" data-bs-toggle="modal" data-bs-target="#ModalCreateTournament">Create new tournament</div>
                            </li>
                            {/*Visas först när alla spelare är angivna men försvinner när antalet matcher är spelade*/
                            (antalDeltagare != null && antalDeltagare == players.length && tournament.antalMatcher !== matches.length) && 
                            <li className="navbar-item mt-2 me-1 ms-1">
                                <div className="btn buttonColor" type="button" data-bs-toggle="modal" data-bs-target="#ModalAddResult">Add reasult</div>
                            </li>}
                            {/*Visas först när alla spelare är angivna*/
                            (antalDeltagare != null  &&  antalDeltagare == players.length) &&
                            <li className="navbar-item mt-2 me-1 ms-1">
                                <div className="btn buttonColor" type="button" onClick={() => clear()}>Clear tournament</div>
                            </li>}
                        </ul>
                    </div>
                </nav>
            </div>
            {/*Kallar på CreateTornamentModalBody när användaren klickar på knappen Create tournament
            tar emot funktionen returnTornament för att kunna returnera resultatet från modalen */}
            <CreateTornamentModal returnTournament={returnTournament} />
            
            {/*Modal för att lägga till resultat, går först att visa när alla spelare 
            är angivna med namn*/}
            <CreateAddResultModal players={players} setPlayers={setPlayers} matches={matches} setMatches={setMatches}/> 

        </>
    );
}

//Validerar mina props
Navbar.propTypes = {
    setTornament : PropTypes.func.isRequired,
    players : PropTypes.arrayOf(
            PropTypes.object.isRequired
        ).isRequired,
    setPlayers : PropTypes.func.isRequired,
    matches : PropTypes.array.isRequired,
    setMatches : PropTypes.func.isRequired,
    clear : PropTypes.func.isRequired
}

export default Navbar;