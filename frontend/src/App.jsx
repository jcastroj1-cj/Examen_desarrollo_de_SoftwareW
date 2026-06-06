import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Users from './pages/Users'
import CreateUser from './pages/CreateUser'
import EditUser from './pages/EditUser'

function App() {
  const isAuthenticated = () => !!localStorage.getItem('user')

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={isAuthenticated() ? <Users /> : <Navigate to="/login" />} />
      <Route path="/users/create" element={isAuthenticated() ? <CreateUser /> : <Navigate to="/login" />} />
      <Route path="/users/edit/:id" element={isAuthenticated() ? <EditUser /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App