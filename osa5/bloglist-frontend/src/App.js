import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortBlogs(blogs))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    const user = JSON.parse(loggedUserJSON)
    if (user) {
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])

  const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('wrong username or password','error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    notify('logged out')
  }

  const handleAddingBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.create({
        title,
        author,
        url
      })
      setBlogs(blogs.concat(response))
      notify(`added blog "${title}" by ${author}`)
    } catch (error) {
      notify('error adding blog, make sure to fill all fields', 'error')
    }
  }

  const updateBlog = async (blogObject) => {
    const response = await blogService.update(blogObject)
    const updatedBlogs = blogs.map(blog =>
      blog.id === blogObject.id ? response : blog)
    setBlogs(sortBlogs(updatedBlogs))
  }

  const removeBlog = async (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
      await blogService.remove(blogObject)
      const updatedBlogs = blogs.filter(blog =>
        blog.id !== blogObject.id)
      setBlogs(sortBlogs(updatedBlogs))
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

  if (user === null)
  {
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
          update={updateBlog}
          remove={removeBlog}
        />
      )}
    </div>

  )
}

export default App