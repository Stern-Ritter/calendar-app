import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import selectEvent from "react-select-event";
import * as redux from "react-redux";
import TaskList from "./task-list";
import Task from "../../model/Task";

const useSelectorSpy = jest.spyOn(redux, "useSelector");
const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const mockDispatchFn = jest.fn();
const mockHistoryPushFn = jest.fn();
const mockHistoryReplaceFn = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPushFn,
    replace: mockHistoryReplaceFn,
  }),
  useLocation: () => ({
    search: "?q=second&status=В работе",
  }),
}));

const elements: TaskOptions[] = [
  {
    id: "1",
    name: "first task",
    createdDate: 1643273967854,
    eventDate: 9843274544153,
    category: "first category",
    tags: ["first", "second", "third"],
    state: "В работе",
    description: "first description",
  },
  {
    id: "2",
    name: "second task",
    createdDate: 1643273967860,
    eventDate: 1643274544163,
    category: "second category",
    tags: ["second", "third"],
    state: "Выполнено",
    description: "second description",
  },
  {
    id: "3",
    name: "third task",
    createdDate: 1643273967954,
    eventDate: 1643274544253,
    category: "third category",
    tags: ["third"],
    state: "В работе",
    description: "third description",
  },
];

let tasks: Task[];

describe("TaskList", () => {
  beforeAll(() => {
    tasks = elements.map((options) => new Task(options));
    useSelectorSpy.mockReturnValue(tasks);
    useDispatchSpy.mockReturnValue(mockDispatchFn);
  });

  it("renders component", () => {
    render(<TaskList />);
    expect(screen.getByTestId("task-list")).toBeInTheDocument();
  });

  it("renders component with correct tasks filters", () => {
    render(<TaskList />);
    expect(screen.getAllByTestId("list-item")).toHaveLength(1);
    expect(screen.getByText("first task")).toBeInTheDocument();
  });

  it("renders component with correct remaining tasks count", () => {
    render(<TaskList />);
    expect(screen.getByText(/осталось/)).toHaveTextContent("1 из 3 осталось");
  });

  it("renders component with add button", () => {
    render(<TaskList />);
    const button = screen.getByText("+");
    userEvent.click(button);
    expect(mockHistoryPushFn).toHaveBeenCalledTimes(1);
    expect(mockHistoryPushFn).toHaveBeenCalledWith({ pathname: "/create" });
  });

  it("renders component with search input", () => {
    render(<TaskList />);
    expect(mockHistoryReplaceFn).toHaveBeenCalledTimes(2);

    const input = screen.getByPlaceholderText("Поиск");
    userEvent.clear(input);
    userEvent.type(input, "third");
    expect(mockHistoryReplaceFn).toHaveBeenCalledTimes(8);
    expect(mockHistoryReplaceFn).toHaveBeenLastCalledWith({
      search: `?q=third&status=${encodeURIComponent("В работе")}`,
    });
  });

  it("renders component with status selector", async () => {
    render(<TaskList />);
    expect(mockHistoryReplaceFn).toHaveBeenCalledTimes(2);

    await selectEvent.select(
      screen.getByLabelText("Статус выполнения"),
      "Выполнено",
      { container: document.body }
    );
    expect(mockHistoryReplaceFn).toHaveBeenCalledTimes(3);
    expect(mockHistoryReplaceFn).toHaveBeenLastCalledWith({
      search: `?q=second&status=${encodeURIComponent("Выполнено")}`,
    });
  });
});
