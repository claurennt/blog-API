const express = require("express");
const postsRouter = express.Router();

const {
  retrieve_all_posts,
  create_new_post,
  retrieve_one_post,
  update_entire_post,
  update_one_field_of_post,
  delete_one_post,
} = require("../controllers/posts");

postsRouter.route("/").get(retrieve_all_posts).post(create_new_post);

postsRouter
  .route("/:id")
  .get(retrieve_one_post)
  .put(update_entire_post)
  .patch(update_one_field_of_post)
  .delete(delete_one_post);

module.exports = postsRouter;
