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

type TagInputProps = {
  name: string;
  tags: string[];
  onTagsChange: (tags: { field: string; value: string[] }) => void;
};
