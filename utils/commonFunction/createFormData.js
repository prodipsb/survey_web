export const makeFormData = (array, name, formData) => {
  return array.map((data, index) => {
    if (data?.file?.name) {
      formData.append(`${name + "_" + index}`, data.file);
    }
  });
};

export const createFormData = (data, formData) => {
  return Object.keys(data).map((key) => {
    if (typeof data[key] !== "object" || key === "childs") {
      if (key === "childs") {
        formData.append(`${key}`, `${JSON.stringify(data[key])}`);
      } else {
        formData.append(`${key}`, `${data[key]}`);
      }
    }
  });
};
