import { useState, type ReactElement } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { Topbar } from './components/Topbar'
import { Dashboard } from './views/Dashboard'
import { Landing } from './views/Landing'
import { Login } from './views/Login'
import { Register } from './views/Register'

type ProtectedRouteProps = {
  isAuthenticated: boolean
  children: ReactElement
}

function ProtectedRoute({ isAuthenticated, children }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = () => {
    setIsAuthenticated(true)
    navigate('/dashboard')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <div className="app">
      <Topbar
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onLoginClick={() => navigate('/login')}
      />

      <main className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/register" element={<Register setAuth={setAuth}/>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
