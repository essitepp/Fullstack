/* eslint-disable no-irregular-whitespace */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog, currentUser, update, remove, addComment, url, viewFull=true }) => {

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
  }

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

  const handleAddingComment = (event) => {
    event.preventDefault()
    const comment = {
      comment: event.target.comment.value
    }
    event.target.comment.value = ''
    addComment(blog, comment)
  }

  if (!viewFull) {
    return(
      <div className='blog-div' style={blogStyle}>
        <Link to={url}>{blog.title} - {blog.author}</Link>
      </div>
    )
  }
  return (
    <div>
      <h2>{blog.title} - {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
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
      <h3>comments</h3>
      <form onSubmit={handleAddingComment}>
        <input name="comment"/>
        <button type="submit">
          add comment
        </button>
      </form>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
