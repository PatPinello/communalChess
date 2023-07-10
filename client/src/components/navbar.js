import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const handleClick = () => {
        logout()
    }
    return (
        <header>
            <div className="container">
                <div className="row">
                    <Link className="col-md-10" style={{'text-decoration':"none"}} to="/">
                        <h1 >
                            <span style={{'color':'#f0d9b5'}}>communal</span> 
                            <span style={{'color':'#b58863'}}>Chess</span>
                        </h1>
                    </Link>
                    <nav className="col-md-2">
                        {user && (
                            <div>
                                <button className="btn btn-outline-secondary "style={{width:"100%",'backgroundColor':'#f0d9b5'}} onClick={handleClick}>Log out</button>
                                
                            </div>
                        )}
                        {!user && (
                            <div>
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Sign Up</Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar