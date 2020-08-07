const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'a blog!',
    author: 'some blogger',
    url: 'https://fullstackopen.com/',
    likes: 5
  },
  {
    title: 'another blog',
    author: 'another blogger',
    url: 'https://fullstackopen.com/',
    likes: 2
  }
]

const initialUsers = [
  {
    username: 'user1',
    name: 'person1',
    password: 'secret1'
  },
  {
    username: 'user2',
    name: 'person2',
    password: 'secret2'
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()


  await User.deleteMany({})

  let passwordHash = await bcrypt.hash(initialUsers[0].password, 10)
  let userObject = new User({ username: initialUsers[0].username, passwordHash })
  await userObject.save()

  passwordHash = await bcrypt.hash(initialUsers[1].password, 10)
  userObject = new User({ username: initialUsers[1].username, passwordHash })
  await userObject.save()

})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog identifier is called id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

describe('when a user is logged in', () => {
  let token = ''
  beforeEach(async () => {
    const passwordHash = await bcrypt.hash('testSecret', 10)
    const user = new User({ username: 'testUser', passwordHash})
    await user.save()

    const response = await api
      .post('/api/login')
      .send({ username: 'testUser', password: 'testSecret' })
    token = response.body.token
  })
  describe('when adding a blog', () => {
    test('a valid blog can be added', async () => {

      const newBlog = {
        title: 'a new blog',
        author: 'popular author',
        url: 'https://fullstackopen.com/',
        likes: 8
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      expect(response.body.length).toBe(initialBlogs.length + 1)
      const titles = response.body.map(b => b.title)
      expect(titles).toContain('a new blog')
    })

    test('adding blog fails with correct status code if token missing', async () => {
      const newBlog = {
        title: 'a new blog',
        author: 'popular author',
        url: 'https://fullstackopen.com/',
        likes: 8
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const response = await api.get('/api/blogs')
      expect(response.body.length).toBe(initialBlogs.length)
    })

    test('likes are set to 0 by default', async () => {
      const newBlog = {
        title: 'a new blog',
        author: 'popular author',
        url: 'https://fullstackopen.com/'
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(response.body.likes).toBe(0)
    })

    test('blog must contain title and url', async () => {
      const blogWithoutUrl = {
        title: 'a new blog',
        author: 'popular author',
      }
      const blogWithoutTitle = {
        author: 'popular author',
        url: 'https://fullstackopen.com/'
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(blogWithoutUrl)
        .expect(400)

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(blogWithoutTitle)
        .expect(400)
    })
  })

  test('deleting blog succeeds with valid id', async () => {

    const newBlog = {
      title: 'a blog',
      url: 'https://fullstackopen.com/'
    }

    let response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
    const blogToDelete = response.body

    response = await api.get('/api/blogs')
    const initialBlogCount = response.body.length

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogCount - 1)
  })

  test('updating blog succeeds with valid data', async () => {
    let response = await api.get('/api/blogs')

    const blogToUpdate = response.body[0]
    blogToUpdate.likes += 2

    response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    expect(response.body.likes).toBe(blogToUpdate.likes)
  })
})




test('adding user succeeds with valid data', async () => {
  const newUser = {
    username: 'newUser',
    name: 'newPerson',
    password: 'newSecret'
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')
  expect(response.body.length).toBe(initialUsers.length + 1)
})

test('adding user fails with invalid data', async () => {
  const noUsername = {
    name: 'newPerson',
    password: 'newSecret'
  }
  const usernameTooShort = {
    username: 'n',
    name: 'newPerson',
    password: 'newSecret'
  }
  const noPassword = {
    username: 'newUser1',
    name: 'newPerson',
  }
  const passwordTooShort = {
    username: 'newUser1',
    name: 'newPerson',
    password: 'n'
  }
  let response = await api
    .post('/api/users')
    .send(noUsername)
    .expect(400)
  expect(response.body.error).toContain('`username` is required')
  response = await api.get('/api/users')
  expect(response.body.length).toBe(initialUsers.length)

  response = await api
    .post('/api/users')
    .send(usernameTooShort)
    .expect(400)
  expect(response.body.error).toContain('shorter than the minimum allowed length')
  response = await api.get('/api/users')
  expect(response.body.length).toBe(initialUsers.length)

  response = await api
    .post('/api/users')
    .send(noPassword)
    .expect(400)
  expect(response.body.error).toContain('password must be at least 3 characters long')
  response = await api.get('/api/users')
  expect(response.body.length).toBe(initialUsers.length)

  response = await api
    .post('/api/users')
    .send(passwordTooShort)
    .expect(400)
  expect(response.body.error).toContain('password must be at least 3 characters long')
  response = await api.get('/api/users')
  expect(response.body.length).toBe(initialUsers.length)

})


afterAll(() => {
  mongoose.connection.close()
})