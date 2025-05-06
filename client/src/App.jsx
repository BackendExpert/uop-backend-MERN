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
import UpdateUser from './pages/UserManage/UpdateUser'
import EventsManage from './pages/Events/EventsManage'
import CreateEvent from './pages/Events/CreateEvent'
import ViewEvent from './pages/Events/ViewEvent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Test' element={<Home />} />
        <Route path='/' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/VerifyOTP' element={<VerfyOPT />} />

        <Route path='/Dashboard/' element={<PrivateRoute element={<Dashbaord />} />} >
          <Route path='Home' element={<PrivateRoute element={<HomeDash />} />} />
          <Route path='UserManagement' element={<PrivateRoute element={<UserMangement />} />} />
          <Route path='UpdateUser/:updateemail' element={<PrivateRoute element={<UpdateUser />} />} />
          <Route path='Events' element={<PrivateRoute element={<EventsManage />} />} />
          <Route path='CreateEvent' element={<PrivateRoute element={<CreateEvent />} />} />
          <Route path='ViewEvent/:id' element={<PrivateRoute element={<ViewEvent />} />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
