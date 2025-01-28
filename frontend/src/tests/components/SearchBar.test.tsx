import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SearchBar } from "../../components";

describe("SearchBar Component", () => {
  it("renders input field and search button", () => {
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        onClick={() => {}}
        onKeyDown={() => {}}
      />
    );
    const inputElement = screen.getByPlaceholderText(/search for a word.../i);
    const searchButton = screen.getByRole("button", { name: /search/i });

    expect(inputElement).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it("calls onChange handler when input value changes", () => {
    const handleChange = vi.fn();
    render(
      <SearchBar
        value=""
        onChange={handleChange}
        onClick={() => {}}
        onKeyDown={() => {}}
      />
    );
    const inputElement = screen.getByPlaceholderText(/search for a word.../i);
    fireEvent.change(inputElement, { target: { value: "test" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("calls onClick handler when search button is clicked", () => {
    const handleClick = vi.fn();
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        onClick={handleClick}
        onKeyDown={() => {}}
      />
    );
    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("calls onKeyDown handler when a key is pressed in the input field", () => {
    const handleKeyDown = vi.fn();
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        onClick={() => {}}
        onKeyDown={handleKeyDown}
      />
    );
    const inputElement = screen.getByPlaceholderText(/search for a word.../i);
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });
});
