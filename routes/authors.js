const express = require("express");
const authorsRouter = express.Router();

const retrieve_all_posts_by_author = require("../controllers/authors");

/* GET users listing. */
authorsRouter.route("/:author_id/posts/").get(retrieve_all_posts_by_author);

module.exports = authorsRouter;
