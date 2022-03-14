import React from "react";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppHeader from "./app-header";

describe("AppHeader", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AppHeader />
      </MemoryRouter>
    );
  });
  it("renders component", () => {
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
  it("renders component with correct count of links", () => {
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });
  it("renders component with home page link", () => {
    expect(screen.getByText("Календарь задач")).toHaveAttribute("href", "/");
  });
  it("renders component with task-list page link", () => {
    expect(screen.getByText("Список задач")).toHaveAttribute("href", "/");
  });
  it("renders component with about page link", () => {
    expect(screen.getByText("Информация")).toHaveAttribute("href", "/about");
  });
});
