import { Chessboard } from 'react-chessboard'
import './chess.css'
import {Chess} from 'chess.js'
import { useState } from 'react'


function PlayChess(){
    const [game, setGame] = useState(new Chess())

    //game
    function safeGameMutate(modify){
        setGame((g)=>{
            const update = {...g}
            modify(update)
            return update
        })
    }
    function makeMoveBlack(){
        let possibleMoveBlack = game.moves()
        
        if(game.game_over() || game.in_draw() || possibleMoveBlack.length === 0) return;

        const randomIndex = Math.floor(Math.random() * possibleMoveBlack.length)

        safeGameMutate((game)=>{
            game.move(possibleMoveBlack[randomIndex])
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
        <div className='chessBoard'>
            <Chessboard 
                position={game.fen()}
                onPieceDrop = {onDrop}
            />
        </div>
        
    )
}
export default PlayChess