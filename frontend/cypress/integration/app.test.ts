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
        //cy.wait(['@getCart']).then(() => {

        // cy.get('img').parent().click()

        //     ('have.length', 3)
        //})
    })
    // it('addition', () => {
    //     cy.get('.touch[data-value="2"]').click()
    //     cy.get('.touch[data-value="+"]').click()
    //     cy.get('.touch[data-value="2"]').click()
    //     cy.get('.touch[data-value="="]').click()
    //     cy.get('.result').should('have.text', '4')
    // })

    // it('substraction', () => {
    //     cy.get('.touch[data-value="2"]').click()
    //     cy.get('.touch[data-value="-"]').click()
    //     cy.get('.touch[data-value="2"]').click()
    //     cy.get('.touch[data-value="="]').click()
    //     cy.get('.result').should('have.text', '0')
    // })

    // it('multiplication', () => {
    //     cy.get('.touch[data-value="2"]').click()
    //     cy.get('.touch[data-value="*"]').click()
    //     cy.get('.touch[data-value="2"]').click()
    //     cy.get('.touch[data-value="="]').click()
    //     cy.get('.result').should('have.text', '4')
    // })

    // it('division', () => {
    //     cy.get('.touch[data-value="2"]').click()
    //     cy.get('.touch[data-value="/"]').click()
    //     cy.get('.touch[data-value="2"]').click()
    //     cy.get('.touch[data-value="="]').click()
    //     cy.get('.result').should('have.text', '1')
    // })

    // it('modulo', () => {
    //     cy.get('.touch[data-value="2"]').click()
    //     cy.get('.touch[data-value="%"]').click()
    //     cy.get('.touch[data-value="2"]').click()
    //     cy.get('.touch[data-value="="]').click()
    //     cy.get('.result').should('have.text', '0')
    // })

    // it('square', () => {
    //     cy.get('.touch[data-value="4"]').click()
    //     cy.get('.touch[data-value="√x"]').click()
    //     cy.get('.touch[data-value="="]').click()
    //     cy.get('.result').should('have.text', '2')
    // })

})