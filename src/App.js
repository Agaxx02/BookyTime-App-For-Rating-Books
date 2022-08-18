import React, { useState } from 'react';
import './App.scss';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export const CredentialsContext = React.createContext();

function App() {
	const credentialsState = useState();

	return (
		<QueryClientProvider client={queryClient}>
			<CredentialsContext.Provider value={credentialsState}>
				<div className='App'>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Welcome />} />
							<Route path='register' element={<Register />} />
							<Route path='login' element={<Login />} />
							<Route path='dashboard' element={<Dashboard />} />
							<Route path='library' element={<Library />} />
						</Routes>
					</BrowserRouter>
				</div>
			</CredentialsContext.Provider>
		</QueryClientProvider>
	);
}

export default App;
