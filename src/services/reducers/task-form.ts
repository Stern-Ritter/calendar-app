import Task from "../../model/Task";
import { STATUS_TO_DO } from "../../utils/constants";
import {
  TASK_FORM_SET_STATE,
  TASK_FORM_SET_VALUE,
  TASK_FORM_CLEAR_STATE,
} from "../actions";

interface ITASK_FORM_SET_STATE {
  type: "TASK_FORM_SET_STATE";
  payload: Task;
}

interface ITASK_FORM_SET_VALUE {
  type: "TASK_FORM_SET_VALUE";
  payload: {
    field: string;
    value: string;
  };
}

interface ITASK_FORM_CLEAR_STATE {
  type: "TASK_FORM_CLEAR_STATE";
}

type TASK_FORM_ACTION =
  | ITASK_FORM_SET_STATE
  | ITASK_FORM_SET_VALUE
  | ITASK_FORM_CLEAR_STATE;

const formInitialState = {
  id: "",
  name: "",
  createdDate: Date.now(),
  eventDate: Date.now(),
  category: "",
  tags: [] as string[],
  state: STATUS_TO_DO,
  description: "",
};

const formReducer = (state = formInitialState, action: TASK_FORM_ACTION) => {
  switch (action.type) {
    case TASK_FORM_SET_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case TASK_FORM_SET_VALUE: {
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    }
    case TASK_FORM_CLEAR_STATE: {
      return {
        ...formInitialState,
      };
    }
    default: {
      return state;
    }
  }
};

export default formReducer;
