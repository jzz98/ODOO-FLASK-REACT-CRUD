import { NavLink } from 'react-router-dom'

type TopbarProps = {
  isAuthenticated: boolean
  onLogout: () => void
  onLoginClick: () => void
}

export function Topbar({ isAuthenticated, onLogout, onLoginClick }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">CR</span>
        <div>
          <p className="brand-name">Crudoria</p>
          <p className="brand-tag">Gestor de usuarios</p>
        </div>
      </div>
      <nav className="nav">
        <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
          Login
        </NavLink>
        <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
          Register
        </NavLink>
      </nav>
      <div className="topbar-actions">
        {isAuthenticated ? (
          <button className="ghost" onClick={onLogout}>
            Salir
          </button>
        ) : (
          <>
            <button className="ghost">Plan Pro</button>
            <button className="primary" onClick={onLoginClick}>
              Entrar
            </button>
          </>
        )}
      </div>
    </header>
  )
}
