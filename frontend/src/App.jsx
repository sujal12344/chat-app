import React from 'react'
import Login from './pages/login/Login.jsx'
import Signup from "./pages/signUp/SignUp.jsx"
import Sidebar from './pages/components/Sidebar/Sidebar.jsx'
import Home from './pages/home/Home.jsx'

const App = () => {
  return (
    <div className="p-4 h-screen flex flex-col items-center justify-center">
      {/* <Signup /> */}
      {/* <Login /> */}
      <Home />
      
    </div>
  )
}

export default App
