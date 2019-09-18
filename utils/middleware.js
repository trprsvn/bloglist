const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  next(error)
}

const getTokenFrom = (request, response, next) => {
  const authorization = request.get('authorization')
  if (!authorization || !authorization.toLowerCase().startsWith('bearer')) {
    request.token = null
  } else {
    request.token = authorization.substring('bearer '.length)
  }
  next()
}
module.exports = { errorHandler, getTokenFrom }
