
import PropTypes from "prop-types";
import { useRef } from "react";
/*Funktion som tar emot funktion för att ändra synlighet 
och id vär at veta vilken div vars synlighet ska ändras*/
function AddPlayerForm({ handleVisibility, buttonID, returnPlayer }) {

    //Sätter en referens på ett element istället 
    // för att använda quewrySelect
    const inputNameRef = useRef(null);

    //Funktion som hanterar klickevent på knappen för att
    //lägga till spelare
    const handleClick = (event) => {
        event.preventDefault();

        //Skickar spelarens namn till baka till main
        //Tar bort div:n med formuläret i om det har text i sig
        if (inputNameRef.current && inputNameRef.current.value.trim() !== "") {
            returnPlayer(inputNameRef.current.value)
            handleVisibility(buttonID);
        }
        else {
            //Ger input rutan en röd ram om den är tom
            inputNameRef.current.style.border = "3px solid red";
        }
    }

    //Funktion som tar bort den röda ramen på input rutan
    function inputFocus() {
        inputNameRef.current.style.border = "";
    }

    return (
        <form action="" className="form-group " >
            <div className="d-flex flex-column">
                <div className="row">
                    <div className="col-9">
                        <div className="form-floating">
                            <input type="text" name="Name" className="mb-2 form-control" id="Name" placeholder="Namm" ref={inputNameRef} onFocus={() => inputFocus()} />
                            <label htmlFor="Name">Namn</label>
                        </div>
                    </div>
                    <div className="col-3 d-flex">
                        <input type="submit" value="Add" className="mb-2 form-control btn buttonColor btn-lg p-2" onClick={handleClick} />
                    </div>
                </div>
            </div>
        </form>
    )
}

//Validerar mina props
AddPlayerForm.propTypes = {
    handleVisibility : PropTypes.func.isRequired, 
    buttonID : PropTypes.number.isRequired, 
    returnPlayer : PropTypes.func.isRequired
}

export default AddPlayerForm;