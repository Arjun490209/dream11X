import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home'
import About from './components/About'
import Login from './admin/Login'



const App = () => {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/admin' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App