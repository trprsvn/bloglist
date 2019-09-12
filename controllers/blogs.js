const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  try {
    const result = await blog.save()
    response.status(201).json(result.toJSON)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const idToDelete = request.params.id
  try {
    await Blog.findByIdAndRemove(idToDelete)
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
