import PropTypes from "prop-types";
import { useRef, useState } from "react";

/*Funktion som tar emot funktion för att ändra synlighet 
och id vär at veta vilken div vars synlighet ska ändras*/
function AddPlayerForm({ handleVisibility, buttonID, returnPlayer, players }) {

    //Sätter en referens på ett element istället 
    // för att använda quewrySelect
    const inputNameRef = useRef(null);
    const buttonRef = useRef(null);

    const [errorTextSpelare, setErrorTextSpelare] = useState("");

    //#region Funktion för att kolla om angiven spelare existerar för att undvika duplicerade namn
    function playerExist(playerName) {
        return players.some(player => player.name == playerName);
    }
    //#endregion

    //#region Funktion som hanterar addering av spelare
    const handleClick = (event) => {
        event.preventDefault();

        //Skickar spelarens namn till baka till main
        //Tar bort div:n med formuläret i om det har text i sig
        if (inputNameRef.current && inputNameRef.current.value.trim() !== "") {

            if (inputNameRef.current.value.trim().length >= 3) {
                //Kollar om spelaren redan är registrerad
                if (!playerExist(inputNameRef.current.value.trim())) {
                    returnPlayer(inputNameRef.current.value);
                    handleVisibility(buttonID);
                }
                //Felmedelande om angiven spelare redan existerar
                else {
                    setErrorTextSpelare("Spelaren är redan angiven");
                }
            }
            else{
                setErrorTextSpelare("Namn måste vara minst tre tecken!");
            }


        }
        //Felmedelande om spelarnamn är tomt
        else {
            setErrorTextSpelare("Måste ange spelare vid namn!");
        }

        //.blur tar bort fokus på knappen
        buttonRef.current.blur();
    }
    //#endregion

    return (
        <form action="" className="form-group " >
            <div className="d-flex flex-column">
                <div className="row">
                    {/*Skriver ut errortext*/}
                    <p className="p-3 textError"> {errorTextSpelare} </p>
                </div>
                <div className="row">
                    <div className="col-9">

                        <div className="form-floating">
                            <input type="text" name="Name" className="mb-2 form-control" id="Name" placeholder="Namm" ref={inputNameRef} />
                            <label htmlFor="Name">Namn</label>
                        </div>
                    </div>
                    <div className="col-3 d-flex">
                        <input type="submit" value="Add" className="mb-2 form-control btn buttonColor vh-50" onClick={handleClick} ref={buttonRef} />
                    </div>
                </div>
            </div>
        </form>
    )
}

//Validerar mina props
AddPlayerForm.propTypes = {
    handleVisibility: PropTypes.func.isRequired,
    buttonID: PropTypes.number.isRequired,
    returnPlayer: PropTypes.func.isRequired,
    players: PropTypes.array.isRequired,
}

export default AddPlayerForm;