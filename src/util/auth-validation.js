// validators.js

// Email validation function
export const validateEmail = (email) => {
  // Basic email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Password validation function (at least 8 characters long)
export const validatePassword = (password) => {
  // Password length should be at least 8 characters
  if (password.length < 8) {
    return false;
  }

  // Regular expressions to check for presence of uppercase letter, digit, and special character
  const uppercaseRegex = /[A-Z]/;
  const digitRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // Add more characters as needed

  // Check if password meets all criteria
  if (!uppercaseRegex.test(password)) {
    return false; // Password does not contain an uppercase letter
  }
  if (!digitRegex.test(password)) {
    return false; // Password does not contain a digit
  }
  if (!specialCharRegex.test(password)) {
    return false; // Password does not contain a special character
  }

  // If all conditions are met, password is valid
  return true;
};

// Confirm password validation function (must match new password)
export const validateConfirmPassword = (confirmPassword, newPassword) => {
  return confirmPassword === newPassword;
};
