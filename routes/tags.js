const express = require("express");
const tagsRouter = express.Router();

/* GET users listing. */
tagsRouter.route("/posts").get((req, res, next) => {
  res.send("respond with a resource");
});

module.exports = tagsRouter;
