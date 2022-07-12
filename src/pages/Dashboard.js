import React, { useContext, useState } from 'react'
import { CredentialsContext } from '../App'

export default function Dashboard() {
    const [credentials, setCredentials] = useContext(CredentialsContext)
    const [isbn, setIsbn] = useState('')
   

    const search = async (e) => {
        e.preventDefault();
        await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)}`)
                    .then(response => {
                      if (response.ok) return response.json()
                      throw new Error('Network response was not ok.')
                    })
                    .then(data => {
                      let obj = data.contents
                      obj = JSON.parse(obj)
                      console.log(obj[`ISBN:${isbn}`], typeof obj)
                    })}
  return (
    <div>
        <h1>Welcome {credentials && credentials.username}</h1>
        <form onSubmit={search}>
            <label htmlFor='ISBNNumber'>ISBN Number</label>
            <input id='ISBNNumber' onChange={(e) => setIsbn(e.target.value)}></input>
            <button type='submit'>Search</button>
        </form>
        <div></div>
    </div>
  )
}
