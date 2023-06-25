import { FormValues } from "interfaces/project";

export const validateForm = (formValues: FormValues) => {
  const errors: { message: string } = { message: "" };
  let hasError = false;

  Object.keys(formValues).forEach((key) => {
    switch (key) {
      case "title":
        if (!formValues.title) {
          errors.message = "Title is required";
          hasError = true;
        }
        break;
      case "description":
        if (!formValues.description) {
          errors.message = "Description is required";
          hasError = true;
        }
        break;
      case "sectorType":
        if (!formValues.sectorType) {
          errors.message = "Project type is required";
          hasError = true;
        }
        break;
      case "source":
        if (!formValues.source) {
          errors.message = "Source is required";
          hasError = true;
        }
        break;
      case "fund":
        if (!formValues.fund) {
          errors.message = "Funding is required";
          hasError = true;
        }
        break;
      case "proponents":
        if (!formValues.fund) {
          errors.message = "Proponents is required";
          hasError = true;
        }
        break;
      case "duration":
        if (!formValues.fund) {
          errors.message = "Duration is required";
          hasError = true;
        }
        break;
      default:
        hasError = false;
    }
  });
  return { hasError, errors };
};

export const hasChanged = (
  initialValues: FormValues,
  currentValues: FormValues
) => {
  const initialValuesArray = Object.values(initialValues);
  const currentValuesArray = Object.values(currentValues);
  for (let i = 0; i < initialValuesArray.length; i++) {
    if (initialValuesArray[i] !== currentValuesArray[i]) {
      return true;
    }
  }
  return false;
};
