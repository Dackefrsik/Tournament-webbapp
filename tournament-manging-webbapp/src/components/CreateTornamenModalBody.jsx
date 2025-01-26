import { useRef } from "react";

function CreateTornamentModalBody({returnTournament}){
    console.log("area hidden");

    class tournament {

        constructor(antalDeltagare, antalMatcher){
            this.antalDeltagare = antalDeltagare,
            this.antalMatcher = antalMatcher
        }
       
    } 

    const antalSpelareRef = useRef(null);
    const antalMatcherRef = useRef(null);

    const createTornement = () =>{

        const antalSpelare = antalSpelareRef.current.value;
        const antalMatcher = antalMatcherRef.current.value;

        console.log(antalSpelare);
        console.log(antalMatcher);

        console.log("Antal spelare: " + antalSpelare);
        console.log("Antal matcher´: " + antalMatcher);

        let newTournament = new tournament(antalSpelare, antalMatcher);

        console.log("Created new tornament: " + newTournament);

        return newTournament;

    }

    return(
        <div className="modal fade" id="ModalCreateTournament" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header bg-primary">
                    <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Create tornament</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div>
                        <form action="" className="form-group">
                            <div className="d-flex flex-column">
                                <div className="form-floating">
                                    <input type="number" name="antalDeltagare" className="mb-2 form-control" id="antalDeltagare" placeholder="Antal deltagare" min="2" ref={antalSpelareRef}/>
                                    <label htmlFor="antalDeltagare">Antal deltagare</label>                   
                                </div>
                                <div className="form-floating">
                                    <input type="number" name="antalMatcher" className="form-control" id="antalMatcher" placeholder="Antal matcher" min="1" ref={antalMatcherRef}/>
                                    <label htmlFor="antalMatcher">Antal Matcher</label>
                                </div>
                            </div>                
                        </form>  
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => returnTournament(createTornement)}>Create tournament</button>
                </div>
                </div>
            </div>
        </div>  
    )
}

export default CreateTornamentModalBody;