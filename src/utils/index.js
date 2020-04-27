export const parseStatus = status => {
  switch (status) {
    case "NEW":
      return "NUEVO";
    case "USED":
      return "USADO";
    case "ACTIVE":
      return "ACTIVO";
    case "INACTIVE":
      return "INACTIVO";
    default:
      return "";
  }
};
