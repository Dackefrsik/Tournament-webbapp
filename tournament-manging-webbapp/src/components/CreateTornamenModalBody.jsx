

function CreateTornamentModalBody(){

    return(
        <div>
            <form action="" className="form-group">
                <div className="d-flex flex-column">
                    <div className="form-floating">
                        <input type="number" name="antalDeltagare" className="mb-2 form-control" id="antalDeltagare" placeholder="Antal deltagare" min="2" />
                        <label htmlFor="antalDeltagare">Antal deltagare</label>                   
                    </div>
                    <div className="form-floating">
                    <input type="number" name="antalMatcher" className="form-control" id="antalMatcher " placeholder="Antal matcher" min="1" />
                        <label htmlFor="antalMatcher">Antal Matcher</label>
                    </div>
                </div>                
            </form>
        </div>    
    )
}

export default CreateTornamentModalBody;