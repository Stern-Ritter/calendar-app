export const TASK_FORM_SET_VALUE = "TASK_FORM_SET_VALUE";

export const setTaskFormValue = ({
  field,
  value,
}: {
  field: string;
  value: string;
}) => ({
  type: TASK_FORM_SET_VALUE,
  payload: { field, value },
});
