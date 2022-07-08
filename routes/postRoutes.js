import express from "express";
import authenticateUser from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

import {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
  create_post_image,
  findPost,
  reviewPost,
  deleteReview,
  getPostById,
  addMotelImage,
  deleteMotelImage,
  getReview,
} from "../controllers/postController.js";

router.route("/").post(authenticateUser, createPost);
router
  .route("/saveImage/:id")
  .patch(upload.single("image"), authenticateUser, create_post_image);
router.route("/").get(getAllPosts);
router
  .route("/:id")
  .get(getPostById)
  .delete(authenticateUser, deletePost)
  .patch(upload.single("image"), authenticateUser, updatePost);

router.route("/find/:id").get(findPost);
router.route("/review/:id").post(authenticateUser, reviewPost).get(getReview);
router.route("/review/:id/:review_id").delete(authenticateUser, deleteReview);
router
  .route("/MultiImage/:id")
  .patch(upload.single("image"), authenticateUser, addMotelImage)
  .delete(deleteMotelImage);

export default router;
