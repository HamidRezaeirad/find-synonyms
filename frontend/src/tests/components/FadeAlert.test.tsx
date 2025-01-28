import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FadeAlert } from "../../components";

describe("FadeAlert Component", () => {
  it("renders the alert message when alert is defined", () => {
    render(
      <FadeAlert alert="Test Alert" onFadeTimeout={vi.fn()} timeout={3000} />
    );
    expect(screen.getByText("Test Alert")).toBeInTheDocument();
  });

  it("does not render the alert message when alert is undefined", () => {
    render(
      <FadeAlert alert={undefined} onFadeTimeout={vi.fn()} timeout={3000} />
    );
    expect(screen.queryByText("Test Alert")).not.toBeInTheDocument();
  });

  it("calls onFadeTimeout after the specified timeout", () => {
    vi.useFakeTimers();
    const onFadeTimeoutMock = vi.fn();
    render(
      <FadeAlert
        alert="Test Alert"
        onFadeTimeout={onFadeTimeoutMock}
        timeout={3000}
      />
    );
    vi.advanceTimersByTime(3000);
    expect(onFadeTimeoutMock).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
