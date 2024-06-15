/// <reference types="Cypress" />

describe("Note-Taking App", () => {
  it("should visit the note-taking application", () => {
    cy.visit("https://note-react-app-frontend-9297f33085da.herokuapp.com/")
    cy.url().should(
      "eq",
      "https://note-react-app-frontend-9297f33085da.herokuapp.com/"
    )
  })

  it("should display a list of previous notes based on the count", () => {
    cy.intercept(
      "get",
      "https://note-react-json-db-995df07f909e.herokuapp.com/notes"
    ).as("getNotes")
    cy.visit("https://note-react-app-frontend-9297f33085da.herokuapp.com")
    cy.url().should(
      "eq",
      "https://note-react-app-frontend-9297f33085da.herokuapp.com/"
    )
    cy.wait("@getNotes").then((res) => {
      console.log(res)
      const noteCount = res.response.body.length
      console.log(noteCount)
      cy.get("div.notes-list a").its("length").should("eq", noteCount)
    })
  })

  it("should create a new note when clicking add button then back/done", () => {
    cy.visit("https://note-react-app-frontend-9297f33085da.herokuapp.com/")
    cy.intercept(
      "get",
      "https://note-react-json-db-995df07f909e.herokuapp.com/notes"
    ).as("getNotes")
    cy.get('svg[class="floating-button"]').click()
    cy.url().should(
      "eq",
      "https://note-react-app-frontend-9297f33085da.herokuapp.com/note/new"
    )
    cy.get('textarea[placeholder="Edit note"]').type(
      "Test Title{enter}-Test note"
    )
    cy.get("svg#icon-chevron-double-left").click()
    cy.wait("@getNotes").then((res) => {
      cy.get("div.notes-list a")
        .its("length")
        .should("eq", res.response.body.length)
    })
  })

  it("should open note when you click on it", () => {
    cy.visit("https://note-react-app-frontend-9297f33085da.herokuapp.com/")
    cy.get("div.notes-list a")
      .its("length")
      .then((listCount) => {
        expect(listCount, "No items found").to.be.greaterThan(0)
        cy.get("div.notes-list a").first().click()
        cy.request(
          "https://note-react-json-db-995df07f909e.herokuapp.com/notes"
        ).then((response) => {
          const noteId = response.body[0].id
          cy.url().should(
            "eq",
            `https://note-react-app-frontend-9297f33085da.herokuapp.com/note/${noteId}`
          )
        })
      })
  })

  // it("should modify existing note and save when back button is clicked", () => {
  //   cy.intercept(
  //     "get",
  //     "https://note-react-json-db-995df07f909e.herokuapp.com/notes"
  //   ).as("getNotes")
  //   cy.visit("https://note-react-app-frontend-9297f33085da.herokuapp.com/")
  //   cy.get("div.notes-list a")
  //     .its("length")
  //     .then((listCount) => {
  //       expect(listCount, "No items found").to.be.greaterThan(0)
  //       cy.get("div.notes-list a").first().click()
  //       cy.get('textarea[placeholder="Edit note"]').type(
  //         "{end}{enter}-Test To-Do"
  //       )
  //       cy.get("svg#icon-chevron-double-left").click()
  //       cy.wait("@getNotes").then(() => {
  //         cy.get(
  //           "#root > div > div > div.notes > div.notes-list > a:nth-child(1) > div > p"
  //         ).should("contain.text", "-Test To-Do")
  //       })
  //     })
  // })
})
