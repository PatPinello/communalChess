import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import UserDetails from '../components/userDetails'
import { Chessboard } from 'react-chessboard'
import './chess.css'
import {Chess} from 'chess.js'

const Home = () => {
    const [users, setUsers] = useState(null)
    const {user} = useAuthContext()
    const [game, setGame] = useState(new Chess())

    //game
    function safeGameMutate(modify){
        setGame((g)=>{
            const update = {...g}
            modify(update)
            return update
        })
    }
    



    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('/api/communalChess', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await res.json()
            if (res.ok) setUsers(json)
        }
        if(user) fetchUsers()
    }, [user])

    return(
        <div className="Home">
            <div className='users'>
                {users && users.map((user) => (
                    <UserDetails key={user._id} user={user}/>
                ))}
            </div>
            <div className="chessBoard">
                <Chessboard/>
            </div>
            
        </div>
    )
}

export default Home