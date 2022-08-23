const express = require("express");
const postsRouter = express.Router();

const {retrieveAllUsers=} = require("../controllers/posts");


/* GET posts listing. */
postsRouter.route("/posts").get("/", retrieveAllUsers);

module.exports = postsRouter;
