import React, { useState } from 'react'
import './App.css';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

export const CredentialsContext = React.createContext()

function App() {
  const credentialsState = useState(null)
 
  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
