import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import _ from 'lodash'

import { ALL_BOOKS } from '../queries'
import BookList from './BookList'

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)

  const result = useQuery(ALL_BOOKS)
  const [getBooks, filteredResult] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (genre) {
    getBooks({ variables: { genre: genre }})
    } else {
      getBooks()
    }
  }, [genre]) // eslint-disable-line

  if (!show) {
    return null
  }

  if (result.loading || filteredResult.loading) {
    return <div>loading...</div>
  }

  const allBooks = result.data.allBooks
  const filteredBooks = filteredResult.data.allBooks

  const genres = _.uniq(allBooks.reduce((list, book) => {
    return list.concat(book.genres)
  }, []))

  return (
    <div>
      <h2>books</h2>
      
      <div>
        {genres.map(genre => (
          <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>

      {genre &&
        <div style={{paddingTop: "10px"}}>
          Showing books in genre <b>{genre}</b>
        </div>
      }

      <BookList books={filteredBooks} />
    </div>
  )
}

export default Books