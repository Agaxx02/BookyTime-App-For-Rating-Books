import React, { useState } from 'react';
import './styles/Auth.scss';
import './styles/App.scss';
import './styles/Buttons.scss';
import './styles/Images.scss';
import './styles/Popups.scss';
import './styles/Book.scss';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';

export const CredentialsContext = React.createContext();

function App() {
	const credentialsState = useState();

	return (
		<CredentialsContext.Provider value={credentialsState}>
			<div className='App'>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Welcome />} />
						<Route path='register' element={<Register />} />
						<Route path='login' element={<Login />} />
						<Route path='dashboard' element={<Dashboard />} />
						<Route path='library' element={<Library />} />
						<Route path='profile' element={<Profile />} />
					</Routes>
				</BrowserRouter>
			</div>
		</CredentialsContext.Provider>
	);
}

export default App;
