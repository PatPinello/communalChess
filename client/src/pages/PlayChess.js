import { Chessboard } from 'react-chessboard'
import './chess.css'
import {Chess} from 'chess.js'
import { useState } from 'react'
import MoveChoices from '../components/moveChoices'
import { vote } from '../components/moveChoices'

function PlayChess(currentColor){
    const [game, setGame] = useState(new Chess())
    const [possibleMoveWhite, setPossibleMoveWhite] = useState(null)
    const [possibleMoveBlack, setPossibleMoveBlack] = useState(null)
    //game
    function safeGameMutate(modify){
        setGame((g)=>{
            const update = {...g}
            modify(update)
            return update
        })
    }
    function makeMoveBlack(){
        setPossibleMoveBlack(game.moves())
        
        if(game.game_over() || game.in_draw() || possibleMoveBlack.length === 0) return;

        const randomIndex = Math.floor(Math.random() * possibleMoveBlack.length)

        safeGameMutate((game)=>{
            game.move(possibleMoveBlack[randomIndex])
        })
    }

    function onDrop(source,target){
        let move=null
        
        setPossibleMoveWhite(game.moves())
        

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
        <div className='game'>
            
            <div className='moveChoices'>
                <MoveChoices 
                    chess={game} 
                    color={(currentColor.toString()).charAt(0)}
                />     
            </div>
            <div className='chessBoard'>
                
                <Chessboard 
                    position={game.fen()}
                    onPieceDrop = {onDrop}
                    boardOrientation={currentColor}
                />
            </div>
        </div>
        
    )
    
}
export default PlayChess

