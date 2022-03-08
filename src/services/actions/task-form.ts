export const TASK_FORM_SET_STATE = "TASK_FORM_SET_STATE";
export const TASK_FORM_SET_VALUE = "TASK_FORM_SET_VALUE";
export const TASK_FORM_CLEAR_STATE = "TASK_FORM_CLEAR_STATE";

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
