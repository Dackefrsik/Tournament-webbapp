import PropTypes from "prop-types"
import { useEffect, useState, useRef } from "react"

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

    getHomeGoal() {
        return this.homeGoal;
    }

    getAway() {
        return this.away;
    }

    getAwayGoal() {
        return this.awayGoal;
    }
}
//#endregion

function CreateAddResultModal({ setPlayers, players, matches, setMatches, tournament}) {

    //#region UseRefs
    //useRef för att kunna hämta värden från formuläret 
    const homeRef = useRef("");
    const homeGoalRef = useRef("");
    const awayRef = useRef("");
    const awayGoalRef = useRef("");
    const charedPoint = useRef("");

    //Usref för modalen 
    const modalRef = useRef("");
    //#endregion

    //#region Usestates
    //Usestate för matcher
    //const [matches, setMatch] = useState([]);

    //Usestate för att gömma modalen 
    const [modal, setModal] = useState("");

    //Errortext match
    const [errorText, setErrorText] = useState("");

    const [errorTextHome, setErrorTextHome] = useState("");

    const [errorTextHomeGoal, setErrorTextHomeGoal] = useState("");

    const [errorTextAway, setErrorTextAway] = useState("");

    const [errorTextAwayGoal, setErrorTextAwayGoal] = useState("");

    //#endregion

    //#region Useeffect som används för att komma åt referensen av modalens nuvarande instans 
    useEffect(() => {
        if (modalRef.current) {
            //Inisialiserar en ny modal med den nya värdena 
            setModal(new window.bootstrap.Modal(modalRef.current));


            modalRef.current.addEventListener("shown.bs.modal", () => {
                if(charedPoint.current){
                    charedPoint.current.checked = false;
                }

            })
        }
    }, []);
    //#endregion

    //#region Funktion för att kolla om angiven spelare existerar
    function playerExist(playerName) {
        return players.some(player => player.name == playerName);
    }
    //#endregion

    //#region Funktion för att registrera matcher
    function Match() {
        //Kolar om det angivits ett namn för hemspelaren
        if (homeRef.current && homeRef.current.value.trim() != "") {

            console.log(charedPoint.current.checked);

            //Kollar om den angivna hemmaspelaren är en faktisk hemmaspelare
            if (playerExist(homeRef.current.value.trim())) {

                //Kollar om det angivits mål för hemalaget
                let homeGoal = Number(homeGoalRef.current.value);
                if (homeGoal != null && !isNaN(homeGoal) && homeGoal > -1) {

                    //Kollar om det har angivits ett namn för bortaspelaren
                    if (awayRef.current && awayRef.current.value.trim() != "") {

                        //Kollar om den angivna bortaspelaren är en faktisk hemmaspelare
                        if (playerExist(awayRef.current.value.trim())) {

                            //Kollar om det har angivits mål för bortalaget
                            let awayGoal = Number(awayGoalRef.current.value);
                            if (awayGoal != null && !isNaN(awayGoal) && awayGoal > -1) {
                                //Variabel för att kolla om vald match har spelats eller ej
                                let matchCheck = true;

                                //Testloop som loggar i consolen om matchen redan har spelats
                                matches.forEach(singelMatch => {
                                    if (singelMatch.getHome() == homeRef.current.value.trim() && singelMatch.getAway() == awayRef.current.value.trim()) {
                                        clearError();
                                        setErrorText("Matchen har redan spelats!");
                                        matchCheck = false;
                                    }
                                })

                                //Variabel för ny match 
                                let newMatch;

                                // Kollar om matchen inte har spelats
                                if (matchCheck) {

                                    //Skapar en ny match
                                    newMatch = new match(homeRef.current.value, awayRef.current.value, homeGoalRef.current.value, awayGoalRef.current.value);

                                    //Kallar på funktion för att tömma formuläret
                                    clearForm();

                                    //Setter matchen genom att kopiera de tidigare och lägga till den nya
                                    setMatches(prevMatches => [...prevMatches, newMatch]);

                                    //Går igenom alla splare
                                    setPlayers(players => players.map(player => {

                                        //Checkar om spelaren var hemma
                                        if (player.name == newMatch.getHome()) {

                                            //Kollar om det var seger
                                            if (newMatch.homeGoal > newMatch.awayGoal) {
                                                modal.hide();

                                                if(charedPoint.current.checked){
                                                    return player.incrementPointSuddenWin().addGoalDif(newMatch.homeGoal - newMatch.awayGoal).addMatch(newMatch);
 
                                                }
                                                else{
                                                    return player.incrementPoint().addGoalDif(newMatch.homeGoal - newMatch.awayGoal).addMatch(newMatch);

                                                }
                                            }
                                            //Kollar om det var oavgjort
                                            else if (newMatch.homeGoal == newMatch.awayGoal) {
                                                modal.hide();
                                                return player.incrementPointDraw().addMatch(newMatch);
                                            }
                                            //Förlust
                                            else {
                                                modal.hide();
                                                if(charedPoint.current.checked){
                                                    return player.incrementPointSuddenDefete().reduceGoalDif(newMatch.awayGoal - newMatch.homeGoal).addMatch(newMatch);

                                                }
                                                else{
                                                    return player.reduceGoalDif(newMatch.awayGoal - newMatch.homeGoal).addMatch(newMatch);
                                                }
                                            }
                                        }
                                        //Kollar om spearen var borta
                                        else if (player.name == newMatch.getAway()) {
                                            //Kollar om det var förlust
                                            if (newMatch.homeGoal > newMatch.awayGoal) {
                                                modal.hide();

                                                if(charedPoint.current.checked){
                                                    return player.incrementPointSuddenDefete().reduceGoalDif(newMatch.homeGoal - newMatch.awayGoal).addMatch(newMatch);
                                                }
                                                else{
                                                    return player.reduceGoalDif(newMatch.homeGoal - newMatch.awayGoal).addMatch(newMatch);
                                                }
                                            }
                                            //Kollar om det var oavgjort
                                            else if (newMatch.homeGoal == newMatch.awayGoal) {
                                                modal.hide();
                                                return player.incrementPointDraw().addMatch(newMatch);
                                            }
                                            //Seger
                                            else {
                                                modal.hide();
                                                
                                                if(charedPoint.current.checked){
                                                    return player.incrementPointSuddenWin().addGoalDif(newMatch.awayGoal - newMatch.homeGoal).addMatch(newMatch);
                                                }
                                                else{
                                                    return player.incrementPoint().addGoalDif(newMatch.awayGoal - newMatch.homeGoal).addMatch(newMatch);
                                                }
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
                            else {
                                clearError();
                                setErrorTextAwayGoal("Bortamål moste anges och vara minst 0!");
                            }
                        }
                        //Visar fel för bortnamn
                        else {
                            clearError();
                            setErrorTextAway("Spelaren delatar inte!");
                        }
                    }
                    //Visar fel för felaktigt angiven bortasspelare
                    else{
                        clearError();
                        setErrorTextAway("Bortaspelare måste anges!");

                    }
                }

                //Visar fel för hemmamål
                else {
                    clearError();
                    setErrorTextHomeGoal("Hemmamål måste anges och vara minst 0!");
                }
            }
            //Visar fel för felaktigt angiven hemmaspelare
            else {
                clearError();
                setErrorTextHome("Spelaren deltar inte!");
            }



        }
        else {
            setErrorTextHome("Måste ange en spelare");
        }
    }
    //#endregion

    //#region Funtkion för att städa formuläret
    function clearForm() {

        clearError();

        //Tömmer inputfälten i modalen 
        homeRef.current.value = "";
        awayRef.current.value = "";
        homeGoalRef.current.value = "";
        awayGoalRef.current.value = "";

        modal.hide();
    }

    function clearError() {
        //Tar bort errotexten
        setErrorText("");
        setErrorTextAway("");
        setErrorTextAwayGoal("");
        setErrorTextHome("");
        setErrorTextHomeGoal("");
    }
    //#endregion

    return (
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
                                    {/*Skriver ut errortext*/}
                                    <p className="textError"> {errorTextHome} </p>
                                    <div className="form-floating">
                                        <input type="text" name="Home" className="mb-2 form-control" id="antalDeltagare" ref={homeRef} />
                                        <label htmlFor="Home">Hemma</label>
                                    </div>
                                    {/*Skriver ut errortext*/}
                                    <p className="textError"> {errorTextHomeGoal} </p>
                                    <div className="form-floating">
                                        <input type="number" name="HomeGoal" className="mb-2 form-control" id="antalMatcher" min="0" ref={homeGoalRef} />
                                        <label htmlFor="HomeGoal">Antal mål hemma</label>
                                    </div>
                                    {/*Skriver ut errortext*/}
                                    <p className="textError"> {errorTextAway} </p>
                                    <div className="form-floating">
                                        <input type="text" name="Away" className="mb-2 form-control" id="antalDeltagare" ref={awayRef} />
                                        <label htmlFor="antalDeltagare">Borta</label>
                                    </div>
                                    {/*Skriver ut errortext*/}
                                    <p className="textError"> {errorTextAwayGoal} </p>
                                    <div className="form-floating">
                                        <input type="number" name="AwayGoal" className="form-control" id="antalMatcher" min="0" ref={awayGoalRef} />
                                        <label htmlFor="AwayGoal">Antal mål borta</label>
                                    </div>
                                    
                                    {(tournament != null && (tournament.sport == "Ishockey" || tournament.sport == "Innebandy")) && 
                                    <div className="btn-toolbar mt-3" role="toolbar" aria-label="Basic checkbox toggle button group">
                                        <input type="checkbox" name="point" id="Sudden" className="btn-check" autoComplete="off" ref={charedPoint} value={false}/>
                                        <label htmlFor="Sudden" className="btn btn-outline-primary">Sudden death/ penalties</label>
                                    </div>}

                                </div>
                            </form>
                        </div>
                        {/*Skriver ut errortext*/}
                        <p className="textError"> {errorText} </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn buttonCloseColor" data-bs-dismiss="modal" onClick={() => clearForm()}>Close</button>
                        {/*Knappen som returnerar den skapade funktionen till navbar modulen*/}
                        <button type="button" className="btn buttonColor" onClick={() => Match()}>Add resultat</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

//Validerar mina props
CreateAddResultModal.propTypes = {
    setPlayers : PropTypes.func.isRequired,
    players : PropTypes.array.isRequired,
    matches : PropTypes.array.isRequired,
    setMatches : PropTypes.func.isRequired,
    tournament : PropTypes.object
}

export default CreateAddResultModal;