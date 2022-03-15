import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import TagsInput from "./tags-input";

const mockOnTagsChangeFn = jest.fn();

describe("TagsInput", () => {
  it("renders component", () => {
    render(
      <TagsInput
        name="field"
        tags={["first", "second"]}
        onTagsChange={mockOnTagsChangeFn}
      />
    );
    expect(screen.getByTestId("tags-input")).toBeInTheDocument();
  });
  it("renders component with tags", () => {
    render(
      <TagsInput
        name="field"
        tags={["first", "second"]}
        onTagsChange={mockOnTagsChangeFn}
      />
    );
    expect(screen.getAllByTestId("tag")).toHaveLength(2);
    expect(screen.getByText("first")).toBeInTheDocument();
    expect(screen.getByText("second")).toBeInTheDocument();
  });
  it("renders component with tag delete button", () => {
    render(
      <TagsInput
        name="field"
        tags={["first"]}
        onTagsChange={mockOnTagsChangeFn}
      />
    );
    const button = screen.getByText("x");
    userEvent.click(button);
    expect(mockOnTagsChangeFn).toHaveBeenCalledTimes(1);
    expect(mockOnTagsChangeFn).toHaveBeenCalledWith({
      field: "field",
      value: [],
    });
  });
  it("renders component with tag input", () => {
    render(
      <TagsInput
        name="field"
        tags={["first"]}
        onTagsChange={mockOnTagsChangeFn}
      />
    );
    const input = screen.getByPlaceholderText(
      "Нажмите пробел чтобы добавить тэг"
    );
    userEvent.type(input, "third");
    userEvent.keyboard("{space}");
    expect(mockOnTagsChangeFn).toHaveBeenCalledTimes(1);
    expect(mockOnTagsChangeFn).toHaveBeenCalledWith({
      field: "field",
      value: ["first", "third"],
    });
  });
});
