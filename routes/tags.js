const express = require("express");
const tagsRouter = express.Router();

const retrieve_all_posts_by_tag = require("../controllers/tags");

/* GET users listing. */
tagsRouter.route("/").get(retrieve_all_posts_by_tag);

module.exports = tagsRouter;
