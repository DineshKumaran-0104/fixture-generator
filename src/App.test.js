import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App integration test with WizardModal", () => {
  it("should open and close the WizardModal when X is clicked", () => {
    render(<App />);

    // 1️⃣ Modal should NOT be in DOM initially
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // 2️⃣ Open modal by clicking "Add Teams/Players"
    fireEvent.click(screen.getByText(/add teams\/players/i));

    // 3️⃣ Modal should now exist
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // 4️⃣ Close the modal (❌ button)
    // ⚠️ Ensure your close button in WizardModal has aria-label or testid
    // Example: <button aria-label="close">❌</button>
    fireEvent.click(screen.getByLabelText(/close/i));

    // 5️⃣ Modal should be removed
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});