import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "../App";

describe("App Component", () => {
  test("renders Navbar component", () => {
    render(<App />);
    const navbarElement = screen.getByTestId("navigation");
    expect(navbarElement).toBeInTheDocument();
  });

  test("renders Find Synonyms heading", () => {
    render(<App />);
    const headingElement = screen.queryByText(/Find Synonyms/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("renders SearchSynonyms component", () => {
    render(<App />);
    const searchSynonymsElement = screen.getByTestId("Word");
    expect(searchSynonymsElement).toBeInTheDocument();
  });

  test("renders AddSynonyms component", () => {
    render(<App />);
    const addSynonymsElement = screen.queryByText(/Add New Word/i);
    expect(addSynonymsElement).toBeInTheDocument();
  });

  test("displays alert message when setAlert is called", () => {
    render(<App />);
    const searchSynonymsElement = screen.getByTestId("searchBarInput");
    fireEvent.change(searchSynonymsElement, { target: { value: "test" } });
    fireEvent.keyDown(searchSynonymsElement, { key: "Enter", code: "Enter" });
    const resultsElement = screen.queryByText("Results for test");
    expect(resultsElement).toBeInTheDocument();
  });
});
