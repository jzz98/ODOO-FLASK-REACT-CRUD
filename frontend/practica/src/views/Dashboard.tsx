import { useMemo, useState, type FormEvent } from 'react'
import { AuthRegister } from '../composables/AuthComposables'
import { CrudForm } from '../components/CrudForm'
import { CrudTable } from '../components/CrudTable'
import { Stats } from '../components/Stats'
import type { User, UserFormState } from '../types/user'
import { DeleteUser, UpdateUser } from '../api/UsersApi'

const emptyForm: UserFormState = {
  name: '',
  email: '',
  role: 'Usuario',
  status: 'Activo',
  password: '',
}

export function Dashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [query, setQuery] = useState('')
  const [form, setForm] = useState<UserFormState>(emptyForm)
  const [reloadKey, setReloadKey] = useState(0)

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return users
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.status.toLowerCase().includes(q),
    )
  }, [query, users])

  const resetForm = () => {
    setEditingId(null)
    setForm(emptyForm)
  }

  const handleEdit = (user: User) => {
    setEditingId(user.id)
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      password: '',
    })
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await DeleteUser(id)
      if (!response || response.status !== 201) return
      setUsers((prev) => prev.filter((u) => u.id !== id))
      if (editingId === id) resetForm()
    } catch (error) {
      console.error('Error eliminando usuario', error)
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return
    if (editingId) {
      UpdateUser(editingId, form.name, form.email, form.password)
        .then((response) => {
          if (!response || response.status !== 201) return
          setUsers((prev) =>
            prev.map((u) => (u.id === editingId ? { ...u, ...form } : u)),
          )
          resetForm()
        })
        .catch((error) => {
          console.error('Error actualizando usuario', error)
        })
      return
    } else {
      if (!form.password.trim()) return
      AuthRegister({ username: form.name, email: form.email, password: form.password })
        .then((response) => {
          if (!response) return
          setReloadKey((prev) => prev + 1)
        })
        .catch((error) => {
          console.error('Error registrando usuario', error)
        })
    }
    resetForm()
  }

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard principal</h1>
          <p>Gestión centralizada de usuarios y permisos.</p>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Buscar por nombre, rol o estado"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <Stats users={users} />

      <div className="crud">
        <CrudForm
          form={form}
          editing={Boolean(editingId)}
          onChange={setForm}
          onSubmit={handleSubmit}
          onReset={resetForm}
        />
        <CrudTable
          users={filteredUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onUsersFetched={setUsers}
          refreshSignal={reloadKey}
        />
      </div>
    </section>
  )
}
