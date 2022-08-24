const express = require("express");
const postsRouter = express.Router();
const {
  postBodyValidator,
  validationMiddleware,
} = require("../middlewares/validators");

const {
  retrieve_all_posts,
  create_new_post,
  retrieve_one_post,
  update_entire_post,
  update_one_field_of_post,
  delete_one_post,
} = require("../controllers/posts");

postsRouter
  .route("/")
  .get(retrieve_all_posts)
  .post(postBodyValidator, validationMiddleware, create_new_post);

postsRouter
  .route("/:id")
  .get(retrieve_one_post)
  .put(postBodyValidator, validationMiddleware, update_entire_post)
  .patch(update_one_field_of_post)
  .delete(delete_one_post);

module.exports = postsRouter;
