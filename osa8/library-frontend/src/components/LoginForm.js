import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, notify, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      notify(error.graphQLErrors[0].message, true)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      localStorage.setItem('library-user-token', token)
      setToken(token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
    setPage('authors')
  }

  if (!show) {
    return null
  }


  return (
    <form onSubmit={submit}>
      <div>
        <input placeholder='username' value={username} onChange={({ target }) => setUsername(target.value)} />
      </div> 
      <div>
        <input type='password' placeholder='password' value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">log in</button>
    </form>
  )
}

export default LoginForm