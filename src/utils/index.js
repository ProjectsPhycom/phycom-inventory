export const parseStatus = status => {
  switch (status) {
    case "NEW":
      return "NUEVO";
    case "USED":
      return "USADO";
    default:
      return "";
  }
};
