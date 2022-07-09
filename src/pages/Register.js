import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const navigate = useNavigate()

export const handleErrors = async (res) => {
  if(!res.ok) {
    const { message } = await res.json();
    throw Error(message)
  } 
  return res.json()
};

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')


    const register = (e) => {
      e.preventDefault();
        fetch(`http://localhost:8000/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
              confirmPassword
            })
        })
        .then(handleErrors)
        .then(() => {
          navigate('/dashboard')
        })
        .catch((error) => {
          setError(error.message)
        })
    }

  return (
    <div>
        <h1>Register</h1>
        {error && <span className='errorMessage'>{error}</span>}
        <form onSubmit={register}>
            <label htmlFor='username'>Username</label>
            <input id="username" onChange={(e) => setUsername(e.target.value)}></input>
            <br/>
            <label htmlFor='password'>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type='password'  id="password"></input>
            < br/>
            <label htmlFor='confirmPassword'>Confirm password</label>
            <input onChange={(e) => setConfirmPassword(e.target.value)} type='password'  id="confirmPassword"></input>
            <br />
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}
