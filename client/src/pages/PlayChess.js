import { Chessboard } from 'react-chessboard'
import './chess.css'
import {Chess} from 'chess.js'
import { useState, useEffect } from 'react'
import MoveChoices from '../components/moveChoices'
import { useAuthContext } from '../hooks/useAuthContext'
// import { move } from '../../../server/routes/communalChess'


function PlayChess(currentColor){
    const [game, setGame] = useState(new Chess())
    const [possibleMoveBlack, setPossibleMoveBlack] = useState("a6")
    const [moveVotedFor, setMoveVotedFor] = useState(null)
    const [response, setResponse] = useState(null)
    const {user} = useAuthContext()

    //! TODO: get patch to use BODY instead of PARAMS
    
    const patchUser = async (moveVotedFor)=>{
        
        const res = await fetch(`/api/communalChess/${user.userID}/${moveVotedFor}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            
        })

        const json = await res.json()
        console.log(json)
        if(res.ok) return("patch success")
        else return("patch failed")

    }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        
        patchUser(moveVotedFor)
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

    return([  
            
            <form className='moveChoices col-md-2 order-0' onSubmit={handleSubmit}>
                <MoveChoices 
                    chess={game} 
                    color={(currentColor.toString()).charAt(0)}
                    setMoveVotedFor={setMoveVotedFor}
                />                   
            </form>,
            <div className='chessBoard col-md-4 offset-md-1 order-1'>
                <Chessboard 
                    position={game.fen()}
                    onPieceDrop = {onDrop}
                    boardOrientation={currentColor}
                />
            </div>
    ]
    )
}
export default PlayChess