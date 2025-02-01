import CreateTornamentModal from "./CreateTornamenModal";
import { useRef } from "react";
import PropTypes from "prop-types";

//Funktion för navbar, den tar emot funktionen som skickas till den som props
function Navbar({ getTournament }) {

    //useRef där man kan spara turneringen som skapas i CreateTournamentModalBody
    const tournament = useRef(null);

    //Funktion som skickas till CreateTournamentModalBody för att kunna spara den
    //skapade turneringen 
    function returnTournament(newTournament) {
        //Sparar turneringen i tournament
        tournament.current = newTournament;

        console.log("Saved tournament: ", tournament.current);

        //Returnerar turneringen 
        getTournament(tournament.current);
    }

    return (
        <>
            <div className="container bg-success-subtle">
                <nav className="navbar navbar-expand-lg ">
                    <div className="container">
                        <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item mt-2 me-1 ms-auto">
                                    <div id="createTournament" type="button" className="btn bg-primary text-white" data-bs-toggle="modal" data-bs-target="#ModalCreateTournament">Create new tournament</div>
                                </li>
                                <li className="navbar-item mt-2 me-1 ms-auto">
                                    <div className="btn bg-primary text-white">Manage tournament</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            {/*Kallar på CreateTornamentModalBody när användaren klickar på knappen Create tournament
            tar emot funktionen returnTornament för att kunna returnera resultatet från modalen */}
            <CreateTornamentModal returnTournament={returnTournament} />
        </>
    );
}

//Validerar mina props
Navbar.propTypes = {
    getTournament : PropTypes.object.isRequired
}

export default Navbar;