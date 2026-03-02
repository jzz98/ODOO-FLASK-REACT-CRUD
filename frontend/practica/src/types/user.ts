export type UserRole = 'Admin' | 'Editor' | 'Usuario'
export type UserStatus = 'Activo' | 'Inactivo'

export type User = {
  id: number
  name: string
  email: string
  role: UserRole
  status: UserStatus
}

export type UserFormState = {
  name: string
  email: string
  role: UserRole
  status: UserStatus
  password: string
}
