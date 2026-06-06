import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserById, updateUser } from '../api/users'

export default function EditUser() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'MEMBER',
    status: 'ACTIVE',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id)
        const user = res.data
        setForm({
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        })
      } catch (err) {
        setError('Error al cargar el usuario.')
      } finally {
        setFetching(false)
      }
    }
    fetchUser()
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await updateUser(id, { ...form, id })
      navigate('/users')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar el usuario.')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-gray-500">Cargando usuario...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Gestión de Usuarios</h1>
        <button
          onClick={() => navigate('/users')}
          className="text-sm text-gray-500 hover:text-gray-700 font-medium"
        >
          ← Volver
        </button>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-6">Editar usuario</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                minLength={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ADMIN">ADMIN</option>
                <option value="MEMBER">MEMBER</option>
                <option value="REVIEWER">REVIEWER</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="PENDING">PENDING</option>
                <option value="BLOCKED">BLOCKED</option>
              </select>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/users')}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}