describe('Blog app', function() {
  const name = 'testPerson'
  const username = 'testUser'
  const password = 'testPassword'

  const wrongPassword = 'wrongPassword'

  const anotherName = 'testPerson2'
  const anotherUsername = 'testUser2'
  const anotherPassword = 'testPassword2'


  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: name,
      username: username,
      password: password
    }
    const user2 = {
      name: anotherName,
      username: anotherUsername,
      password: anotherPassword
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(username)
      cy.get('#password').type(password)
      cy.get('#login-button').click()

      cy.get('html').should('contain', `${name} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(username)
      cy.get('#password').type(wrongPassword)
      cy.get('#login-button').click()

      cy.get('html').should('not.contain', 'logged in')

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

    })
  })


  describe('When some blogs have been added', function() {
    beforeEach(function() {
      cy.login({ username: username, password: password })
      cy.createBlog({
        title: 'firstBlog',
        author: 'firstAuthor',
        url: 'firstUrl'
      })
      cy.createBlog({
        title: 'secondBlog',
        author: 'secondAuthor',
        url: 'secondUrl'
      })
      cy.createBlog({
        title: 'thirdBlog',
        author: 'thirdAuthor',
        url: 'thirdUrl'
      })
    })

    it('a blog can be liked', function() {
      cy.contains('firstBlog').as('blog')

      cy.get('@blog').contains('view').click()
      cy.get('@blog').contains('like').click()

      cy.get('@blog').contains('Likes: 1')
    })

    it.only('blogs are sorted by like count', function() {
      cy.contains('thirdBlog').as('blog3')
      cy.contains('secondBlog').as('blog2')

      cy.get('.view-button').click({ multiple: true })

      cy.get('@blog3').contains('like').click()
      cy.get('@blog2').contains('like').click()
      cy.get('@blog2').contains('like').click()


      cy.get('div.likes').eq(0).then(result => {
        const likes1 = Number(result[0].childNodes[1].data)

        cy.get('div.likes').eq(1).then(result => {
          const likes2 = Number(result[0].childNodes[1].data)
          expect(likes1).to.be.greaterThan(likes2-1)

          cy.get('div.likes').eq(2).then(result => {
            const likes3 = Number(result[0].childNodes[1].data)
            expect(likes2).to.be.greaterThan(likes3-1)
          })
        })
      })

    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: username, password: password })
      })

      it('a blog can be created', function() {
        cy.contains('add blog').click()

        cy.get('#title').type('testTitle')
        cy.get('#author').type('testAuthor')
        cy.get('#url').type('testUrl')
        cy.get('#submit-button').click()

        cy.contains('testTitle - testAuthor')

      })

      it('a blog can be deleted by the user who added it', function() {
        cy.contains('firstBlog').as('blog')

        cy.get('@blog').contains('view').click()
        cy.get('@blog').contains('remove').click()

        cy.get('html').should('not.contain', 'firstBlog')
      })

      it('a blog cannot be deleted by a different user', function() {
        cy.contains('log out').click()
        cy.login({ username: anotherUsername, password: anotherPassword })

        cy.contains('firstBlog').as('blog')

        cy.get('@blog').contains('view').click()
        cy.get('@blog').should('not.contain', 'remove')
      })
    })
  })
})