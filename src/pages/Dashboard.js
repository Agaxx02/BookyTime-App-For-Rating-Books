import React, { useContext, useState } from 'react'
import { CredentialsContext } from '../App'

export default function Dashboard() {
    const [credentials, setCredentials] = useContext(CredentialsContext)
    const [isbn, setIsbn] = useState('')

    const search = async (e) => {
        e.preventDefault();
       const response =  fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            }
         })
        console.log(response.json)
        };
  return (
    <div>
        <h1>Welcome {credentials && credentials.username}</h1>
        <form onSubmit={search}>
            <label htmlFor='ISBNNumber'>ISBN Number</label>
            <input id='ISBNNumber' onChange={(e) => setIsbn(e.target.value)}></input>
            <button type='submit'>Search</button>
        </form>
    </div>
  )
}
