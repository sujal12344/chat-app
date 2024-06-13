const isStrongPassword = (password) => {
  if (password.length < 8) {
    return `Password must be at least 8 characters long`;
  }
  if (password.search(/[a-z]/) < 0) {
    return `Password must contain at least one lowercase letter`;
  }
  if (password.search(/[A-Z]/) < 0) {
    return `Password must contain at least one uppercase letter`;
  }
  if (password.search(/[0-9]/) < 0) {
    return `Password must contain at least one digit`;
  }
  if (password.search(/[!@#$%^&*]/) < 0) {
    return `Password must contain at least one special character`;
  }
  return true;
};

export default isStrongPassword;
