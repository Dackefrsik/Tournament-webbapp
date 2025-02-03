import PropTypes from "prop-types"
import {useEffect, useState, useRef } from "react"

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

    //#region UseRefs
    //useRef för att kunna hämta värden från formuläret 
    const homeRef = useRef("");
    const homeGoalRef = useRef("");
    const awayRef = useRef("");
    const awayGoalRef = useRef("");

    //Usref för modalen 
    const modalRef = useRef("");
    //#endregion

    //#region Usestates
    //Usestate för matcher
    const [matches, setMatch] = useState([]);

    //Usestate för att gömma modalen 
    const [modal, setModal] = useState("");
    //#endregion
    
    //#region Useeffect som används för att komma åt referensen av modalens nuvarande instans 
    useEffect(() => {
            if(modalRef.current) {
                //Inisialiserar en ny modal med den nya värdena 
                setModal(new window.bootstrap.Modal(modalRef.current));
            }
        }, []);
    //#endregion

    //#region Funktion för att registrera matcher
    function Match() {
        //Kolar om det angivits ett namn för hemspelaren
        if(homeRef.current && homeRef.current.value.trim() != ""){

            //Kollar om det angivits mål för hemalaget
            let homeGoal = Number(homeGoalRef.current.value);
            if(homeGoal && homeGoal != null && homeGoal > -1 ){
            
                //Kollar om det har angivits ett namn för bortaspelaren
                if(awayRef.current && awayRef.current.value.trim() != ""){

                    //Kollar om det har angivits mål för bortalaget
                    let awayGoal = Number(awayGoalRef.current.value);
                    if(awayGoal && awayGoal != null && awayGoal > -1){
                        //Variabel för att kolla om vald match har spelats eller ej
                        let matchCheck = true;

                        //Testloop som loggar i consolen om matchen redan har spelats
                        matches.forEach(sinelMatch => {
                            if (sinelMatch.getHome() == homeRef.current.value.trim() && sinelMatch.getAway() == awayRef.current.value.trim()) {
                                console.log("Matchen har redan spelats");
                                matchCheck = false;
                            }
                        })

                        //Variabel för ny match 
                        let newMatch;

                        // Kollar om matchen inte har spelats
                        if (matchCheck) {

                            //Skapar en ny match
                            newMatch = new match(homeRef.current.value, awayRef.current.value, homeGoalRef.current.value, awayGoalRef.current.value);

                            //Setter matchen genom att kopiera de tidigare och lägga till den nya
                            setMatch(prevMatches => [...prevMatches, newMatch]);

                            //Går igenom alla splare
                            setPlayers(players => players.map(player => {

                                //Checkar om spelaren var hemma
                                if (player.name == newMatch.getHome()) {

                                    //Kollar om det var seger
                                    if (newMatch.homeGoal > newMatch.awayGoal) {
                                        modal.hide();
                                        return player.incrementPoint().incrementGames().addGoalDif(newMatch.homeGoal - newMatch.awayGoal);
                                    }
                                    //Kollar om det var oavgjort
                                    else if(newMatch.homeGoal == newMatch.awayGoal){
                                        modal.hide();
                                        return player.incrementPointDraw().incrementGames();
                                    }
                                    //Förlust
                                    else{
                                        modal.hide();
                                        return player.incrementGames().reduceGoalDif(newMatch.awayGoal - newMatch.homeGoal);
                                    }
                                }
                                //Kollar om spearen var borta
                                else if (player.name == newMatch.getAway()) {
                                    //Kollar om det var förlust
                                    if (newMatch.homeGoal > newMatch.awayGoal) {
                                        modal.hide();
                                        return player.incrementGames().reduceGoalDif(newMatch.homeGoal - newMatch.awayGoal);
                                    }
                                    //Kollar om det var oavgjort
                                    else if(newMatch.homeGoal == newMatch.awayGoal){
                                        modal.hide();
                                        return player.incrementPointDraw().incrementGames();                                        
                                    }
                                    //Seger
                                    else{
                                        modal.hide();
                                        return player.incrementPoint().incrementGames().addGoalDif(newMatch.awayGoal - newMatch.homeGoal);
                                    }
                                }
                                modal.hide();
                                return player
                            }
                            )
                            )
                        } 
                    }
                    //Visar fel för bortamål
                    else{
                        awayGoalRef.current.style.border = "3px solid red";
                    }
                }
                //Visar fel för bortnamn
                else{
                    awayRef.current.style.border = "3px solid red";
                }
            }
            //Visar fel för hemmamål
            else{
                homeGoalRef.current.style.border = "3px solid red";
            }
        }
        //Visar fel för hemmanamn
        else{
            homeRef.current.style.border = "3px solid red";
        }
    } 
    //#endregion

    //#region Funktion som tar bort bordern som visar att något angivits fel i ett av inputfälten
    function focus(ref){
        ref.current.style.border = "";
    }
    //#endregion
        
    return (
        <>
        <div className="modal fade" id="ModalAddResult" tabIndex="-1" aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Add resault</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <form action="" className="form-group">
                                <div className="d-flex flex-column">
                                    <div className="form-floating">
                                        <input type="text" name="Home" className="mb-2 form-control" id="antalDeltagare" ref={homeRef} onFocus={() => focus(homeRef)}/>
                                        <label htmlFor="Home">Hemma</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="number" name="HomeGoal" className="mb-2 form-control" id="antalMatcher" min="0"  ref={homeGoalRef} onFocus={() => focus(homeGoalRef)}/>
                                        <label htmlFor="HomeGoal">Antal mål hemma</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="text" name="Away" className="mb-2 form-control" id="antalDeltagare" ref={awayRef} onFocus={() => focus(awayRef)}/>
                                        <label htmlFor="antalDeltagare">Borta</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="number" name="AwayGoal" className="form-control" id="antalMatcher" min="0" ref={awayGoalRef}  onFocus={() => focus(awayGoalRef)}/>
                                        <label htmlFor="AwayGoal">Antal mål borta</label>
                                    </div> 
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn buttonCloseColor" data-bs-dismiss="modal">Close</button>
                        {/*Knappen som returnerar den skapade funktionen till navbar modulen*/}
                        <button type="button" className="btn buttonColor" onClick={() => Match()}>Add resultat</button>
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