import AddPlayerForm from "./AddPlayerForm";
import PropTypes from "prop-types";

//Tar emot den skapade turneringen från App-jsx
function AddPlayer({ tornament, returnPlayer, players }) {

    //Vektor för att hålla i element för att lägga
    //till en spelare med
    let Elemets = [];

    //#region Funktion som hanterar synlighet av formuläret för att addera spelare
    function handleVisibility(i) {
        const div = document.querySelectorAll(".addPlayer");
        div[i].style.display = "none";
    }
    //#endregion

    //#region Loop för att bygga ett "kort" för varje delatagare som ska läggas till
    for (let i = 0; i < tornament; i++) {

        //Puschar det till vektorn Elements 
        Elemets.push(
            <div className="addPlayer p-2 m-1 rounded-3 addPlayerCard">
                <h3 className="mt-2 ms-2" >
                    Player {i + 1}
                </h3>
                {/*Kallar på komponenten som visar ett 
                formulär för att lägga till delatagare med namn*/}
                <AddPlayerForm handleVisibility={handleVisibility} buttonID={i} returnPlayer={returnPlayer} players={players} />
            </div>
        )
    }
    //#endregion

    return (
        <>
            {/*Skriver ut elementen i vektorn*/}
            {Elemets}
        </>
    )
}

//Validerar mina props
AddPlayer.propTypes = {
    tornament : PropTypes.number.isRequired,
    returnPlayer : PropTypes.func.isRequired,
    players : PropTypes.func.isRequired
}

export default AddPlayer;