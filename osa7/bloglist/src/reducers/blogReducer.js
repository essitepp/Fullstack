
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return sortBlogs(action.data)
    case 'ADD_BLOG':
      return state.concat(action.data)
    default:
      return state
  }
}

const sortBlogs = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

export const addBlog = (blog) => {
  return {
    type: 'ADD_BLOG',
    data: blog
  }
}

export const setBlogs = (blogs) => {
  return {
    type: 'SET_BLOGS',
    data: blogs
  }
}

export default blogReducer