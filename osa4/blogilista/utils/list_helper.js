const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  },0)
}

const favoriteBlog = (blogs) => {

  return blogs.reduce((bestBlog, blog) => {
    if (blog.likes > bestBlog.likes) {
      return blog
    }
    return bestBlog
  }, blogs[0])
}

const mostBlogs = (blogs) => {
  const authors = (blogs.map(blog => blog.author))
  const blogsByAuthor = []
  authors.forEach(author => {
    (blogsByAuthor[author])
      ? blogsByAuthor[author]++
      : blogsByAuthor[author] = 1
  })
  let bestAuthor = authors[0]
  _.uniq(authors).forEach(author => {
    if (blogsByAuthor[author] > blogsByAuthor[bestAuthor]) {
      bestAuthor = author
    }
  })
  return {
    author: bestAuthor,
    blogs: blogsByAuthor[bestAuthor]
  }
}

const mostLikes = (blogs) => {
  const likesByAuthor = []
  blogs.forEach(blog => {
    (likesByAuthor[blog.author])
      ? likesByAuthor[blog.author] += blog.likes
      : likesByAuthor[blog.author] = blog.likes
  })
  let bestAuthor = blogs[0].author
  _.uniq(blogs.map(blog => blog.author)).forEach(author => {
    if (likesByAuthor[author] > likesByAuthor[bestAuthor]) {
      bestAuthor = author
    }
  })
  return {
    author: bestAuthor,
    likes: likesByAuthor[bestAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}