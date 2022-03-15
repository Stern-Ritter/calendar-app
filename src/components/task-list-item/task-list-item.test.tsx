import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import * as redux from "react-redux";
import TaskListItem from "./task-list-item";
import Task from "../../model/Task";
import * as actions from "../../services/actions/task-list";

const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const mockDispatchFn = jest.fn();
const mockHistoryFn = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryFn,
  }),
}));
const deleteTaskSpy = jest.spyOn(actions, "deleteTask");
const updateTaskSpy = jest.spyOn(actions, "updateTask");

const options: TaskOptions = {
  id: "1",
  name: "first task",
  createdDate: 1643273967854,
  eventDate: 1646274544153,
  category: "first category",
  tags: ["first", "second", "third"],
  state: "В работе",
  description: "first description",
};

describe("TaskListItem", () => {
  beforeAll(() => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
  });

  it("renders component", () => {
    const task = new Task(options);
    render(<TaskListItem content={task} />);
    expect(screen.getByTestId("list-item")).toBeInTheDocument();
  });

  it("renders component with correct name", () => {
    const task = new Task(options);
    render(<TaskListItem content={task} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      options.name
    );
  });

  it("renders component with correct category", () => {
    const task = new Task(options);
    render(<TaskListItem content={task} />);
    expect(screen.getByText(/Категория:/)).toHaveTextContent(
      `Категория: ${options.category}`
    );
  });

  it("renders component with correct created date", () => {
    const task = new Task(options);
    render(<TaskListItem content={task} />);
    expect(screen.getByText(/Дата создания:/)).toHaveTextContent(
      `Дата создания: 27 янв. 2022 г., 11:59`
    );
  });

  it("renders component with correct event date", () => {
    const task = new Task(options);
    render(<TaskListItem content={task} />);
    expect(screen.getByText(/Выполнить до:/)).toHaveTextContent(
      `Выполнить до: 03 мар. 2022 г., 05:29`
    );
  });

  it("renders component with correct tags", () => {
    const task = new Task(options);
    render(<TaskListItem content={task} />);
    options.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it("renders component with correct state", () => {
    const task = new Task(options);
    render(<TaskListItem content={task} />);
    expect(screen.getByText(options.state)).toBeInTheDocument();
  });

  it("renders component with correct description", () => {
    const task = new Task(options);
    render(<TaskListItem content={task} />);
    expect(screen.getByText(options.description)).toBeInTheDocument();
  });

  it("renders component with delete button", () => {
    const task = new Task(options);
    render(<TaskListItem content={task} />);
    const button = screen.getByText("Удалить");
    userEvent.click(button);
    expect(mockDispatchFn).toHaveBeenCalledTimes(1);
    expect(deleteTaskSpy).toHaveBeenCalledTimes(1);
    expect(deleteTaskSpy).toHaveBeenCalledWith(options.id);
  });

  it("renders component with edit button", () => {
    const task = new Task(options);
    render(<TaskListItem content={task} />);
    const button = screen.getByText("Изменить");
    userEvent.click(button);
    expect(mockHistoryFn).toHaveBeenCalledTimes(1);
    expect(mockHistoryFn).toHaveBeenCalledWith({
      pathname: `/edit/${options.id}`,
    });
  });

  it("renders component with change status button", () => {
    const task = new Task(options);
    render(<TaskListItem content={task} />);
    const button = screen.getByRole("checkbox");
    userEvent.click(button);
    expect(mockDispatchFn).toHaveBeenCalledTimes(1);
    expect(updateTaskSpy).toHaveBeenCalledTimes(1);
  });
});
