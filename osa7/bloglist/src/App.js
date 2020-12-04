import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { UserView, AllUsersView, BlogView, HomeView } from './components/Views'

import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { setNotification, resetNotification } from './reducers/notificationReducer'
import { initializeBlogs, addBlog, updateBlog, removeBlog, addComment } from './reducers/blogReducer'
import { setCurrentUser } from './reducers/currentUserReducer'
import { initializeUsers } from './reducers/userReducer'

import {
  Container,
  Button,
  TextField,
  AppBar,
  Toolbar,
  Link as UILink
} from '@material-ui/core'

import ExitToAppIcon from '@material-ui/icons/ExitToApp'

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

  const blogFormRef = useRef()

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

  const handleAddingComment = async (blog, comment) => {
    dispatch(addComment(blog, comment))
  }

  const margins = { marginTop : 5 }
  const loginForm = () => (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            id='username'
            label="Username"
            variant='filled'
            size='small'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            type='password'
            id='password'
            label='Password'
            variant='filled'
            size='small'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button
          id='login-button'
          type='submit'
          variant='contained'
          color='primary'
          style={margins}
        >
          log in
        </Button>
      </form>
    </div>
  )

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
      <Container>
        <Notification notification={notification}/>
        {loginForm()}
      </Container>
    )
  }
  const padding = { padding : 5 }
  return (
    <Container>
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' component={Link} to="/">Blogs</Button>
          <Button color='inherit' component={Link} to="/users">Users</Button>
          <UILink color='inherit' component={Link} to={`/users/${currentUser.id}`} style={padding}>
            logged in as {currentUser.name}
          </UILink>
          <Button color='inherit' endIcon={<ExitToAppIcon />} onClick={handleLogout}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <div>
        <h1>BlogApp</h1>
        <Notification notification={notification}/>

      </div>

      <Switch>
        <Route path="/users/:id">
          <UserView user={user} />
        </Route>
        <Route path="/users">
          <AllUsersView users={users}/>
        </Route>
        <Route path="/blogs/:id">
          <BlogView
            blog={blog}
            currentUser={currentUser}
            update={handleUpdatingBlog}
            remove={handleRemovingBlog}
            addComment={handleAddingComment}
          />
        </Route>
        <Route path="/">
          <HomeView
            blogFormRef={blogFormRef}
            handleAddingBlog={handleAddingBlog}
            blogs={blogs}
          />
        </Route>
      </Switch>
    </Container>

  )
}

export default App