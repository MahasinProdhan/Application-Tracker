export const formatDate = (value) => {
  if (!value) {
    return "Not set";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

export const toDateInputValue = (value) => {
  if (!value) {
    return "";
  }

  return new Date(value).toISOString().split("T")[0];
};
