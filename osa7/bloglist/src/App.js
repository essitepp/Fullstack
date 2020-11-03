import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

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
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
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

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  if (currentUser === null) {
    return (
      <div>
        <Notification notification={notification}/>
        {loginForm()}
      </div>
    )
  }

  const padding = { padding : 5 }
  const headerStyle = {
    backgroundColor: 'lightgrey'
  }
  return (
    <div>
      <div style={headerStyle}>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {currentUser.name} logged in
        <button onClick={handleLogout}>log out</button>
      </div>
      <div>
        <h1>BlogApp</h1>
        <Notification notification={notification}/>

      </div>

      <Switch>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route path="/users">
          <Users users={users}/>
        </Route>
        <Route path="/blogs/:id">
          <BlogView
            blog={blog}
            currentUser={currentUser}
            update={handleUpdatingBlog}
            remove={handleRemovingBlog}
          />
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
                url={`/blogs/${blog.id}`}
                viewFull={false}
              />
            )}
          </div>
        </Route>
      </Switch>
    </div>

  )
}

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

const Users = ({ users }) => {
  if (!users) {
    return null
  }
  return (
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
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const BlogView = ({ blog, currentUser, update, remove }) => {
  if (!blog) {
    return null
  }
  return (
    <Blog
      key={blog.id}
      blog={blog}
      currentUser={currentUser}
      update={update}
      remove={remove}
    />
  )
}

export default App