import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

//
describe("TransactionCreateStepTwo", () => {
  // it("on initial render, the pay button is disabled", async () => {
  //   // Formik package enabled buttons for split second, so async/await
  //   render(<TransactionCreateStepTwo sender={{ id: "5" }} receiver={{ id: "5" }} />);
  //   const payButton = await screen.findByRole("button", { name: /pay/i });
  //   expect(payButton).toBeDisabled();
  // });

  // Combine multiple unit tests into one integration test. Combining
  // multiple unit tests can be preferable as they often better resemble
  // how a user will interact with the application.
  // If multiple unit tests can be combined into a single integration
  // test, it is usually recommended to do so.
  // A few integration tests are often better than many unit tests.
  it("if an amount and note is entered, the pay button becomes enabled", async () => {
    render(<TransactionCreateStepTwo sender={{ id: "5" }} receiver={{ id: "5" }} />);

    expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();

    const nameField = screen.getByPlaceholderText(/amount/i);
    const noteField = screen.getByPlaceholderText(/add a note/i);
    userEvent.type(nameField, "50");
    userEvent.type(noteField, "Dinner");

    expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
  });
});
