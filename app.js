const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const { MONGODB_URI } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to Mongodb')
  })
  .catch((error) => {
    console.log('error connection to Mongo', error.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)
app.use(middleware.errorHandler)
module.exports = app
