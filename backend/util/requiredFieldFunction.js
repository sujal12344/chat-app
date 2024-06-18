const requiredFieldFunnction = (requiredFieldArray, res) => {
  let requiredField;
  if (
    requiredFieldArray.some((field) => {
      if (field.value?.trim() === "" || !field.value) {
        requiredField = field.name;
        return true;
      }
      return false;
    })
  ) {
    return res
    .status(400)
    .json({
      message: `${requiredField} is required`,
    });
  }
};

export default requiredFieldFunnction;