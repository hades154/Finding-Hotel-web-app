import express from "express";
const router = express.Router();

import {
  getConversationFromUser,
  addNewConversation,
  getConversationFromTwoUser,
  getConversationById,
} from "../controllers/conversationController.js";

router.route("/").post(addNewConversation);
router.route("/:userId").get(getConversationFromUser);
router.route("/byId/:id").get(getConversationById);
router
  .route("/find/:firstUserId/:secondUserId")
  .get(getConversationFromTwoUser);

export default router;
