import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../api/users'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'

export default function CreateUser() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'MEMBER',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await createUser({ ...form, id: uuidv4() })
      
      // 1. Mensaje de éxito flotante y elegante
      toast.success('¡Usuario registrado con éxito!', {
        duration: 4000,
        style: {
          borderRadius: '12px',
          background: '#1e293b',
          color: '#fff',
        },
      })
      
      navigate('/users')
    } catch (err) {
      // 2. Si hay un error de la API, lo atrapamos con un toast de alerta
      const msgError = err.response?.data?.message || 'Error al crear el usuario.'
      toast.error(msgError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Navbar estilizado */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Gestión de Usuarios
        </h1>
        <button
          onClick={() => navigate('/users')}
          className="text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors flex items-center gap-1"
        >
          ← Volver al listado
        </button>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-100/70 border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-1">Nuevo usuario</h2>
          <p className="text-sm text-slate-400 mb-6">Completa los datos para registrar la nueva cuenta.</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Nombre</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                minLength={3}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-300"
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-300"
                placeholder="juan@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Contraseña</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-300"
                placeholder="Mínimo 8 caracteres"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Rol de Usuario</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-700"
              >
                <option value="ADMIN">ADMIN</option>
                <option value="MEMBER">MEMBER</option>
                <option value="REVIEWER">REVIEWER</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-50">
              <button
                type="button"
                onClick={() => navigate('/users')}
                className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-all text-sm font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 active:scale-[0.99] transition-all text-sm font-semibold shadow-md shadow-indigo-200 disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? 'Creando...' : 'Crear usuario'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}