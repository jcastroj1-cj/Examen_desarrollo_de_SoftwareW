import { Routes, Route, Navigate } from 'react-router-dom'
import Users from './pages/Users'
import CreateUser from './pages/CreateUser'
import EditUser from './pages/EditUser'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      
      <Toaster position="top-right" reverseOrder={false} /> 

      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
      </Routes>
    </>
  )
}

export default App