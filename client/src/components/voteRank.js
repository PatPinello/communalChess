import {useState, useEffect} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const VoteRank = ({ user }) => {
    const [users, setUsers] = useState(null)

    
    //! TODO: get all values of player's votes
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch(`/api/communalChess/`, {
                type: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
                body: {
                    
                }
                
            })
            
            const json = await res.json()
            if (res.ok)
            {
                setUsers(json)
            } 
            
        }
        
        if(user) fetchUsers()
    }, [user])

    return(
        <div className='col-md-2 order-2'>
            <h1>HELLO</h1>
        </div>
    )
}
export default VoteRank