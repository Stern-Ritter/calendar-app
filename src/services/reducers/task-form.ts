import { TASK_FORM_SET_VALUE } from "../actions";

type TASKS_FORM_ACTION = {
  type: "TASK_FORM_SET_VALUE";
  payload: {
    field: string;
    value: string;
  };
};

const formInitialState = {
  name: "",
  date: Date.now(),
  category: "",
  tags: [],
  description: "text",
};

const formReducer = (state = formInitialState, action: TASKS_FORM_ACTION) => {
  switch (action.type) {
    case TASK_FORM_SET_VALUE: {
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    }
    default: {
      return state;
    }
  }
};

export default formReducer;
