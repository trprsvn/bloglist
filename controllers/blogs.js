const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const { SECRET } = require('../utils/config')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const { token } = request
  const unpackedToken = jwt.verify(token, SECRET)
  if (!unpackedToken || !unpackedToken.id) {
    return response.status(401).json({ error: 'invalid or missing token' })
  }
  const user = await User.findById(unpackedToken.id)
  const blog = new Blog(request.body)
  blog.user = user._id
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const { token } = request
  const decodedToken = jwt.verify(token, SECRET)
  try {
    const blog = await Blog.findById(request.params.id)
    if (!decodedToken || !decodedToken.id
         || blog.user.toString() !== decodedToken.id.toString()) {
      return response.status(401).json({ error: 'missing or invalid token' })
    }
    await blog.remove()
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const idToUpdate = request.params.id
  const blog = request.body
  try {
    const result = await Blog.findByIdAndUpdate(idToUpdate, blog, { new: true })
    response.status(204).json(result.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
