import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import UserDetails from '../components/userDetails'
import PlayChess from './PlayChess'


const Home = () => {
    const [users, setUsers] = useState(null)
    const {user} = useAuthContext()

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
            {PlayChess()}
            
        </div>
    )
}

export default Home