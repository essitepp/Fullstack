import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { TextField, Button } from '@material-ui/core'

const BlogForm = ({ createBlog }) => {

  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl ] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const margins = { marginTop : 5 }
  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            id='title'
            label="Title"
            variant='filled'
            size='small'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <TextField
            id='author'
            label="Author"
            variant='filled'
            size='small'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <TextField
            id='url'
            label="Url"
            variant='filled'
            size='small'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <Button
          id='submit-button'
          type='submit'
          variant='contained'
          color='primary'
          style={margins}
        >
          Add
        </Button>
      </form>
    </div>
  )
}

export default BlogForm