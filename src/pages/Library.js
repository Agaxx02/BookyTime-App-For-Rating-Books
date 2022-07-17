import React from 'react'
import { useEffect, useContext, useState } from 'react'
import { CredentialsContext } from '../App'



export default function Library() {
  const [credentials] = useContext(CredentialsContext)
  const [, setBooks] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/books`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      }
    }).then((response) => {
      response.json()
    }).then((books) => {
      setBooks(books)
    })
  })

  return (
    <div>Library</div>
  )
}
