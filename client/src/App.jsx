import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './components/LandingPage/landingPage'
import Home from './components/Home/homePage'
import Nav from './components/NavBar/navBar'

function App() {

  let location= useLocation()

  return (
    <>
    <div>
      {location.pathname !=='/' && <Nav/>}
      <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
