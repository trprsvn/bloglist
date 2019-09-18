const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)
const helper = require('./test_helper')

describe('Add user', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const aUser = new User({
      username: 'hasan',
      name: 'Hasan H',
      password: 'supersecret',
    })
    await aUser.save()
  })
  test('creates user if their username did not taken previously', async () => {
    const beforePost = await helper.allUsers()
    const result = await api
      .post('/api/users')
      .send({
        username: 'hasan',
        name: 'Hasan H',
        password: 'supersecret',
      })
      .expect(400)
    expect(result.body.error).toContain('Error, expected `username` to be unique')
    const afterPost = await helper.allUsers()
    expect(beforePost.length).toBe(afterPost.length)
  })

  test('creates user if their username is longer than 3 character', async () => {
    const beforePost = await helper.allUsers()
    const result = await api
      .post('/api/users')
      .send({
        username: 'SM',
        name: 'Clark Kent',
        password: 'dailyPlanet',
      })
      .expect(400)
    expect(result.body.error).toContain('shorter than the minimum allowed length')
    const afterPost = await helper.allUsers()
    expect(beforePost.length).toBe(afterPost.length)
  })

  test('creates user if their password is longer than 3 character', async () => {
    const beforePost = await helper.allUsers()
    const result = await api
      .post('/api/users')
      .send({
        username: 'superman',
        name: 'Clark Kent',
        password: 'dp',
      })
      .expect(400)
    expect(result.body.error).toContain('must be 3 character long.')
    const afterPost = await helper.allUsers()
    expect(beforePost.length).toBe(afterPost.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
