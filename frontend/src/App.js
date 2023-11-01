import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import NewTicket from './pages/NewTicket'
import PrivateComponent from './components/PrivateComponent'


const App = () => {
  return (
    <>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/new-ticket' element={<PrivateComponent />}>
            <Route path="/new-ticket" element={<NewTicket />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </>
  )
}

export default App