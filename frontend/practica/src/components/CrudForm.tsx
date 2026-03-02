import type { FormEvent } from 'react'
import type { UserFormState, UserRole, UserStatus } from '../types/user'

type CrudFormProps = {
  form: UserFormState
  editing: boolean
  onChange: (next: UserFormState) => void
  onSubmit: (event: FormEvent) => void
  onReset: () => void
}

export function CrudForm({ form, editing, onChange, onSubmit, onReset }: CrudFormProps) {
  return (
    <form className="crud-form" onSubmit={onSubmit}>
      <h2>{editing ? 'Editar usuario' : 'Nuevo usuario'}</h2>
      <label>
        Nombre
        <input
          type="text"
          value={form.name}
          onChange={(e) => onChange({ ...form, name: e.target.value })}
          placeholder="Nombre completo"
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={form.email}
          onChange={(e) => onChange({ ...form, email: e.target.value })}
          placeholder="correo@empresa.com"
        />
      </label>
      <label>
        Contraseña
        <input
          type="password"
          value={form.password}
          onChange={(e) => onChange({ ...form, password: e.target.value })}
          placeholder={editing ? 'Sin cambiar' : 'Mínimo 8 caracteres'}
          disabled={editing}
        />
      </label>
      <label>
        Rol
        <select
          value={form.role}
          onChange={(e) => onChange({ ...form, role: e.target.value as UserRole })}
        >
          <option>Admin</option>
          <option>Editor</option>
          <option>Usuario</option>
        </select>
      </label>
      <label>
        Estado
        <select
          value={form.status}
          onChange={(e) => onChange({ ...form, status: e.target.value as UserStatus })}
        >
          <option>Activo</option>
          <option>Inactivo</option>
        </select>
      </label>
      <div className="crud-actions">
        <button type="submit" className="primary">
          {editing ? 'Guardar cambios' : 'Crear usuario'}
        </button>
        <button type="button" className="ghost" onClick={onReset}>
          Limpiar
        </button>
      </div>
    </form>
  )
}
