import PropTypes from "prop-types"
import { useState, useRef } from "react"

//#region klass för varje match
class match {
    constructor(home, away, homeGoal, awayGoal) {
        this.home = home;
        this.away = away;
        this.homeGoal = homeGoal;
        this.awayGoal = awayGoal;
    }

    getHome() {
        return this.home;
    }

    getAway() {
        return this.away;
    }
}
//#endregion

function CreateAddResultModal({setPlayers}){

    //useRef för att kunna hämta värden från formuläret 
    const homeRef = useRef("");
    const homeGoalRef = useRef("");
    const awayRef = useRef("");
    const awayGoalRef = useRef("");

    //const {setPlayers} = usePlayers();

    //Usestate för matcher
    const [matches, setMatch] = useState([]);

    //Funktion för att registrera matcher
    function Match() {

        //Variabel för att kolla om vald match har spelats eller ej
        let matchCheck = true;

        //Testloop som loggar i consolen om matchen redan har spelats
        matches.forEach(sinelMatch => {
            if (sinelMatch.getHome() == "Daniel" && sinelMatch.getAway() == "Erik") {
                console.log("Matchen har redan spelats");
                matchCheck = false;
            }
        })
        let newMatch;

        if (matchCheck) {
            newMatch = new match(homeRef.current.value, awayRef.current.value, homeGoalRef.current.value, awayGoalRef.current.value);

            setMatch(prevMatches => [...prevMatches, newMatch]);

            setPlayers(players => players.map(player => {
                console.log("match");

                if (player.name == newMatch.getHome()) {
                    console.log("home")
                    if (newMatch.homeGoal > newMatch.awayGoal) {
                        console.log("bigger");
                        console.log(player.incrementPoint().incrementGames().addGoalDif(newMatch.homeGoal - newMatch.awayGoal))
                        return player.incrementPoint().incrementGames().addGoalDif(newMatch.homeGoal - newMatch.awayGoal);
                    }
                }
                else if (player.name == newMatch.getAway()) {
                    if (newMatch.homeGoal > newMatch.awayGoal) {
                        return player.incrementGames().reduceGoalDif(newMatch.homeGoal - newMatch.awayGoal);
                    }
                }
                return player
            }
            )
            )
        }
    }     
        
    return (
        <>
        <div className="modal fade" id="ModalAddResult" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-primary">
                        <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Add resault</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <form action="" className="form-group">
                                <div className="d-flex flex-column">
                                    <div className="form-floating">
                                        <input type="text" name="Home" className="mb-2 form-control" id="antalDeltagare"  ref={homeRef} />
                                        <label htmlFor="Home">Hemma</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="number" name="HomeGoal" className="form-control" id="antalMatcher" min="0" ref={homeGoalRef} />
                                        <label htmlFor="HomeGoal">Antal mål hemma</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="text" name="Away" className="mb-2 form-control" id="antalDeltagare" ref={awayRef} />
                                        <label htmlFor="antalDeltagare">Borta</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="number" name="AwayGoal" className="form-control" id="antalMatcher" min="0" ref={awayGoalRef} />
                                        <label htmlFor="AwayGoal">Antal mål borta</label>
                                    </div> 
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {/*Knappen som returnerar den skapade funktionen till navbar modulen*/}
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => Match()}>Add resultat</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

CreateAddResultModal.propTypes = {
    setPlayers : PropTypes.func.isRequired
}

export default CreateAddResultModal