import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home-page'
import LoginPage from './pages/login-page'
import SignupPage from './pages/signup-page'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
    </Routes>
  )
}

export default App
