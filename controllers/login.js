const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { SECRET } = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)
  if (!(user && passwordCorrect)) {
    return response.status(404).json({
      error: 'invalid password or username',
    })
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = await jwt.sign(userForToken, SECRET)

  response.send({
    token, username: user.username, name: user.name,
  })
})

module.exports = loginRouter
