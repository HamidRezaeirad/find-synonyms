import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FadeAlert from "../../components/FadeAlert";
import { useAlertContext } from "../../hooks/useAlertContext";
import { AlertType } from "../../types/alertType";

vi.mock("../../hooks/useAlertContext");

// Mock the `useAlertContext` implementation
const mockUseAlertContext = (
  alert: string | undefined,
  alerType?: AlertType
) => {
  vi.mocked(useAlertContext).mockReturnValue({
    alert,
    alerType,
    onSetAlert: vi.fn(),
  });
};

describe("FadeAlert Component", () => {
  it("renders alert when alert is set", () => {
    mockUseAlertContext("Test Alert", "error");
    render(<FadeAlert />);

    const alert = screen.getByTestId("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Test Alert");
  });

  it("calls onSetAlert with undefined when alert is closed", () => {
    const mockOnSetAlert = vi.fn();
    vi.mocked(useAlertContext).mockReturnValue({
      alert: "Test Alert",
      alerType: "warning",
      onSetAlert: mockOnSetAlert,
    });

    render(<FadeAlert />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnSetAlert).toHaveBeenCalledWith(undefined, "warning");
  });

  it("renders alert when alert is set not alertType not set", () => {
    mockUseAlertContext("Test Alert");
    render(<FadeAlert />);

    const alert = screen.getByTestId("alert");
    expect(alert).toBeInTheDocument();
  });
});
