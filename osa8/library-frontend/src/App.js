
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [])

  const logout = () => {
    localStorage.clear()
    setToken(null)
    client.resetStore()
  }

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  

  return (
    <div>
      <Notification message={notification} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token 
          ? <button onClick={logout}>log out</button>
          : <button onClick={() => setPage('login')}>log in</button>
        }
      </div>

      <Authors show={page === 'authors'} loggedIn={!!token} notify={notify}/>
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} notify={notify}/>
      <LoginForm show={page === 'login'} setToken={setToken} notify={notify} setPage={setPage}/>

    </div>
  )
}

export default App