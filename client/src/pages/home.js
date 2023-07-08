import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import UserDetails from '../components/userDetails'
import PlayChess from './PlayChess'
import VoteRank from '../components/voteRank'



const Home = () => {
    const [users, setUsers] = useState(null)
    const [currentColor, setCurrentColor] = useState("white")
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch(`/api/communalChess/${user.userID}`, {
                
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
                
            })
            
            const json = await res.json()
            if (res.ok)
            {
                setUsers(json)
                setCurrentColor(json["user"]["currentColor"])
            } 
            
        }
        
        if(user) fetchUsers()
    }, [user])

    return(
        <div className="Home">
            <div className='container'>
                <div className='row'>
                    <div className='users col-md-2 order-0'> 
                        {users && 
                        <UserDetails user={users["user"]}/>
                        }
                    </div>
                </div>
                <div className='row'>
                    
                        {PlayChess(currentColor)}
                    
                    <div className='voteRank col-md-2 order-2'>
                        <VoteRank/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home