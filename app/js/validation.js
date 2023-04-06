function validation(fieldName, value) {
  const error = [];
  switch (fieldName) {
    case "city":
      if (!value) {
        error.push("City field is required");
      } else if (/\d/.test(value)) {
        error.push("City name should not contain numbers");
      }
      break;

    default:
      if (!value || !value.trim()) {
        error.push("Name field is required");
      } else if (/\d/.test(value)) {
        error.push("Name should not contain numbers");
      }
  }

  return error.join(".\n");
}