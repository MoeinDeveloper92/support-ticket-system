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
import Tickets from './pages/Tickets'
import Ticket from './pages/Ticket'
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

          <Route path='/tickets' element={<PrivateComponent />}>
            <Route path="/tickets" element={<Tickets />} />
          </Route>


          <Route path='/ticket/:ticketId' element={<PrivateComponent />}>
            <Route path="/ticket/:ticketId" element={<Ticket />} />
          </Route>

        </Routes>
      </div>
      <ToastContainer />
    </>
  )
}

export default App