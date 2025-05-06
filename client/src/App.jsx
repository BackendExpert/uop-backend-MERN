import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/HomePage/Home'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import PrivateRoute from './components/Auth/PriveteRoute'
import Dashbaord from './components/Dashbaord/DashHome'
import HomeDash from './pages/Dashbaord/HomeDash'
import VerfyOPT from './pages/Auth/VerfyOPT'
import UserMangement from './pages/UserManage/UserMangement'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Test' element={<Home /> } />
        <Route path='/' element={<SignIn /> } />
        <Route path='/register' element={<SignUp /> } />
        <Route path='/VerifyOTP' element={<VerfyOPT /> } />

        <Route path='/Dashboard/' element={<PrivateRoute element={<Dashbaord /> } /> } >
          <Route path='Home' element={<PrivateRoute element={<HomeDash /> } /> } />
          <Route path='UserManagement' element={ <PrivateRoute element={<UserMangement /> } /> } />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
