import { render, screen, fireEvent } from "@testing-library/react";
import WizardModal from "./WizardModal";

describe("WizardModal", () => {
  it("renders Step 1 with method options", () => {
    render(<WizardModal onClose={jest.fn()} onComplete={jest.fn()} />);
    expect(screen.getByText(/Step 1: Choose Input Method/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload CSV/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Manually/i)).toBeInTheDocument();
  });

  it("closes when ✖ clicked", () => {
    const onClose = jest.fn(); // mock the close handler
    const onComplete = jest.fn();

    const { getByLabelText } = render(
      <WizardModal
        initialData={null}
        previewMode={false}
        onClose={onClose}
        onComplete={onComplete}
      />
    );

    // Assuming your close button has aria-label="close"
    fireEvent.click(getByLabelText(/close/i));

    // ✅ verify the callback was called
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("goes to manual entry step", () => {
    render(<WizardModal onClose={jest.fn()} onComplete={jest.fn()} />);
    //fireEvent.click(screen.getByText(/Add Manually/i));
    fireEvent.click(screen.getByRole("button", { name: /Add Manual Entry/i }));
    expect(screen.getByText(/Step 2: Add Manual Entries/i)).toBeInTheDocument();
  });

  it("adds a manual entry", () => {
    render(<WizardModal onClose={jest.fn()} onComplete={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /Add Manual Entry/i }));
    const input = screen.getByTestId("player-input");
    fireEvent.change(input, { target: { value: "Player1" } });
    fireEvent.click(screen.getByRole("button", { name: /Add Individual Entry/i }));
    expect(screen.getByText("Player1")).toBeInTheDocument();
  });

  it("disables Next when no manual entries", () => {
    render(<WizardModal onClose={jest.fn()} onComplete={jest.fn()} />);
    fireEvent.click(screen.getByText(/Add Manually/i));
    expect(screen.getByText(/Next/i)).toBeDisabled();
  });
});
