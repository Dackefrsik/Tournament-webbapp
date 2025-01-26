import AddPlayerForm from "./AddPlayerForm";

function AddPlayer(tornament){

    let Elemets =[];

    for(let i = 0; i < tornament; i++){
        Elemets.push(
            <div className="border p-2 m-1 rounded-3">
            <h3 className="mt-2 ms-2">
            Player {i + 1}
            </h3>
            <AddPlayerForm/>
            </div>
        )
    }

    return(
        <>
            {Elemets}
        </>
    )
}

export default AddPlayer;