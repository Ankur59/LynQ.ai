import { Router } from "express";
import {
  handleRegister,
  handleLogin,
  handleLogout,
  handleVerify,
} from "../controllers/auth.controller.js";
import {
  registerValidator,
  loginValidator,
  validate,
} from "../middlewares/validators/auth.validator.js";

const router = Router();

// ── Public Routes ──────────────────────────────────────────
// POST /api/auth/register
router.post("/register", registerValidator, validate, handleRegister);

// POST /api/auth/login
router.post("/login", loginValidator, validate, handleLogin);

router.post("/verify-email", handleVerify)
// routes.post("/verifyaccount",)
// POST /api/auth/logout  (add verifyJWT middleware here later)
router.post("/logout", handleLogout);

export default router;
