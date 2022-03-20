import Task from "../../model/Task";
import { STATUS_TO_DO } from "../../utils/constants";
import {
  GET_TASK_BY_ID,
  GET_TASK_BY_ID_SUCCESS,
  GET_TASK_BY_ID_FAILED,
  TASK_FORM_SET_VALUE,
  TASK_FORM_CLEAR_STATE,
} from "../actions";

interface IGET_TASK_BY_ID {
  type: "GET_TASK_BY_ID";
}

interface IGET_TASK_BY_ID_SUCCESS {
  type: "GET_TASK_BY_ID_SUCCESS";
  payload: Task;
}

interface IGET_TASK_BY_ID_FAILED {
  type: "GET_TASK_BY_ID_FAILED";
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
  | IGET_TASK_BY_ID
  | IGET_TASK_BY_ID_SUCCESS
  | IGET_TASK_BY_ID_FAILED
  | ITASK_FORM_SET_VALUE
  | ITASK_FORM_CLEAR_STATE;

const formInitialState = {
  loading: false,
  hasError: false,
  data: {
    id: "",
    name: "",
    createdDate: Date.now(),
    eventDate: Date.now(),
    category: "",
    tags: [] as string[],
    state: STATUS_TO_DO as TaskState,
    description: "",
  },
};

const formReducer = (state = formInitialState, action: TASK_FORM_ACTION) => {
  switch (action.type) {
    case GET_TASK_BY_ID: {
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    }
    case GET_TASK_BY_ID_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: {
          ...action.payload,
          id: action.payload.getId(),
        },
      };
    }
    case GET_TASK_BY_ID_FAILED: {
      return {
        ...state,
        loading: false,
        hasError: true,
      };
    }
    case TASK_FORM_SET_VALUE: {
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.field]: action.payload.value,
        },
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

export { formInitialState, formReducer };
