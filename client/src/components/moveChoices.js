import { Chess } from "chess.js"
import '../pages/chess.css'
import { useState } from "react"

const MoveChoices = ({chess , color}) => {
    const [open, setOpen] = useState(false)
        const handleOpen = () => {
            setOpen(!open)
        }
        
    if(chess.turn()==color)
    {
        const moves = (chess.moves()).map((move)=>
        <li className="menu-item">
            <button onClick={() => {let vote=move}}>
                {move}
            </button>
        </li>
        )
        return(
            
            <div className="dropdown">
                <button onClick={handleOpen}>Moves</button>
                {open ? (<ul className="menu">
                    {moves}
                </ul>):null}
            </div>
        )
    }
    else return(
        <h1>It is not your turn yet!</h1>
    )
}

export default MoveChoices
export let vote