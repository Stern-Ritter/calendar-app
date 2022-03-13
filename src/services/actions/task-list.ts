import { RouteComponentProps } from "react-router-dom";
import storage from "../../model/storage";
import Task from "../../model/Task";
import { TASK_FORM_CLEAR_STATE } from ".";
import { AppDispatch } from "../store/store";

export const GET_TASKS = "GET_TASKS";
export const GET_TASKS_SUCCESS = "GET_TASKS_SUCCESS";
export const GET_TASKS_FAILED = "GET_TASKS_FAILED";

export const CREATE_TASK = "CREATE_TASK";
export const CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS";
export const CREATE_TASK_FAILED = "CREATE_TASK_FAILED";

export const UPDATE_TASK = "UPDATE_TASK";
export const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS";
export const UPDATE_TASK_FAILED = "UPDATE_TASK_FAILED";

export const DELETE_TASK = "DELETE_TASK";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const DELETE_TASK_FAILED = "DELETE_TASK_FAILED";

export function getTasks() {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: GET_TASKS });
    try {
      const tasks: Task[] | null = await storage.getAll();
      if (tasks !== null) {
        dispatch({ type: GET_TASKS_SUCCESS, payload: tasks });
      } else {
        dispatch({ type: GET_TASKS_FAILED });
      }
    } catch (err) {
      dispatch({ type: GET_TASKS_FAILED });
    }
  };
}

export function createTask(
  task: Task,
  history: RouteComponentProps["history"]
) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: CREATE_TASK });
    try {
      const id = await storage.create(task);
      if (id !== null) {
        task.setId(id);
        dispatch({ type: CREATE_TASK_SUCCESS, payload: task });
        dispatch({ type: TASK_FORM_CLEAR_STATE });
        history.push({ pathname: "/" });
      } else {
        dispatch({ type: CREATE_TASK_FAILED });
      }
    } catch (err) {
      dispatch({ type: CREATE_TASK_FAILED });
    }
  };
}

export function updateTask(
  task: Task,
  history: RouteComponentProps["history"]
) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: UPDATE_TASK });
    try {
      const success = await storage.update(task);
      if (success) {
        dispatch({ type: UPDATE_TASK_SUCCESS, payload: task });
        dispatch({ type: TASK_FORM_CLEAR_STATE });
        history.push({ pathname: "/" });
      } else {
        dispatch({ type: UPDATE_TASK_FAILED });
      }
    } catch (err) {
      dispatch({ type: UPDATE_TASK_FAILED });
    }
  };
}

export function deleteTask(id: string) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: DELETE_TASK });
    try {
      const success = await storage.delete(id);
      if (success) {
        dispatch({ type: DELETE_TASK_SUCCESS, payload: id });
      } else {
        dispatch({ type: DELETE_TASK_FAILED });
      }
    } catch (err) {
      dispatch({ type: DELETE_TASK_FAILED });
    }
  };
}
