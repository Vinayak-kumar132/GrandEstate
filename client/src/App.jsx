import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'


const App = () => {
  return(
  // <BrowserRouter>
  <div>
  <Header/>
    <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/about" element={<About/>} />
         <Route path="/sign-in" element={<SignIn/>} />
         <Route path="/sign-up" element={<SignUp/>} />
         <Route element={<PrivateRoute/>}>
         <Route path="/profile" element={<Profile/>} />
         </Route>
         
    </Routes>
    </div>
  // </BrowserRouter>
)}

export default App