const express = require("express");
const authorsRouter = express.Router();

/* GET users listing. */
authorsRouter.route("/posts").get("/",  (req, res, next) {
  res.send("respond with a resource");
});

module.exports = authorsRouter;
