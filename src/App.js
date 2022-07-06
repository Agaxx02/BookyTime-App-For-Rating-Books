import './App.css';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
