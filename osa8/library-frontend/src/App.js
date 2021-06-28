
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommendations from './components/Recommendations'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(b => b.id).includes(object.id)

    const bookDataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(bookDataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: bookDataInStore.allBooks.concat(addedBook) }
      })
      const author = addedBook.author.name
      const authorDataInStore = client.readQuery({ query: ALL_AUTHORS })
      if (authorDataInStore.allAuthors.map(a => a.name)
        .includes(author)) {
          client.writeQuery({
            query: ALL_AUTHORS,
            data: { allAuthors: authorDataInStore.allAuthors.map(a => a.name === author
              ? {
                ...a,
                bookCount: a.bookCount + 1
              }
              : a
            ) }
          })
      } else {
        client.writeQuery({
          query: ALL_AUTHORS,
          data: { allAuthors: authorDataInStore.allAuthors.concat({
            name: author,
            bookCount: 1
          }) }
        })
      }

    }
  }

  const notify = (message, error = false) => {
    if (error) setNotificationType('error')
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
      setNotificationType(null)
    }, 5000)
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`Book '${addedBook.title}' was added`)
      updateCacheWith(addedBook)
    }
  })

  const logout = () => {
    localStorage.clear()
    setToken(null)
    client.resetStore()
  }

  

  return (
    <div>
      <Notification message={notification} type={notificationType} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        {token 
          ? <button onClick={logout}>log out</button>
          : <button onClick={() => setPage('login')}>log in</button>
        }
      </div>

      <Authors show={page === 'authors'} loggedIn={!!token} notify={notify}/>
      <Books show={page === 'books'} />
      <Recommendations show={page === 'recommendations'} />
      <NewBook show={page === 'add'} notify={notify}/>
      <LoginForm show={page === 'login'} setToken={setToken} notify={notify} setPage={setPage}/>

    </div>
  )
}

export default App