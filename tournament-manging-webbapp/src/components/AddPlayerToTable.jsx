
//Funktion som reurenerar rader för en spelare
//Tar emot index och namn 
function AddPlayerToTable({i, name}){

    return(

        <tr key={i} className="">
            <td className="text-center ">{i + 1}</td>
            <td className="text-center ">{name}</td>
            <td className="text-center ">O pt</td>
            <td className="text-center ">0</td>
            <td className="text-center ">0</td>

        </tr>

    )
}

export default AddPlayerToTable