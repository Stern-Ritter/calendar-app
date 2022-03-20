const dateTimeFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};

const STATUS_TO_DO = "В работе";
const STATUS_DONE = "Выполнено";
const STATUS_EXPIRED = "Просрочено";

export { dateTimeFormat, STATUS_TO_DO, STATUS_DONE, STATUS_EXPIRED };
