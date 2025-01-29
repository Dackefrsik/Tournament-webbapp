import AddPlayerToTable from "./AddPlayerToTable"

//Funktion för komponent som tar emot alla spelare
//och returnerar en tabell över turneringen
function Table({players}) {

    //Vektor som håller i alla raderna för
    //respektive spelare
    let playerRows = [];

    //for-loop som går igenom alla spelare och skapar rader för dem
    for(let i = 0; i < players.length; i++){

        //Skapar en ny rad utifrån komponenten AddPlayerTpTable
        let playerRow = <AddPlayerToTable i={i} name={players[i]}/>

        //Pushar raden till playerRows
        playerRows.push(playerRow);

    }

    return(
        <div className="container d-flex justify-content-center mt-3">
            <table className="table table-bordered" >
                <thead>
                    <tr>
                        <th scope="col" className="text-center w-20" >Place</th>
                        <th scope="col" className="text-center w-5">Name</th>
                        <th scope="col" className="text-center w-20">Points</th>
                        <th scope="col" className="text-center w-20">GP</th>
                        <th scope="col" className="text-center w-20">GD +/-</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {/*Skriver ut raderna i playerRows*/}
                    {playerRows}
                </tbody>
            </table>
        </div>
    )
}

export default Table