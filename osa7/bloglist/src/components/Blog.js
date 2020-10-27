/* eslint-disable no-irregular-whitespace */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, currentUser, update, remove }) => {

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
  }

  const [viewFull, setViewFull] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderColor: 'lightgrey'
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

  if (!viewFull) {
    return(
      <div className='blog-div' style={blogStyle}>
        {blog.title} - {blog.author}
        <button className='view-button' onClick={() => setViewFull(true)}>view</button>
      </div>
    )
  }
  return (
    <div className='blog-div' style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button onClick={() => setViewFull(false)}>hide</button>
      </div>
      <div>
        {blog.url}
      </div>
      <div className='likes'>
        Likes: {blog.likes}
        <button onClick={() => handleLike()}>like</button>
      </div>

      {currentUser && blog.user.username === currentUser.username
        ?
        <div>
          <div>
            Added by You
          </div>
          <div>
            <button onClick={handleDelete}>remove</button>
          </div>
        </div>
        :
        <div>
          Added by {blog.user.name}
        </div>
      }
    </div>
  )
}

export default Blog
