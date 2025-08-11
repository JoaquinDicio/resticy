export default function checkIfInputsAreEmpty(formData, requiredFields) {
  let empty = false;

  requiredFields.forEach((field) => {
    if (!formData[field]) empty = true;
    if (formData[field]?.trim() == "") empty = true;
  });

  return empty;
}
