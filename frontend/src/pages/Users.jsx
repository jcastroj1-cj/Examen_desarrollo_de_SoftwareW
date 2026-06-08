import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsers, deleteUser } from '../api/users'
import toast from 'react-hot-toast'

export default function Users() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const res = await getUsers()
      setUsers(res.data)
    } catch (err) {
      toast.error('Error al cargar la lista de usuarios.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return
    try {
      await deleteUser(id)
      toast.error('Usuario eliminado con éxito', {
        duration: 4000,
        style: {
          borderRadius: '12px',
          background: '#1e293b',
          color: '#fff',
        },
      })
      fetchUsers()
    } catch (err) {
      toast.error('No se pudo eliminar el usuario.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
    toast('Sesión cerrada correctamente', { icon: '👋' })
  }

  // Mapeamos los estados exactos que vienen de tu backend
  const statusColor = (status) => {
    const colors = {
      ACTIVO: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      ACTIVE: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      INACTIVO: 'bg-slate-100 text-slate-600 border border-slate-200',
      INACTIVE: 'bg-slate-100 text-slate-600 border border-slate-200',
      PENDIENTE: 'bg-amber-50 text-amber-700 border border-amber-200',
      PENDING: 'bg-amber-50 text-amber-700 border border-amber-200',
      BLOQUEADO: 'bg-rose-50 text-rose-700 border border-rose-200',
      BLOCKED: 'bg-rose-50 text-rose-700 border border-rose-200',
    }
    return colors[status?.toUpperCase()] || 'bg-slate-100 text-slate-600 border border-slate-200'
  }

  return (
    <div className="min-h-screen bg-slate-50/60">
      {/* Navbar con blur de fondo y sombra sutil */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm shadow-slate-100/50">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight">
          Gestión de Usuarios
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm text-rose-500 hover:text-rose-700 font-semibold transition-colors duration-200"
        >
          Cerrar sesión
        </button>
      </nav>

      {/* Contenedor principal con más margen para que no toque los bordes de la pantalla */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Lista de usuarios</h2>
            <p className="text-sm text-slate-400 mt-0.5">Administra los accesos, roles y estados de tus cuentas.</p>
          </div>
          <button
            onClick={() => navigate('/users/create')}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all text-sm font-semibold shadow-lg shadow-indigo-200/50 flex items-center justify-center gap-1.5 self-start sm:self-auto"
          >
            <span className="text-lg leading-none">+</span> Nuevo usuario
          </button>
        </div>

        {/* Estados de Carga */}
        {loading && (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-400 font-medium animate-pulse">Cargando usuarios...</p>
          </div>
        )}

        {!loading && (
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-100/40 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 uppercase text-xs font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4 text-left">Nombre</th>
                    <th className="px-6 py-4 text-left">Correo Electrónico</th>
                    <th className="px-6 py-4 text-left">Rol</th>
                    <th className="px-6 py-4 text-left">Estado</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-800">{user.name}</td>
                      <td className="px-6 py-4 text-slate-400 font-normal">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="bg-indigo-50/60 text-indigo-700 font-semibold text-xs px-2.5 py-1 rounded-lg border border-indigo-100/50 uppercase tracking-wider">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${statusColor(user.status)}`}>
                          {user.status || 'ACTIVO'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2.5">
                          {/* Botón de Editar Estilizado */}
                          <button
                            onClick={() => navigate(`/users/edit/${user.id}`)}
                            className="bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-200 shadow-sm transition-all duration-200"
                          >
                            Editar
                          </button>
                          {/* Botón de Eliminar Estilizado */}
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:border-rose-200 shadow-sm transition-all duration-200"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-16 text-slate-400 font-medium">
                        No hay usuarios registrados en el sistema.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}