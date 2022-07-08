import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";
import upload from "../middleware/upload.js";

import {
  getUserById,
  changeProfile,
  follow,
  checkFollow,
  create_user_ava,
  deleteUser,
} from "../controllers/userController.js";

router.route("/").get(getUserById);
router.route("/:id").delete(deleteUser);
router.route("/changeProfile").patch(authenticateUser, changeProfile);
router.route("/:id/follow").patch(follow);
router.route("/:currentUserId/:id").get(checkFollow);
router
  .route("/saveImage/:id")
  .patch(upload.single("image"), authenticateUser, create_user_ava);

export default router;
