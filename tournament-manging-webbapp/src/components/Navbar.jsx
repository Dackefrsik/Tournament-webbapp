import CreateTornamentModalBody from "./CreateTornamenModalBody";
import {useRef} from "react";

function Navbar({getTournament}){

    const tournament = useRef(null);

    function returnTournament(newTournament){
        tournament.current = newTournament;

        console.log("Saved tournament: ", tournament.current);

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
        <CreateTornamentModalBody returnTournament={returnTournament}/>
    </>
    );
}

export default Navbar;