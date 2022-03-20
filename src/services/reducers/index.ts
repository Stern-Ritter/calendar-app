import { combineReducers } from "redux";
import tasksReducer from "./task-list";
import { formReducer } from "./task-form";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  form: formReducer,
});
