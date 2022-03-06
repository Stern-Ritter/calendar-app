declare module "*.module.css";

const taskStates = ["to do", "done"] as const;

type TaskState = typeof taskStates[number];

type TaskOptions = {
  id?: string;
  name: string;
  createdDate: number;
  eventDate: number;
  category: string;
  tags: string[];
  state: TaskState;
  description: string;
};

type TaskProps = {
  content: TaskOptions;
};
