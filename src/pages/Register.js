import React, { useState } from 'react'

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassowrd, setConfirmPassword] = useState('')


    const register = () => {
        fetch(`http://localhost:8000/register`, {
            
        })
    }

  return (
    <div>
        <h1>Register</h1>
        <form>
            <label htmlFor='username'>Username</label>
            <input id="username" onChange={(e) => setUsername(e.target.value)}></input>
            <br/>
            <label htmlFor='password'>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type='password'  id="password"></input>
            < br/>
            <label htmlFor='confirmPassowrd'>Confirm password</label>
            <input onChange={(e) => setConfirmPassword(e.target.value)} type='password'  id="confirmPassword"></input>
            <br />
            <button onClick={register}>Register</button>
        </form>
    </div>
  )
}
