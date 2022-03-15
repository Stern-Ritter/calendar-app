import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import * as redux from "react-redux";
import { Route, MemoryRouter } from "react-router-dom";
import * as taskFormActions from "../../services/actions/task-form";
import { formInitialState } from "../../services/reducers/task-form";
import * as taskListActions from "../../services/actions/task-list";
import TaskForm from "./task-form";

const task = {
  id: "1",
  name: "first task",
  createdDate: 1643273967854,
  eventDate: 9843274544153,
  category: "first category",
  tags: ["first", "second", "third"],
  state: "В работе",
  description: "first description",
};

const useSelectorSpy = jest.spyOn(redux, "useSelector");
const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const mockDispatchFn = jest.fn();
const mockHistoryPushFn = jest.fn();
const mockHistoryReplaceFn = jest.fn();

const getTaskByIdSpy = jest.spyOn(taskFormActions, "getTaskById");
const setTaskFormValueSpy = jest.spyOn(taskFormActions, "setTaskFormValue");
const createTaskSpy = jest.spyOn(taskListActions, "createTask");
const updateTaskTaskSpy = jest.spyOn(taskListActions, "updateTask");

describe("TaskForm", () => {
  beforeAll(() => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
  });

  it("renders component", () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useHistory: () => ({
        push: mockHistoryPushFn,
        replace: mockHistoryReplaceFn,
      }),
    }));
    useSelectorSpy.mockReturnValue({ hasError: false, data: task });

    render(
      <MemoryRouter initialEntries={["/edit/1"]}>
        <Route path="/edit/:taskId">
          <TaskForm />
        </Route>
      </MemoryRouter>
    );
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("renders component with error message if hasError is true", () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useHistory: () => ({
        push: mockHistoryPushFn,
        replace: mockHistoryReplaceFn,
      }),
    }));

    useSelectorSpy.mockReturnValue({ hasError: true, data: task });

    render(
      <MemoryRouter initialEntries={["/edit/1"]}>
        <Route path="/edit/:taskId">
          <TaskForm />
        </Route>
      </MemoryRouter>
    );
    expect(screen.queryByRole("form")).toBeNull();
    expect(screen.getByText("Ошибка загрузки задачи...")).toBeInTheDocument();
  });

  it(`renders component with correct values in edit form inputs,
  correct buttons and handlers, if hasError is false`, () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useHistory: () => ({
        push: mockHistoryPushFn,
        replace: mockHistoryReplaceFn,
      }),
    }));

    useSelectorSpy.mockReturnValue({ hasError: false, data: task });

    render(
      <MemoryRouter initialEntries={["/edit/1"]}>
        <Route path="/edit/:taskId">
          <TaskForm />
        </Route>
      </MemoryRouter>
    );
    expect(screen.getByRole("heading")).toHaveTextContent("Изменить задачу:");
    expect(screen.getByRole("textbox", { name: "Название:" })).toHaveValue(
      task.name
    );
    expect(screen.getByRole("textbox", { name: "Категория:" })).toHaveValue(
      task.category
    );
    expect(screen.getByTestId("date")).toHaveAttribute(
      "value",
      String(task.eventDate)
    );
    expect(screen.getByRole("textbox", { name: "Тэги:" })).toHaveAttribute(
      "placeholder",
      "Нажмите пробел чтобы добавить тэг"
    );
    expect(screen.getAllByTestId("tag")).toHaveLength(3);
    expect(screen.getByRole("textbox", { name: "Описание:" })).toHaveValue(
      task.description
    );
    expect(screen.getByRole("button")).toHaveTextContent("Сохранить изменение");

    expect(mockDispatchFn).toHaveBeenCalledTimes(2);
    expect(mockDispatchFn).toHaveBeenNthCalledWith(1, {
      type: taskFormActions.TASK_FORM_CLEAR_STATE,
    });
    expect(getTaskByIdSpy).toHaveBeenCalledTimes(1);
    expect(getTaskByIdSpy).toHaveBeenLastCalledWith("1");

    const submitButton = screen.getByRole("button", {
      name: "Сохранить изменение",
    });
    userEvent.click(submitButton);
    expect(mockDispatchFn).toHaveBeenCalledTimes(3);
    expect(updateTaskTaskSpy).toHaveBeenCalledTimes(1);
  });

  it(`renders component with correct values in create form inputs,
  correct buttons and handlers, if hasError is false`, () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useHistory: () => ({
        push: mockHistoryPushFn,
        replace: mockHistoryReplaceFn,
      }),
    }));

    useSelectorSpy.mockReturnValue({
      hasError: false,
      data: formInitialState.data,
    });

    render(
      <MemoryRouter initialEntries={["/create"]}>
        <Route path="/create">
          <TaskForm />
        </Route>
      </MemoryRouter>
    );
    expect(screen.getByRole("heading")).toHaveTextContent("Создать задачу:");
    expect(screen.getByRole("textbox", { name: "Название:" })).toHaveValue(
      formInitialState.data.name
    );
    expect(screen.getByRole("textbox", { name: "Категория:" })).toHaveValue(
      formInitialState.data.category
    );
    expect(screen.getByTestId("date")).toHaveAttribute(
      "value",
      String(formInitialState.data.eventDate)
    );
    expect(screen.getByRole("textbox", { name: "Тэги:" })).toHaveAttribute(
      "placeholder",
      "Нажмите пробел чтобы добавить тэг"
    );
    expect(screen.queryAllByTestId("tag")).toHaveLength(0);
    expect(screen.getByRole("textbox", { name: "Описание:" })).toHaveValue(
      formInitialState.data.description
    );
    expect(
      screen.getByRole("button", { name: "Очистить форму" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Создать" })).toBeInTheDocument();

    expect(mockDispatchFn).toHaveBeenCalledTimes(1);
    expect(mockDispatchFn).toHaveBeenLastCalledWith({
      type: taskFormActions.TASK_FORM_CLEAR_STATE,
    });

    const input = screen.getByRole("textbox", { name: "Название:" });
    userEvent.paste(input, "text");
    expect(mockDispatchFn).toHaveBeenCalledTimes(2);
    expect(setTaskFormValueSpy).toHaveBeenCalledTimes(1);
    expect(setTaskFormValueSpy).toHaveBeenLastCalledWith({
      field: "name",
      value: "text",
    });

    const clearButton = screen.getByRole("button", { name: "Очистить форму" });
    userEvent.click(clearButton);
    expect(mockDispatchFn).toHaveBeenCalledTimes(3);
    expect(mockDispatchFn).toHaveBeenLastCalledWith({
      type: taskFormActions.TASK_FORM_CLEAR_STATE,
    });

    const submitButton = screen.getByRole("button", { name: "Создать" });
    userEvent.click(submitButton);
    expect(mockDispatchFn).toHaveBeenCalledTimes(4);
    expect(createTaskSpy).toHaveBeenCalledTimes(1);
  });
});
