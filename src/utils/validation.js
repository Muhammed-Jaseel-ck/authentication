export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegister(values) {
  const errors = {};

  if (!values.username.trim()) {
    errors.username = "Username is required";
  } else if (values.username.length < 3 || values.username.length > 20) {
    errors.username = "Username must be 3-20 characters";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Enter a valid email";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters";
  }

  return errors;
}

export function validateLogin(values) {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Enter a valid email";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
}