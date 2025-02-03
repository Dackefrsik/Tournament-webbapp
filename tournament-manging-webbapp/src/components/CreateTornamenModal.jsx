import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

//#region Klass med en konstruktor som skapar ett objekt av turneringen 
class tournament {

    constructor(antalDeltagare, antalMatcher) {
        this.antalDeltagare = antalDeltagare,
        this.antalMatcher = antalMatcher
    }

}
//#endregion

/**
 * Funktion som skapar en modal med funktionalitete
 * Den tar emot funktionen returnTournament för att kunna
 * returnera den nya funktionen
 */
function CreateTornamentModalBody({ returnTournament }) {

    //#region useRefs
    //useRef som tar emot värden för antalet spelare och matcher
    const antalSpelareRef = useRef(null);
    const antalMatcherRef = useRef(null);
    const buttonSubmit = useRef(null);
    const modalRef = useRef(null);
    //#endregion
 
    //#region useStates
    const[modal, setModal] = useState("");
    //#endregion

    //#region Useeffect som låter oss ta ner modalen
    useEffect(() => {
        if(modalRef.current) {
            // Initialisera modal-fönstret
            setModal(new window.bootstrap.Modal(modalRef.current));
        }
    }, []);
    //#endregion

    //#region funktion som sparas i createTornamennt 
    const createTornement = () => {

        //Tar emot värden för spelare och matcher
        const antalSpelare = Number(antalSpelareRef.current.value);
        const antalMatcher = Number(antalMatcherRef.current.value);

        if(antalSpelare && antalSpelare != null && antalSpelare > 1){
            if(antalMatcher && antalMatcher != null && antalMatcher > 0){
                //Skapar en ny funktion utifrån konstrunktorn i klassen tournament
                let newTournament = new tournament(antalSpelare, antalMatcher);

                //Returnerar den nya turneringen
                returnTournament(newTournament);

                //Gömmer modalen
                modal.hide();
                
            }
            //Sätter error på antal matcher
            else{
                antalMatcherRef.current.style.border = "3px solid red";
            }
        }
        //Sätter error på antal spelare
        else{
            antalSpelareRef.current.style.border = "3px solid red";
        }
    }
    //#endregion

    //#region funktion som körs vid fokus på input fält 
    function fokus(ref){
        ref.current.style.border = "";
    }
    //#endregion

    return (
        <div className="modal fade" id="ModalCreateTournament" tabIndex="-1" aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Create tornament</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <form action="" className="form-group">
                                <div className="d-flex flex-column">
                                    <div className="form-floating">
                                        <input type="number" name="antalDeltagare" className="mb-2 form-control" id="antalDeltagare" placeholder="Antal deltagare" min="2" ref={antalSpelareRef} onFocus={() => fokus(antalSpelareRef)}/>
                                        <label htmlFor="antalDeltagare">Antal deltagare</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="number" name="antalMatcher" className="form-control" id="antalMatcher" placeholder="Antal matcher" min="1" ref={antalMatcherRef} onFocus={() => fokus(antalMatcherRef)}/>
                                        <label htmlFor="antalMatcher">Antal Matcher</label>
                                    </div> 
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn buttonCloseColor" data-bs-dismiss="modal">Close</button>
                        {/*Knappen som returnerar den skapade funktionen till navbar modulen*/}
                        <button type="button" className="btn buttonColor"  onClick={() => createTornement()} ref={buttonSubmit}>Create tournament</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

//Validerar mina props
CreateTornamentModalBody.propTypes = {
    returnTournament : PropTypes.func.isRequired
}

export default CreateTornamentModalBody;