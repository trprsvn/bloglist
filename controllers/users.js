const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body
    const saltRounds = 10
    if (!password || password.length < 3) {
      return response.status(400)
        .json({ error: 'Password is required and must be 3 character long.' })
    }
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({ username, name, passwordHash })
    const savedUser = await user.save()
    response.status(201).json(savedUser.toJSON())
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('blogs', { url: 1, title: 1, author: 1 })
  if (!users) {
    return response.status(404).end()
  }
  response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter
