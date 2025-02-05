const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
  approvePost,
  getAllApprovedPosts
} = require("../controllers/post.controller.js");
const { verifyUser } = require("../utils/verifyUser.js");

router
  .get("/", verifyUser , getAllPosts)
  // .get("/",verifyUser, getAllApprovedPosts)
  .get("/:id", getPostById)
  .post("/", verifyUser, createPost)
  .put("/:id", verifyUser, updatePostById)
  .put("/admin/approve/:id", approvePost)
  .delete("/:id", deletePostById);

module.exports = router;
