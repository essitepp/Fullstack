import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

import { useSelector, useDispatch } from 'react-redux'
import { setNotification, resetNotification } from './reducers/notificationReducer'
import { setBlogs, addBlog, updateBlog, removeBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

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

  const user = useSelector(state => {
    return state.user
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs(blogs))
    )
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    const user = JSON.parse(loggedUserJSON)
    if (user) {
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }

  }, [])

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
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('wrong username or password','error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setUser(null))
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

  const handleUpdatingBlog = async (blogObject) => {
    const updatedBlog = await blogService.update(blogObject)
    dispatch(updateBlog(updatedBlog))
  }

  const handleRemovingBlog = async (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
      await blogService.remove(blogObject)
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


  if (user === null) {
    return (
      <div>
        <Notification notification={notification}/>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h1>BlogApp</h1>
      <Notification notification={notification}/>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </p>
      {blogForm()}
      <h3>Blogs</h3>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          currentUser={user}
          update={handleUpdatingBlog}
          remove={handleRemovingBlog}
        />
      )}
    </div>

  )
}

export default App