import type { User } from '../types/user'

type StatsProps = {
  users: User[]
}

export function Stats({ users }: StatsProps) {
  return (
    <div className="stats">
      <div className="stat-card">
        <p>Usuarios activos</p>
        <strong>{users.filter((u) => u.status === 'Activo').length}</strong>
        <span>+6% esta semana</span>
      </div>
      <div className="stat-card">
        <p>Roles administrados</p>
        <strong>0</strong>
        <span>Admin, Editor, Usuario</span>
      </div>
      <div className="stat-card">
        <p>Solicitudes pendientes</p>
        <strong>0</strong>
        <span>Acceso y cambios</span>
      </div>
    </div>
  )
}
