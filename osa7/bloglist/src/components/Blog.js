import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import {
  Button,
  TextField,
  Link,
  IconButton,
  Box,
  List,
  ListItem
} from '@material-ui/core'

import { ThumbUp, Delete } from '@material-ui/icons'

const Blog = ({ blog, currentUser, update, remove, addComment }) => {

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired
  }

  const handleLike = () => {
    update({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const handleDelete = () => {
    remove(blog)
  }

  const handleAddingComment = (event) => {
    event.preventDefault()
    const comment = {
      comment: event.target.comment.value
    }
    event.target.comment.value = ''
    addComment(blog, comment)
  }

  return (
    <div>
      <h2>{blog.title} - {blog.author}</h2>
      <Link href={blog.url}>{blog.url}</Link>
      <Box alignItems='center' className='likes'>
        {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
        <IconButton onClick={() => handleLike()} color='primary'>
          <ThumbUp />
        </IconButton>
      </Box>

      {currentUser && blog.user.username === currentUser.username
        ?
        <div>
          <div>
            Added by You
          </div>
          <br/>
          <div>
            <Button onClick={handleDelete} startIcon={<Delete />} color='primary'>
              remove
            </Button>
          </div>
        </div>
        :
        <div>
          Added by
          <Button to={`/users/${blog.user.id}`} component={RouterLink} color='primary'>
            {blog.user.name}
          </Button>
        </div>
      }
      <h3>Comments</h3>
      <form style={{ display:'flex' }} onSubmit={handleAddingComment}>
        <TextField name="comment" size='small' label='Add new comment' variant='outlined'/>
        <Button style={{ marginLeft: 5 }}type="submit" color='primary' variant='contained' size='medium'>
          Add
        </Button>
      </form>
      <div>
        <List>
          {blog.comments.map(comment => (
            <ListItem key={comment}>{comment}</ListItem>
          ))}
        </List>
      </div>
    </div>
  )
}

export default Blog
