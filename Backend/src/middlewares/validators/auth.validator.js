import { body, validationResult } from "express-validator";
import { ApiError } from "../../utils/ApiError.js";

// ─────────────────────────────────────────────────────────
// HELPER: Run after validation chains — collects all errors
// and throws an ApiError so asyncHandler passes it to Express
// ─────────────────────────────────────────────────────────
export const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Map to a clean array of { field, message }
      const extractedErrors = errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      }));

      throw new ApiError(422, "Validation failed", extractedErrors);
    }
    next();
  }
  catch (error) {
    next(error)
  }
};

// ─────────────────────────────────────────────────────────
// REGISTER VALIDATOR
// Validates: username, full_name, email, password,
//            role, phone, department, speciality, age, gender
// ─────────────────────────────────────────────────────────
export const registerValidator = [
  body("userName")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3, max: 30 }).withMessage("Username must be 3–30 characters")
    .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers, and underscores"),

  body("full_name")
    .trim()
    .notEmpty().withMessage("Full name is required")
    .isLength({ min: 2, max: 100 }).withMessage("Full name must be 2–100 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number"),
];

// ─────────────────────────────────────────────────────────
// LOGIN VALIDATOR
// Validates: email (or username) + password
// ─────────────────────────────────────────────────────────
export const loginValidator = [
  body("email")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail().withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("username")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),

  // Custom: require at least one of email or username
  body("email").custom((value, { req }) => {
    if (!value && !req.body.username) {
      throw new Error("Either email or username is required");
    }
    return true;
  }),

  body("password")
    .notEmpty().withMessage("Password is required"),
];

// ─────────────────────────────────────────────────────────
// FORGOT PASSWORD VALIDATOR
// ─────────────────────────────────────────────────────────
export const forgotPasswordValidator = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email address")
    .normalizeEmail(),
];

// ─────────────────────────────────────────────────────────
// RESET PASSWORD VALIDATOR
// ─────────────────────────────────────────────────────────
export const resetPasswordValidator = [
  body("password")
    .notEmpty().withMessage("New password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number"),

  body("confirmPassword")
    .notEmpty().withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];
