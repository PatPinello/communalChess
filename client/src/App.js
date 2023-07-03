import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/home'
import Navbar from './components/navbar'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {
  const { user } = useAuthContext()


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        
        <div className='pages'>
          <Routes>
            <Route 
              path="/"
              element={user ? <Home /> : <Navigate to='/login'/>}
            
            />
            <Route 
              path="/playChess"
              element={user ? <playChess /> : <Navigate to='/login'/>}
            
            />
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to="/"/>}
              
            />
            <Route 
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/"/>}
            />
          </Routes>
          
        </div>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
