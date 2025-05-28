import { useState } from 'react'
import './App.css'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Expense from './pages/Expense'
import Income from './pages/Income'
import Savings from './pages/Savings'
import Subscriptions from './pages/Subscriptions'
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
          <Route path='/savings' element={<Savings/>}></Route>
          <Route path='/subscriptions' element={<Subscriptions/>}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
