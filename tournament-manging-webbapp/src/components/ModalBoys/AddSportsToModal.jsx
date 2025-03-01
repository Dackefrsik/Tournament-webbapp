


function AddSportsToModal(){

    //#region Funktionalitet för att skriva ut olika sporter

    let sports = ["Fotboll", "Ishockey", "Handboll", "Innebandy", "Basket", "Rugby"];

    let elemnts = [];


    sports.forEach(sport => {
    
        elemnts.push(<option key={sports.indexOf(sport)} value={sport}> {sport} </option>);
    });


    //#endregion

    return (
        <>
            {elemnts}
        </>
    )
}

export default AddSportsToModal;