const db = require("../db/client");

const retrieve_all_posts = async (req, res) => {
  try {
    const { rows: posts, rowCount } = await db.query(`SELECT * FROM posts;`);

    if (!rowCount) return res.status(404).send("No posts found");

    return res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
};

const create_new_post = async (req, res) => {
  const { author_id, title, image, body, tag_id, source_link } = req.body;

  try {
    const {
      rows: [newPost],
      rowCount,
    } = await db.query(
      "INSERT INTO posts (author_id, title, image, body, tag_id, source_link)  VALUES ($1, $2, $3, $4, $5, $6)  RETURNING *;",
      [author_id, title, image, body, tag_id, source_link]
    );

    if (!rowCount) return res.status(404).send("Something went wrong");

    return res.status(200).send(newPost);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Sometging went wrong");
  }
};

const retrieve_one_post = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      rows: [onePost],
      rowCount,
    } = await db.query("SELECT * FROM posts  WHERE id=$1;", [id]);

    if (!rowCount)
      return res.status(404).send(`The post with id ${id} does not exist`);

    return res.status(200).send(onePost);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Sometging went wrong");
  }
};

const update_entire_post = async (req, res) => {
  const { id } = req.params;
  const { author_id, title, image, body, tag_id, source_link } = req.body;

  try {
    const {
      rows: [updatedPost],
      rowCount,
    } = await db.query(
      "UPDATE posts  SET author_id=$1, title=$2, image=$3, body=$4, tag_id=$5, source_link=$6 WHERE id=$7",
      [author_id, title, image, body, tag_id, source_link, id]
    );

    if (!rowCount)
      return res.status(404).send(`The post with id ${id} does not exist`);

    return res.status(200).send(updatedPost);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Sometging went wrong");
  }
};

const update_one_field_of_post = async (req, res) => {
  const { id } = req.params;
  const [key, value] = Object.entries(req.body)[0];

  if (!key || !value) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const {
      rows: [updatedPost],
      rowCount,
    } = await db.query("UPDATE posts SET ${key}=$1 WHERE id=$2 RETURNING *;", [
      value,
      id,
    ]);

    if (!rowCount)
      return res.status(404).send(`The post with id ${id} does not exist`);

    return res.status(200).send(updatedPost);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Sometging went wrong");
  }
};

const delete_one_post = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      rows: [deletedPost],
      rowCount,
    } = await db.query("DELETE FROM posts WHERE id=$1 RETURNING *;", [id]);

    if (!rowCount)
      return res.status(404).send(`The post with id ${id} does not exist`);

    return res.status(200).send(deletedPost);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Sometging went wrong");
  }
};

module.exports = {
  retrieve_all_posts,
  create_new_post,
  retrieve_one_post,
  update_entire_post,
  update_one_field_of_post,
  delete_one_post,
};
