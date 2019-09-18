const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'How to cheat death',
    author: 'The Ripper',
    url: 'http://endoftheroad.com',
    likes: 4,
  },
  {
    title: 'How to blow the brain',
    author: 'Math teacher',
    url: 'http://solved.com',
    likes: 2,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'dummyText',
    author: 'dummy author',
    url: 'http://dummylink.com',
    likes: 3,
  })
  const result = await blog.save()
  await blog.remove()
  return result._id.toString()
}

const allUsers = async () => {
  const users = await User.find({})
  return users
}

module.exports = {
  nonExistingId, initialBlogs, allUsers,
}
