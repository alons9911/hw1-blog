describe('Navigation to Login', () => {
    it('should navigate to the Login page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        // Find a link with an href attribute containing "login" and click it
        cy.get('a[href*="login"]').click()

        // The new url should include "/login"
        cy.url().should('include', '/login')

        // The new page should contain an h1 with "Log In"
        cy.get('h1').contains('Log In')
    })
})

describe('Navigation to SignUp', () => {
    it('should navigate to the Login page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        // Find a link with an href attribute containing "signup" and click it
        cy.get('a[href*="signup"]').click()

        // The new url should include "/signup"
        cy.url().should('include', '/signup')

        // The new page should contain an h1 with "Sign Up"
        cy.get('h1').contains('Sign Up')
    })
})

describe('Signup with invalid email', () => {
    it('should stay in signup page and not navigate to login page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        // Find a link with an href attribute containing "signup" and click it
        cy.get('a[href*="signup"]').click()

        // The new url should include "/signup"
        cy.url().should('include', '/signup')

        // The new page should contain an h1 with "Sign Up"
        cy.get('#username').type('test')
        cy.get('#password').type('test1234')
        cy.get('#email').type('test')
        cy.get('#name').type('test')
        cy.get('button').click()
        cy.url().should('include', '/signup')
    })
})


describe('Signup with invalid password', () => {
    it('should stay in signup page and not navigate to login page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        // Find a link with an href attribute containing "signup" and click it
        cy.get('a[href*="signup"]').click()

        // The new url should include "/signup"
        cy.url().should('include', '/signup')

        // The new page should contain an h1 with "Sign Up"
        cy.get('#username').type('test')
        cy.get('#password').type('test')
        cy.get('#email').type('test@gmail.com')
        cy.get('#name').type('test')
        cy.get('button').click()
        cy.url().should('include', '/signup')
    })
})

describe('Fully signup and login flow', () => {
    it('should successfully signup and login with new user', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        cy.get('a[href*="signup"]').click()

        cy.url().should('include', '/signup')

        const userNumber = Math.floor(Math.random() * 1000);
        cy.get('#username').type(`test${userNumber}`)
        cy.get('#password').type('test1234')
        cy.get('#email').type(`test${userNumber}@gmail.com`)
        cy.get('#name').type('test')
        cy.get('button').click()
        cy.url().should('include', '/login')
        cy.get('#username').type(`test${userNumber}`)
        cy.get('#password').type('test1234')
        cy.get('button').click()
        cy.get('h1').contains('Public Feed')
    })
})

describe('Signup and Login with incorrect password', () => {
    it('should successfully signup and unsuccessfully login with new user', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        cy.get('a[href*="signup"]').click()

        cy.url().should('include', '/signup')

        const userNumber = Math.floor(Math.random() * 1000);
        cy.get('#username').type(`test${userNumber}`)
        cy.get('#password').type('test1234')
        cy.get('#email').type(`test${userNumber}@gmail.com`)
        cy.get('#name').type('test')
        cy.get('button').click()
        cy.url().should('include', '/login')
        cy.get('#username').type(`test${userNumber}`)
        cy.get('#password').type('test')
        cy.get('button').click()
        cy.get('h1').contains('Log In')
        cy.url().should('include', '/login')
    })
})