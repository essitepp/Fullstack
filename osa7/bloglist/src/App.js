import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { setNotification, resetNotification } from './reducers/notificationReducer'
import { initializeBlogs, addBlog, updateBlog, removeBlog } from './reducers/blogReducer'
import { setCurrentUser } from './reducers/currentUserReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const notification = useSelector(state => {
    return {
      message: state.notification.message,
      type: state.notification.type
    }
  })

  const blogs = useSelector(state => {
    return state.blogs
  })

  const currentUser = useSelector(state => {
    return state.currentUser
  })

  const users = useSelector(state => {
    return state.users
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch, blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    const currentUser = JSON.parse(loggedUserJSON)
    if (currentUser) {
      dispatch(setCurrentUser(currentUser))
      blogService.setToken(currentUser.token)
    }

  }, [dispatch])

  const notify = (message, type='success') => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setCurrentUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('wrong username or password','error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setCurrentUser(null))
    notify('logged out')
  }

  const handleAddingBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url
      })
      dispatch(addBlog(newBlog))
      notify(`added blog "${title}" by ${author}`)
    } catch (error) {
      notify('error adding blog, make sure to fill all fields', 'error')
    }
  }

  const handleUpdatingBlog = async (blog) => {
    dispatch(updateBlog(blog))
  }

  const handleRemovingBlog = async (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
      dispatch(removeBlog(blogObject))
      notify(`removed blog "${blogObject.title}" by ${blogObject.author}`)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input
            type='text'
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            type='password'
            id='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type='submit'>log in</button>
      </form>
    </div>
  )

  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <Toggleable buttonLabel='add blog' ref={blogFormRef}>
        <BlogForm createBlog={handleAddingBlog}/>
      </Toggleable>
    )
  }


  if (currentUser === null) {
    return (
      <div>
        <Notification notification={notification}/>
        {loginForm()}
      </div>
    )
  }

  return (
    <Router>
      <div>
        <h1>BlogApp</h1>
        <Notification notification={notification}/>
        <p>
          {currentUser.name} logged in
          <button onClick={handleLogout}>log out</button>
        </p>
      </div>

      <Switch>
        <Route path="/users">
          <div>
            <h2>Users</h2>
            <table>
              <tbody>
                <tr>
                  <td><b>user</b></td>
                  <td><b>blogs created</b></td>
                </tr>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.blogs.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Route>

        <Route path="/">
          <div>
            {blogForm()}
            <h3>Blogs</h3>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                currentUser={currentUser}
                update={handleUpdatingBlog}
                remove={handleRemovingBlog}
              />
            )}
          </div>
        </Route>
      </Switch>
    </Router>

  )
}

export default App