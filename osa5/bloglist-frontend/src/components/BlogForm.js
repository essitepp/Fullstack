import React, { useState } from 'react'
import PropTypes from 'prop-types'

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

  return (
    <div>
      <h3>Add new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          title{' '}
          <input
            name='title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author{' '}
          <input
            name='author'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url{' '}
          <input
            name='url'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type='submit'>add blog</button>
      </form>
    </div>
  )
}

export default BlogForm