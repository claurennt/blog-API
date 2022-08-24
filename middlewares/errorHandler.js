const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something went wrong.The admin has been informed");
};

module.exports = errorHandler;
