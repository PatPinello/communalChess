import '../pages/chess.css'
import { useState } from "react"
// import { Popup } from "reactjs-popup"
import SelectSearch from 'react-select-search'
import './moves.css'


const MoveChoices = ({chess , color, setMoveVotedFor}) => {
    const [searchText, setSearchText] = useState("Vote for your move")
    
    const handleInputChange = (inputVal) => {
        
        setMoveVotedFor(inputVal)
        setSearchText(inputVal.toString())
        
    }
        
    if(chess.turn()===color)
    {
        const possibleMoves=chess.moves()
        let moves = []
        for(let i=0;i<possibleMoves.length;i++)
            moves[i] = { name: possibleMoves[i], value: possibleMoves[i]}
        
        return( 
            <SelectSearch 
                options={moves} 
                onChange={handleInputChange} 
                className="select-search"
                autoFocus='true'                 
                search={true} 
                placeholder= {searchText}
            />
        )
    }
    else return(
        <h1>It's {chess.turn()==='b' ? "Black's":"White's"} turn!</h1>
    )
}

export default MoveChoices
