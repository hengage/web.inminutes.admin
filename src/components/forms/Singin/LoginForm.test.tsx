import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { GeneralAppSetup } from "@/test/setup";

describe("Login Form", () => {
  beforeEach(() => {
    render(
      <GeneralAppSetup>
        <LoginForm />
      </GeneralAppSetup>
    );
  });

  it("should render the form", () => {
    const emailInput = screen.getByPlaceholderText("work email");
    const submitButton = screen.getByRole("button", { name: "Log In" });
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("allows user to type in email", async () => {
    const emailInput = screen.getByPlaceholderText("work email");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    await waitFor(() => {
      expect(emailInput).toHaveValue("test@example.com");
    });
  });
});
