import AddPlayerForm from "./AddPlayerForm";

//Tar emot den skapade turneringen från App-jsx
function AddPlayer({tornament}){

    //Vektor för att hålla i element för att lägga
    //till en spelare med
    let Elemets =[];

    //Loop för att bygga ett "kort" för varje 
    //delatagare som ska läggas till
    for(let i = 0; i < tornament; i++){
        
        //Puschar det till vektorn Elements 
        Elemets.push(
            <div className="border p-2 m-1 rounded-3">
                <h3 className="mt-2 ms-2">
                    Player {i + 1}
                </h3>
                {/*Kallar på komponenten som visar ett 
                formulär för att lägga till delatagare men namn*/}
                <AddPlayerForm/>
            </div>
        )
    }

    return(
        <>
            {/*Skriver ut elementen i vektorn*/}
            {Elemets}
        </>
    )
}

export default AddPlayer;