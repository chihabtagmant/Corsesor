import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NavBar from './pages/NavBar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/NavBar" element={<NavBar />} />
        <Route path="/courses" element={<NavBar />} />
        <Route path="/subscription" element={<NavBar />} />
        <Route path="/playlists" element={<NavBar />} />
        <Route path="/settings" element={<NavBar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
