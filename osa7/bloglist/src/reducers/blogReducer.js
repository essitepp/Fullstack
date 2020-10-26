
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
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


export const setBlogs = (blogs) => {
  return {
    type: 'SET_BLOGS',
    blogs
  }
}

export const addBlog = (blog) => {
  return {
    type: 'ADD_BLOG',
    blog
  }
}

export const updateBlog = (blog) => {
  return {
    type: 'UPDATE_BLOG',
    blog
  }
}

export const removeBlog = (blog) => {
  return {
    type: 'REMOVE_BLOG',
    blog
  }
}

export default blogReducer