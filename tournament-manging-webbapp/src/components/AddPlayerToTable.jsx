import PropTypes from "prop-types"
//Funktion som reurenerar rader för en spelare
//Tar emot index och namn 
function AddPlayerToTable({ i, player }) {

    return (

        <tr key={i} className="">
            <td className="text-center ">{i + 1}</td>
            <td className="text-center ">{player.getName()}</td>
            <td className="text-center ">{player.getPoints()} pt</td>
            <td className="text-center ">{player.getGames()}</td>
            <td className="text-center ">{player.getGoalDif()}</td>

        </tr>

    )
}

//Validerar mina props
AddPlayerToTable.propTypes = {
    i : PropTypes.number.isRequired,
    player : PropTypes.object.isRequired
}

export default AddPlayerToTable