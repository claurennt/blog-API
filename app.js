require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const postsRouter = require("./routes/posts");
const authorsRouter = require("./routes/authors");
const tagsRouter = require("./routes/tags");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/posts", postsRouter);
app.use("/authors", authorsRouter);
app.use("/tags", tagsRouter);

module.exports = app;
