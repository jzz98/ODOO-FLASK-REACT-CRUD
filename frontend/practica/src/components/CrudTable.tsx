import { useEffect } from "react";
import { GetUsers } from "../api/UsersApi";
import type { DataUser } from "../api/types";
import type { User } from "../types/user";

type CrudTableProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onUsersFetched: (users: User[]) => void;
  refreshSignal: number;
};

export function CrudTable({
  users,
  onEdit,
  onDelete,
  onUsersFetched,
  refreshSignal,
}: CrudTableProps) {
  useEffect(() => {
    let isMounted = true;
    const fetchUsers = async () => {
      try {
        const response = await GetUsers();
        if (!response) return;
        const rawData = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.data)
            ? response.data.data
            : Array.isArray(response.data?.result)
              ? response.data.result
              : [];
        if (!rawData.length) return;
        const mapped: User[] = rawData.map((user: DataUser) => ({
          id: user.id,
          name: user.name,
          email: String(user.email || ""),
          role: "Usuario",
          status: "Activo",
        }));
        if (isMounted) onUsersFetched(mapped);
      } catch (error) {
        console.error("Error cargando usuarios", error);
      }
    };
    fetchUsers();
    return () => {
      isMounted = false;
    };
  }, [onUsersFetched, refreshSignal]);

  return (
    <div className="crud-table">
      <div className="table-header">
        <h2>Listado de usuarios</h2>
        <span>{users.length} resultados</span>
      </div>
      <div className="table">
        <div className="table-row table-head">
          <span>Nombre</span>
          <span>Email</span>
          <span>Rol</span>
          <span>Estado</span>
          <span>Acciones</span>
        </div>
        {users.map((user) => (
          <div className="table-row" key={user.id}>
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span className={`badge ${user.role.toLowerCase()}`}>
              {user.role}
            </span>
            <span
              className={`status ${user.status === "Activo" ? "on" : "off"}`}
            >
              {user.status}
            </span>
            <span className="row-actions">
              <button
                type="button"
                className="ghost small"
                onClick={() => onEdit(user)}
              >
                Editar
              </button>
              <button
                type="button"
                className="danger small"
                onClick={() => onDelete(user.id)}
              >
                Eliminar
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
