import PropTypes from "prop-types"
import { useState } from "react";
//Funktion som reurenerar rader för en spelare
//Tar emot index och namn 
function AddPlayerToTable({ i, player }) {

    //#region useStates för matcher och toggle 
    const[matches, setMatches] = useState([]);

    const[toggle, setToggle] = useState(true);
    //#endregion

    //#region funktion för att visa alla spelade matcher
    function clickTable(){

        //Toggeln kollar om vi ska visa eller gömma matcherna som spelats
        if(toggle){
            const newMatches = [];

            //Bygger upp en rad för varje match
            for(let i = 0; i < player.getMatches().length; i++){

                //Kontroll ifall det är vinst eller förlust för att göra det tydligare för anväändaren 
                let color = "";
                if((player.getMatches()[i].getHome() == player.getName() && player.getMatches()[i].getHomeGoal() > player.getMatches()[i].getAwayGoal()) || player.getMatches()[i].getAway() == player.getName() && player.getMatches()[i].getAwayGoal() > player.getMatches()[i].getHomeGoal()){
                    
                    //Grön vid vinst
                    color = "#00FF00";
                }
                else{

                    //Röd vid förlust 
                    color = "#FF0000";
                }
                const addMatch = 
                    <tr className="matchRowColor" key={i}>
                        <td className="text-center matchRowColor">{player.getMatches()[i].getHome()}</td>
                        <td className="text-center matchRowColor">{player.getMatches()[i].getHomeGoal()}</td>
                        <td className="text-center" style={{backgroundColor: color}}>VS</td>
                        <td className="text-center matchRowColor">{player.getMatches()[i].getAwayGoal()}</td>
                        <td className="text-center matchRowColor">{player.getMatches()[i].getAway()}</td>
                    </tr>;
                
                newMatches.push(addMatch);
            }

            //Kopierar tidigare matcher och sparar undan dem så att alla kan visas
            setMatches([...matches, newMatches ])
            setToggle(false);
        }
        else{
            setToggle(true);

            //Tar bort matcherna
            setMatches([]);
        }   
    }
    //#endregion

    return (
        <>
            <tr key={i} className="" onClick={() => clickTable(i)}>
                <td className="text-center ">{i + 1}</td>
                <td className="text-center ">{player.getName()}</td>
                <td className="text-center ">{player.getPoints()} pt</td>
                <td className="text-center ">{player.getMatches().length}</td>
                <td className="text-center ">{player.getGoalDif()}</td>    
            </tr>
            {matches}
        </>

    )
}

//Validerar mina props
AddPlayerToTable.propTypes = {
    i : PropTypes.number.isRequired,
    player : PropTypes.object.isRequired
}

export default AddPlayerToTable