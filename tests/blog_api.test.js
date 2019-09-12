const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const Blog = require('../models/blog')
const testHelper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogArray = testHelper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogArray.map((blog) => blog.save())
  await Promise.all(promiseArray)
})


test('get all blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body.length).toBe(testHelper.initialBlogs.length)
})

test('blogs have id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('save a blog post', async () => {
  const postBlog = {
    title: 'React best practices',
    author: 'the me and only me',
    url: 'http://somereactgurud.com',
    likes: 14,
  }
  await api
    .post('/api/blogs')
    .send(postBlog)
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(testHelper.initialBlogs.length + 1)
  const titles = response.body.map(blog => blog.title)
  expect(titles).toContain('React best practices')
})

test('do not save a blog without likes', async () => {
  const postBlog = {
    title: 'React best practices',
    author: 'the me and only me',
    url: 'http://somereactgurud.com',
  }
  await api
    .post('/api/blogs')
    .send(postBlog)
    .expect(400)
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(testHelper.initialBlogs.length)
})
test('do not save a blog without title and url', async () => {
  const postBlog = {
    author: 'the me and only me',
    likes: 0,
  }
  await api
    .post('/api/blogs')
    .send(postBlog)
    .expect(400)
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(testHelper.initialBlogs.length)
})

test('delete a blog post', async () => {
  const beforeDelete = await api.get('/api/blogs')
  await api
    .delete(`/api/blogs/${beforeDelete.body[0].id}`)
    .expect(204)

  const afterDelete = await api.get('/api/blogs')
  expect(afterDelete.body.length).toBe(beforeDelete.body.length - 1)
})

test('Update a blog', async () => {
  const beforeUpdate = await api.get('/api/blogs')
  const sendObj = testHelper.initialBlogs[0]
  sendObj.author = 'ss'
  await api
    .put(`/api/blogs/${beforeUpdate.body[0].id}`)
    .send(sendObj)
    .expect(204)

  const afterUpdate = await api.get('/api/blogs')
  expect(afterUpdate.body.map(blog => blog.author)).toContain('ss')
})

afterAll(() => {
  mongoose.connection.close()
})
