//Komponent som adderar sporter till select formuläret i modalen som skapar en ny turnering 
function AddSportsToModal(){

    //#region Funktionalitet för att skriva ut olika sporter

    //Vektor som håller i sporterna
    let sports = ["Fotboll", "Ishockey", "Handboll", "Innebandy", "Rugby"];

    //Vektor för de option element som ska skrivas ut i modalens select
    let elemnts = [];


    //Går igenom alla sporter och skapar ett option element
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