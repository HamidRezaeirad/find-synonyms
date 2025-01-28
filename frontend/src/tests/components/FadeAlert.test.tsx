import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FadeAlert } from "../../components";

describe("FadeAlert Component", () => {
  it("renders the alert message when alert is defined", () => {
    render(<FadeAlert alert="Test Alert" onCloseAlert={vi.fn()} />);
    expect(screen.getByText("Test Alert")).toBeInTheDocument();
  });

  it("does not render the alert message when alert is undefined", () => {
    render(<FadeAlert alert={undefined} onCloseAlert={vi.fn()} />);
    expect(screen.queryByText("Test Alert")).not.toBeInTheDocument();
  });

  it("calls onCloseAlert after click close button", () => {
    const onCloseAlertMock = vi.fn();
    render(<FadeAlert alert="Test Alert" onCloseAlert={onCloseAlertMock} />);
    const closeButton = screen.getByRole("button", { name: /close/i });
    closeButton.click();
    expect(onCloseAlertMock).toHaveBeenCalled();
  });
});
