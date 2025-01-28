import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AddSynonyms from "../../containers/AddSynonyms";

describe("AddSynonyms Component", () => {
  const mockOnSetAlert = vi.fn(String);

  beforeEach(() => {
    render(<AddSynonyms onSetAlert={mockOnSetAlert} />);
  });

  it("renders the component correctly", () => {
    expect(screen.getByText("Add New Word")).toBeInTheDocument();
    expect(screen.getByTestId("Word")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Synonyms/i })
    ).toBeInTheDocument();
  });

  it("validates word input correctly", () => {
    const wordInput = screen.getByTestId("Word").querySelector("input");

    if (wordInput) {
      fireEvent.change(wordInput, { target: { value: "" } });
      fireEvent.blur(wordInput);
      expect(screen.getByText("Word cannot be empty.")).toBeInTheDocument();

      fireEvent.change(wordInput, { target: { value: "a".repeat(31) } });
      fireEvent.blur(wordInput);
      expect(
        screen.getByText("Word cannot exceed 30 characters.")
      ).toBeInTheDocument();

      fireEvent.change(wordInput, { target: { value: "validword" } });
      fireEvent.blur(wordInput);
      expect(
        screen.queryByText("Word cannot be empty.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Word cannot exceed 30 characters.")
      ).not.toBeInTheDocument();
    }
  });

  it("adds and deletes synonyms correctly", () => {
    const synonymsInput = screen.getByTestId("Synonyms").querySelector("input");

    if (synonymsInput) {
      fireEvent.change(synonymsInput, { target: { value: "synonym1" } });
      fireEvent.keyDown(synonymsInput, { key: "Enter" });

      expect(screen.queryByText("synonym1")).toBeInTheDocument();

      const deleteButton = screen.getByTestId("delete-synonym1");
      fireEvent.click(deleteButton);
      expect(screen.queryByText("synonym1")).not.toBeInTheDocument();
    }
  });

  it("shows error when trying to add synonyms without a word", () => {
    const addButton = screen.getByRole("button", { name: /Add Synonyms/i });

    fireEvent.click(addButton);
    expect(screen.getByText("Word cannot be empty.")).toBeInTheDocument();
    expect(
      screen.getByText("At least one synonym is required.")
    ).toBeInTheDocument();
  });
});
