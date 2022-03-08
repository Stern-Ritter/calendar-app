import Task from "../../model/Task";
import {
  GET_TASKS,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILED,
  CREATE_TASK,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILED,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILED,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILED,
} from "../actions";

interface IGET_TASKS {
  type: "GET_TASKS";
}

interface IGET_TASKS_SUCCESS {
  type: "GET_TASKS_SUCCESS";
  payload: Task[];
}

interface IGET_TASKS_FAILED {
  type: "GET_TASKS_FAILED";
}

interface ICREATE_TASK {
  type: "CREATE_TASK";
}

interface ICREATE_TASK_SUCCESS {
  type: "CREATE_TASK_SUCCESS";
  payload: Task;
}

interface ICREATE_TASK_FAILED {
  type: "CREATE_TASK_FAILED";
}

interface IUPDATE_TASK {
  type: "UPDATE_TASK";
}

interface IUPDATE_TASK_SUCCESS {
  type: "UPDATE_TASK_SUCCESS";
  payload: Task;
}

interface IUPDATE_TASK_FAILED {
  type: "UPDATE_TASK_FAILED";
}

interface IDELETE_TASK {
  type: "DELETE_TASK";
}

interface IDELETE_TASK_SUCCESS {
  type: "DELETE_TASK_SUCCESS";
  payload: string;
}

interface IDELETE_TASK_FAILED {
  type: "DELETE_TASK_FAILED";
}

type TASK_ACTION =
  | IGET_TASKS
  | IGET_TASKS_SUCCESS
  | IGET_TASKS_FAILED
  | ICREATE_TASK
  | ICREATE_TASK_SUCCESS
  | ICREATE_TASK_FAILED
  | IUPDATE_TASK
  | IUPDATE_TASK_SUCCESS
  | IUPDATE_TASK_FAILED
  | IDELETE_TASK
  | IDELETE_TASK_SUCCESS
  | IDELETE_TASK_FAILED;

const tasksInitialState = {
  loading: false,
  hasError: false,
  data: [] as Task[],
  createTaskRequest: false,
  createTaskFailed: false,
  updateTaskRequest: false,
  updateTaskFailed: false,
  deleteTaskRequest: false,
  deleteTaskFailed: false,
};

const tasksReducer = (state = tasksInitialState, action: TASK_ACTION) => {
  switch (action.type) {
    case GET_TASKS: {
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    }
    case GET_TASKS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload.reverse(),
      };
    }
    case GET_TASKS_FAILED: {
      return {
        ...state,
        loading: false,
        hasError: true,
      };
    }
    case CREATE_TASK: {
      return {
        ...state,
        createTaskRequest: true,
        createTaskFailed: false,
      };
    }
    case CREATE_TASK_SUCCESS: {
      return {
        ...state,
        createTaskRequest: false,
        data: [...state.data, action.payload],
      };
    }
    case CREATE_TASK_FAILED: {
      return {
        ...state,
        createTaskRequest: false,
        createTaskFailed: true,
      };
    }
    case UPDATE_TASK: {
      return {
        ...state,
        updateTaskRequest: true,
        updateTaskFailed: false,
      };
    }
    case UPDATE_TASK_SUCCESS: {
      return {
        ...state,
        updateTaskRequest: false,
        data: [...state.data].map((task) =>
          task.getId() === action.payload.getId() ? action.payload : task
        ),
      };
    }
    case UPDATE_TASK_FAILED: {
      return {
        ...state,
        updateTaskRequest: false,
        updateTaskFailed: true,
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        deleteTaskRequest: true,
        deleteTaskFailed: false,
      };
    }
    case DELETE_TASK_SUCCESS: {
      return {
        ...state,
        deleteTaskRequest: false,
        data: [...state.data].filter((task) => task.getId() !== action.payload),
      };
    }
    case DELETE_TASK_FAILED: {
      return {
        ...state,
        deleteTaskRequest: false,
        deleteTaskFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default tasksReducer;
