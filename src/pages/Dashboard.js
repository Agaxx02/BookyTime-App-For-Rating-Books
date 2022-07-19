import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CredentialsContext } from '../App'
import { handleErrors } from './Register'
import { v4 as uuidv4 } from 'uuid'

export default function Dashboard() {
    const [credentials, setCredentials] = useContext(CredentialsContext)
    const [isbn, setIsbn] = useState('')
    const[book, setBook] = useState(null)
    const[books, setBooks] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate()
   

    const search = async (e) => {
        setError('')
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
                    })
                      .catch((error) => {
                      setError(error.message)
                      }) 
                    }

    const persist = (books) => {
      fetch('http://localhost:8000/books', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials.username}:${credentials.password}`
        },
        body: JSON.stringify(books)
      })
    }
    const addBook = () => {
      persist(book)
    }
    const library = (e) => {
      e.preventDefault();
      navigate('/library')
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
            <button onClick={library}>My Library</button>
        </form>
        <div></div>
    </div>
  )
}
