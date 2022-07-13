import React, { useContext, useState } from 'react'
import { CredentialsContext } from '../App'
import { handleErrors } from './Register'

export default function Dashboard() {
    const [credentials, setCredentials] = useContext(CredentialsContext)
    const [isbn, setIsbn] = useState('')
    const[book, setBook] = useState(null)
    const [error, setError] = useState('')
   

    const search = async (e) => {
        e.preventDefault();
        await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)}`)
                    .then(handleErrors)
                    .then(data => {
                      let obj = data.contents
                      obj = JSON.parse(obj)
                      setBook({
                        'title': obj[`ISBN:${isbn}`]['title'],
                        'numOfPages': obj[`ISBN:${isbn}`]['number_of_pages'],
                        'authors': obj[`ISBN:${isbn}`]['authors'][0]['name']
                      })
                      .catch((error) => {
                      setError(error.message)
                      }) 
                    })}

    const addBook = async (e) => {
      e.preventDefault();
      fetch(`http://localhost:8000/addBook`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             
             book
            })
        })
        .catch((error) => {
          setError(error.message)
        })
    }
  return (
    <div>
        <h1>Welcome {credentials && credentials.username}</h1>
        {error && <span className='errorMessage'>{error}</span>}
        <form onSubmit={search}>
            <label htmlFor='ISBNNumber'>ISBN Number</label>
            <input id='ISBNNumber' onChange={(e) => setIsbn(e.target.value)}></input>
            <button type='submit'>Search</button>
            {book && <div className='searchResult'>
             <h2>Title: {book.title}</h2>
             <h3>Author: {book.authors}</h3>
              <button onClick={addBook}>Add book</button>

              </div>}
        </form>
        <div></div>
    </div>
  )
}
