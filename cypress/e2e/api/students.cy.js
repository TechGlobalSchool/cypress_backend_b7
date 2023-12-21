import { postRequestBody, putRequestBody } from '../../fixtures/testData.json'

describe('CRUD Operations', () => {

    let studentId

    it('Create a new student using POST', () => {


        cy.request({
            method: 'POST',
            url: Cypress.env('baseUrl'),
            body: postRequestBody,
            headers: {
                'Authorization' : 'Bearer YOUR_TOKEN'
            }
        }).then((response) => {
            console.log(JSON.stringify(response.body, null, 2))

            // const numbers = [1, 2, 3]
            // const [first, second ] = numbers
            // console.log(first) // Outputs: 1
            // console.log(second) // Outputs: 2
            //["firstName", "Pierce"]
            // Object.entries(postRequestBody).forEach(([key, value]) => {
            //     expect(response.body[key]).to.equal(value)
            //     cy.log(response.body[key] + ' value of ' + key)
            //     cy.log(value + ' coming from the request')
            // })
            studentId = response.body.id
            cy.validateResponse(response, postRequestBody)
        })
    })

    it('Read the created student using GET', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/${studentId}`
        }).then((response) => {
            expect(response.status).to.equal(200)
            cy.log(JSON.stringify(response.body, null, 2))
        })
    })

    it('Update user using PUT', () => {

        cy.request({
            method: 'PUT',
            url: `${Cypress.env('baseUrl')}/${studentId}`,
            body: putRequestBody
        }).then((response) => {
            expect(response.status).to.equal(200)
            cy.validateResponse(response, putRequestBody)
        })
    })

    it('Read the updated student GET', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/${studentId}`
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.below(200)
            expect(response.body.firstName).to.equal(putRequestBody.firstName)
        })
    })


    it('Delete the user DELETE', () => {

        cy.request({
            method: 'DELETE',
            url: `${Cypress.env('baseUrl')}/${studentId}`
        }).then((response) => {
            expect(response.status).to.equal(200)
        })
    })
})