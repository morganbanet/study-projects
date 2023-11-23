const baseURL = "http://localhost:3000/";

describe("payment", () => {
  it("user can make a payment", () => {
    // --> login
    cy.visit(`${baseURL}/`);

    // Instead of screen cypress uses "cy" and getByRole is replaced
    // with "findByRole"
    cy.findByRole("textbox", { name: /username/i }).type("johndoe");
    cy.findByLabelText(/password/i).type("s3cret");

    // --> check account balance
    // --> click on pay buttom
    // search for user
    // add amount and note and click pay
    // click return to transactions
    // go to personal payments
    // click on payment
    // verify if payment was made
    // verify if payment amount was deducted
  });
});
