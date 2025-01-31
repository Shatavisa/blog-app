const User = require("../models/user.model.js");
const Blog = require("../models/blog.model.js");
const mongoose = require("mongoose");
const errorHandler = require("../utils/error.js");

const createPost = async (req, res, next) => {
  try {
    if (req.user.adminSignup == "Yes") {
      return next(errorHandler(403, "You are not authorized"));
    }
    const { title, content, author } = req.body;
    if (
      !title ||
      !content ||
      !author ||
      title == "" ||
      content == "" ||
      author == ""
    ) {
      return next(errorHandler(400, "All fields are required"));
    }

    const blog = new Blog({
      title,
      content,
      author,
      status: "Pending",
      createdBy: new mongoose.Types.ObjectId(req.user.id),
    });
    await blog.save();
    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.log("err:", error);
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.user.id);
    const userDetails = await User.findById(id).select(
      "username email adminSignup"
    );

    if (!userDetails) {
      return next(errorHandler(404, "User not found"));
    }
    const lo_condition =
      userDetails.adminSignup == "No" ? { status: "Approved" } : {};
    const lo_condition2 =
      userDetails.adminSignup == "No" ? { createdBy: id } : {};
    const posts = await Blog.find({ $and: [lo_condition, lo_condition2] }).sort(
      { createdAt: -1 }
    );
    return res.status(200).json({ posts });
  } catch (error) {
    console.log("err:", error);
    next(error);
  }
};

const updatePostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, author, status } = req.body;
    if (
      !title ||
      !content ||
      !author ||
      title == "" ||
      content == "" ||
      author == ""
    ) {
      return next(errorHandler(400, "All fields are required"));
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      return next(errorHandler(404, "Blog not found"));
    }
    blog.title = title;
    blog.content = content;
    blog.author = author;
    blog.status = status;
    await blog.save();
    return res.status(200).json({ message: "Blog updated successfully", success: true });
  } catch (error) {
    console.log("err:", error);
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(errorHandler(400, "Id is required"));
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      return next(errorHandler(404, "Blog not found"));
    }
    return res.status(200).json({ blog });
  } catch (error) {
    console.log("err:", error);
    next(error);
  }
};

const approvePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(errorHandler(400, "Id is required"));
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      return next(errorHandler(404, "Blog not found"));
    }
    blog.status = "Approved";
    const result = await blog.save();
    return res.status(200).json({ message: "Blog approved successfully", result });
  } catch (error) {
    console.log("err:", error);
    next(error);
  }
};

const deletePostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(errorHandler(400, "Id is required"));
    }
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return next(errorHandler(404, "Blog not found"));
    }
    return res.status(200).json({ message: "Blog deleted successfully", success: true });
  } catch (error) {
    console.log("err:", error);
    next(error);
  }
};
module.exports = { createPost, getAllPosts, updatePostById, getPostById, approvePost, deletePostById };
