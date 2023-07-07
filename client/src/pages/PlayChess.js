import { Chessboard } from 'react-chessboard'
import './chess.css'
import {Chess} from 'chess.js'
import { useState } from 'react'
import MoveChoices from '../components/moveChoices'
function PlayChess(currentColor){
    const [game, setGame] = useState(new Chess())
    const [setPossibleMoveWhite] = useState(null)
    const [possibleMoveBlack, setPossibleMoveBlack] = useState("a6")
    const [moveVotedFor, setMoveVotedFor] = useState(null)

    const handleSubmit = (event) => {
        event.preventDefault();
        
        makeMoveBlack(moveVotedFor)
      }
    //game
    function safeGameMutate(modify){
        setGame((g)=>{
            const update = {...g}
            modify(update)
            return update
        })
    }
    function makeMoveBlack(inputMove){
        setPossibleMoveBlack(game.moves())
        if(game.game_over() || game.in_threefold_repetition() || game.in_draw() || possibleMoveBlack.length === 0) return;
        if(!(game.moves()).includes(inputMove)) return false
        safeGameMutate((game)=>{
            game.move(inputMove)
        })
    }

    function onDrop(source,target){
        let move=null
        let possibleMoveWhite = game.moves()
        safeGameMutate((game)=>{
            move = game.move({
                from:source,
                to: target,
                promotion: 'q'
            })
        })
        if(move==null) return false

        setTimeout(makeMoveBlack, 200)
        return true
    }

    return(  
        
        <div className="container">
            
                <div className='game row'>
                    <div className='moveChoices col-md-3 order-0' >
                        <form onSubmit={handleSubmit}>
                            <MoveChoices 
                                chess={game} 
                                color={(currentColor.toString()).charAt(0)}
                                setMoveVotedFor={setMoveVotedFor}
                            />                   
                        </form>
                    </div>
                    <div className='chessBoard col-md-9 order-1'>
                        <Chessboard 
                            position={game.fen()}
                            onPieceDrop = {onDrop}
                            boardOrientation={currentColor}
                        />
                    </div>
                </div>
            
        </div>
    )
}
export default PlayChess