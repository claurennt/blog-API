const { body, validationResult, query } = require("express-validator");

const postBodyValidator = [
  body("author_id").exists(),
  body("title").exists(),
  body("source_link").exists(),
  body("image").exists(),
  body("body").exists(),
  body("tag_id").exists(),
];

const queryValidator = [
  query("tag")
    .isIn(["gender", "energy", "environment"])
    .withMessage(
      "Please provide a query string ?tag_name=value. The available values are 'energy', 'gender' and 'environment'"
    ),
];

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).send(errors.array());

  next();
};

module.exports = {
  queryValidator,
  postBodyValidator,
  validationMiddleware,
};
