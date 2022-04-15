import cypress from 'cypress'

describe('App', () => {
    before(() => cy.task('mockServer', {
        baseUrl: `http://localhost:8000/api`, mocks: [
            { method: 'GET', route: '/api/cart', fixture: 'getCart.json' },
            { method: 'POST', route: '/api/cart/1', fixture: 'addProduct.json' },
            { method: 'POST', route: '/api/cart/2', fixture: 'addProductError.json' },
            { method: 'DELETE', route: '/api/cart/1', fixture: 'removeProduct.json' },
            { method: 'GET', route: '/api/products', fixture: 'getProducts.json' },
        ]
    }))
    beforeEach(() => cy.visit('http://localhost:3000'))
    after(() => cy.task('stopServer'))

    it('common elements', () => {
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
        cy.title().should('include', 'React App')
    })

    it('product count', () => {
        //cy.wait(['@getCart']).then(() => {
        cy.get('img').should('have.length', 3)
        //})
    })

    it('test button cart', () => {

        cy.get('img').parent().click()
        cy.get('input').should('have.type', "number")
    })
})