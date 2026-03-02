import type { User } from '../types/user'

export const initialUsers: User[] = [
  { id: 1, name: 'Ana Torres', email: 'ana@demo.com', role: 'Admin', status: 'Activo' },
  { id: 2, name: 'Luis Peña', email: 'luis@demo.com', role: 'Editor', status: 'Activo' },
  { id: 3, name: 'Sara López', email: 'sara@demo.com', role: 'Usuario', status: 'Inactivo' },
]
