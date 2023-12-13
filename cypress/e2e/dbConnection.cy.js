const BackendPage = require('../pages/BackendPage')

describe('DB Connection', function() {


    const backendPage = new BackendPage()

    // after(function() {
    //     backendPage.getUserDeleteButton(this.firstName)
    // })

    beforeEach(function() {
        cy.visit('https://techglobal-training.com/backend')

        cy.fixture('user').then((data) => {
            this.firstName = data.firstName
            this.lastName = data.lastName
            this.email = data.email
            this.dob = data.dob
        })
    })
    
    it('Test Database Connection', function() {

        cy.task('runQuery', 'SELECT * FROM student').then((rows) => {
            console.log(JSON.stringify(rows, null, 2))

            // expect(rows).to.have.greaterThan(1)
        })
    })

    /**
     * Test Case 1
     * 
     * 1. Visit "https://techglobal-training.com/backend"
     * 2. Create a valid user
     * 3. Run a query to validate that the user was created
     */

    it('Test Case 1 - Create user and validate in database', function() {

        
        backendPage.createUser(this.firstName, this.lastName, this.email, this.dob)

        cy.task('runQuery', 'SELECT * FROM student WHERE email = \'alicesmith@gmail.com\'').then((rows) => {

            expect(rows).to.have.length(1)


            const alice = rows[0]

            console.log(alice)

            console.log(alice[3] + ' NAME OF THE QUERY')

            const expectedValues = [this.dob, this.email, this.firstName, this.lastName]

            expectedValues.forEach((value, index) => {
                expect(alice[index + 1]).to.equal(value)
            })
        })
    })

        /**
     * Test Case 2
     * 
     * 1. Visit "https://techglobal-training.com/backend"
     * 2. Update a valid user
     * 3. Run a query to validate that the user was updated
     */

        it('Test Case 2 - Update user and validate in database', function() {

            backendPage.getUserEditButton(this.firstName)
            backendPage.getModalEmail().clear().type('john.d.new@gmail.com')
            backendPage.getModalUpdateButton().click()
            backendPage.getEditModal().should('not.exist')
    
            cy.task('runQuery', 'SELECT * FROM student WHERE email = \'john.d.new@gmail.com\'').then((rows) => {
    
                expect(rows).to.have.length(1)
                const alice = rows[0]

    
                const expectedValues = [this.dob, 'john.d.new@gmail.com', this.firstName, this.lastName]
    
                expectedValues.forEach((value, index) => {
                    expect(alice[index + 1]).to.equal(value)
                })
            })
        })

        /**
         * Test Case 3
         * 1. Visit "https://techglobal-training.com/backend"
         * 2. Delete the user you created
         * 3. Run a query to validate that the user was deleted
         */

        it('Test Case 3 - Delete user and validate', function() {

            backendPage.getUserDeleteButton(this.firstName)

            cy.task('runQuery', 'SELECT * FROM student WHERE first_name = \'Alice\' AND last_name = \'Smith\'').then((rows) => {
            
                expect(rows).to.have.length(0)
        })
    })
})