import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { TagInput } from "../../components";

describe("TagInput Component", () => {
  const setup = () => {
    const handleAddTag = vi.fn();
    const handleDeleteTag = vi.fn();
    const setInputValue = vi.fn();
    const utils = render(
      <TagInput
        tags={["tag1", "tag2"]}
        inputValue=""
        setInputValue={setInputValue}
        handleAddTag={handleAddTag}
        handleDeleteTag={handleDeleteTag}
      />
    );
    const input = utils.getByPlaceholderText("Type a synonym and press Enter");
    return {
      input,
      handleAddTag,
      handleDeleteTag,
      setInputValue,
      ...utils,
    };
  };

  test("renders input field and tags", () => {
    setup();
    expect(
      screen.getByPlaceholderText("Type a synonym and press Enter")
    ).toBeInTheDocument();
    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();
  });

  test("calls setInputValue on input change", () => {
    const { input, setInputValue } = setup();
    fireEvent.change(input, { target: { value: "new tag" } });
    expect(setInputValue).toHaveBeenCalledWith("new tag");
  });

  test("calls handleAddTag on Enter key press", () => {
    const { input, handleAddTag } = setup();
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(handleAddTag).toHaveBeenCalled();
  });

  test("calls handleDeleteTag on delete icon click", () => {
    const { handleDeleteTag } = setup();
    fireEvent.click(screen.getByTestId("delete-tag1"));
    expect(handleDeleteTag).toHaveBeenCalledWith("tag1");
  });
});
