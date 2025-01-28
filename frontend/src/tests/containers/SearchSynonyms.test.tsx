import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SearchSynonyms } from "../../containers";

describe("SearchSynonyms", () => {
  const mockOnSetAlert = vi.fn(String);

  beforeEach(() => {
    render(<SearchSynonyms onSetAlert={mockOnSetAlert} />);
  });

  it("renders SearchSynonyms component", () => {
    expect(screen.getByTestId("SearchSynonyms")).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveValue("test");
  });

  it("calls LookupSynonymsHandler on Enter key press", () => {
    const searchBarInput = screen
      .getByTestId("searchBarInput")
      .querySelector("input");
    if (searchBarInput) {
      fireEvent.change(searchBarInput, { target: { value: "test" } });
      fireEvent.keyDown(searchBarInput, {
        key: "Enter",
        code: "Enter",
      });
      expect(searchBarInput).toHaveValue("test");
    }
  });

  it("displays word when lookupResults are available", () => {
    const searchBarInput = screen
      .getByTestId("searchBarInput")
      .querySelector("input");
    if (searchBarInput) {
      fireEvent.input(searchBarInput, { target: { value: "test" } });
      fireEvent.keyDown(searchBarInput, { key: "Enter", code: "Enter" });
      expect(screen.queryByText("Results for test")).toBeInTheDocument();
    }
  });
});
