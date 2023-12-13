class BackendPage {

    getFirstName(){
        return cy.get('[name="firstName"]')
      }
      getLastName(){
        return cy.get('[name="lastName"]')
      }
      getEmail(){
        return cy.get('[name="email"]')
      }
      getDOB(){
        return cy.get('[name="dob"]')
      }
      getAddButoon(){
        return cy.get('[type="submit"]')
      }
      getUserList(){
        return cy.get('.common_listContainer__cvSer')
      }

      getUserEditButton(user){
        return this.getUserList()
        .contains('.common_list__UR80V', user)
        .contains('EDIT')
        .click()
      }

      getUserDeleteButton(user){
        return this.getUserList()
        .contains('.common_list__UR80V', user)
        .contains('DELETE')
        .click()
      }

      getEditModal(){
        return cy.get('#mymodal')
      }

      getModalEmail(){
        return this.getEditModal().find('[name="email"]')
      }

      getModalUpdateButton(){
        return this.getEditModal().find('.common_row__fyD66 > button')
      }

      getSpecificUser(user){
        return this.getUserList().contains(user)
      }

      getSpecificuserEmail(user, email){
        return this.getSpecificUser(user).contains(email)
      }

      getDeleteAllButton(){
        return cy.get('.common_undernav__spCsm > button')
      }

      getNumberofActiveUsers(){
        return cy.get('.common_count__B2RKH')
      }

      createUser(firstName, lastName, email, dob){
        this.getFirstName().type(firstName)
        this.getLastName().type(lastName)
        this.getEmail().type(email)
        this.getDOB().type(dob)
        this.getAddButoon().click()
      }
}


module.exports = BackendPage