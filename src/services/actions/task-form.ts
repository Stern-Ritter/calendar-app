import storage from "../../model/storage";
import Task from "../../model/Task";
import { AppDispatch } from "../store/store";

export const GET_TASK_BY_ID = "GET_TASK_BY_ID";
export const GET_TASK_BY_ID_SUCCESS = "GET_TASK_BY_ID_SUCCESS";
export const GET_TASK_BY_ID_FAILED = "GET_TASK_BY_ID_FAILED";

export const TASK_FORM_SET_VALUE = "TASK_FORM_SET_VALUE";
export const TASK_FORM_CLEAR_STATE = "TASK_FORM_CLEAR_STATE";

export function getTaskById(id: string) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: GET_TASK_BY_ID });
    try {
      const task: Task | null = await storage.getById(id);
      if (task !== null) {
        dispatch({ type: GET_TASK_BY_ID_SUCCESS, payload: task });
      } else {
        dispatch({ type: GET_TASK_BY_ID_FAILED });
      }
    } catch (err) {
      dispatch({ type: GET_TASK_BY_ID_FAILED });
    }
  };
}

export const setTaskFormValue = ({
  field,
  value,
}: {
  field: string;
  value: string | string[];
}) => ({
  type: TASK_FORM_SET_VALUE,
  payload: { field, value },
});
