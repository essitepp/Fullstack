import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS, CURRENT_USER } from '../queries'
import BookList from './BookList'

const Recommendations = ({ show }) => {
  
  const userResult = useQuery(CURRENT_USER)
  let genre
  if (userResult.data) {
    genre = userResult.data.me.favoriteGenre
  } 
  const bookResult = useQuery(ALL_BOOKS, {
    variables: { genre: genre}
  })

  if (!show) {
    return null
  }

  if (userResult.loading || bookResult.loading) {
    return (
      <div>loading...</div>
    )
  }

  const books = bookResult.data.allBooks
  
  return (
    <div>
      <h2>recommendations</h2>

      <div>
        Books in your favorite genre <b>{genre}</b>
      </div>

      <BookList books={books} />
    </div>
  )
}

export default Recommendations