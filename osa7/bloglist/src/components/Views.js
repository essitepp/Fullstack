import React from 'react'
import Blog from './Blog'
import { Link } from 'react-router-dom'

import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@material-ui/core'

export const UserView = ({ user }) => {
  if (!user) {
    return null
  }
  if (user.blogs.length === 0) {
    return (
      <div>
        <h2>{user.name}</h2>
        No blogs added yet
      </div>
    )
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <BlogList blogs={user.blogs} />
    </div>
  )
}

export const AllUsersView = ({ users }) => {
  if (!users) {
    return null
  }
  return (
    <div>
      <h2>Users</h2>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><b>user</b></TableCell>
              <TableCell><b>blogs created</b></TableCell>
            </TableRow>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Button to={`/users/${user.id}`} component={Link} color='primary'>
                    {user.name}
                  </Button>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export const BlogView = ({ blog, currentUser, update, remove, addComment }) => {
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
      addComment={addComment}
    />
  )
}

export const HomeView = ({ blogFormRef, handleAddingBlog, blogs }) => {
  const blogForm = () => {
    return (
      <Toggleable buttonLabel='add blog' ref={blogFormRef}>
        <BlogForm createBlog={handleAddingBlog}/>
      </Toggleable>
    )
  }
  return (
    <div>
      {blogForm()}
      <h2>Blogs</h2>
      <BlogList blogs={blogs} />
    </div>
  )
}

