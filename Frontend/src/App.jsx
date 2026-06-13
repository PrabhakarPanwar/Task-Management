import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Dashboard from './page/Dashboard'
import Register from './page/Register'
import Login from './page/Login'
import React from 'react'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}
