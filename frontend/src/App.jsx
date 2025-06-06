import { useState } from 'react'
import './App.css'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Expense from './pages/Expense'
import Income from './pages/Income'
import Profile from './pages/Profile'
function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/expense' element={<Expense/>}></Route>
          <Route path='/income' element={<Income/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
