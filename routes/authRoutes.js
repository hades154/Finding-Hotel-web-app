import express from "express";
import authenticateUser from "../middleware/auth.js";
const router = express.Router();

import {
  register,
  login,
  updateUser,
  reset_password_email,
  reset_password,
  change_password,
  getAllProfile,
} from "../controllers/authController.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").post(authenticateUser, updateUser);
router.route("/reset-password-email").post(reset_password_email);
router.route("/reset-password").post(reset_password);
router.route("/getProfiles").get(getAllProfile);
router.route("/change-password").post(authenticateUser, change_password);

export default router;
