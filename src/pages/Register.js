import React, { useState } from 'react'

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


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
    }

  return (
    <div>
        <h1>Register</h1>
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
