const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!request.token) {
    return response.status(401).json({
      error: 'token missing'
    })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token invalid'
    })
  }
  const user = await User.findById(decodedToken.id)

  if (!body.title) {
    return response.status(400).json({
      error: 'missing title'
    })
  }
  if (!body.url) {
    return response.status(400).json({
      error: 'missing url'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(decodedToken.id)

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== user.id) {
    return response.status(401).json({
      error: 'cannot remove blog added by another user'
    })
  }

  await blog.remove()

  // await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blogToUpdate = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter