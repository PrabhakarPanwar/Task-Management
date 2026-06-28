import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Dashboard from './page/Dashboard'
import Register from './page/Register'
import Login from './page/Login'
import React from 'react'
import Home from './page/Home'
import PageNotFound from './page/PageNotFound'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}
