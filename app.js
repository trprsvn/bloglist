const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const { MONGODB_URI } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')


const connection = async () => {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
}

try {
  connection()
} catch (exception) {
  console.error(exception, 'Failed to connect mongodb')
}
app.use(middleware.getTokenFrom)
app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)
module.exports = app
