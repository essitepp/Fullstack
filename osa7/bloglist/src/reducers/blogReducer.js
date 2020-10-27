import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_BLOGS':
      return sortBlogs(action.blogs)
    case 'ADD_BLOG':
      return state.concat(action.blog)
    case 'UPDATE_BLOG':
      return sortBlogs(state.map(blog => {
        if (blog.id === action.blog.id) {
          return action.blog
        }
        return blog
      }))
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.blog.id)
    default:
      return state
  }
}

const sortBlogs = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE_BLOGS',
      blogs
    })
  }
}

export const addBlog = (blog) => {
  return {
    type: 'ADD_BLOG',
    blog
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      blog: updatedBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      blog
    })
  }
}

export default blogReducer