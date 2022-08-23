const db = require("../db/client");

const retrieve_all_posts = async (req, res) => {
  try {
    const { rows: posts, rowCount } = await db.pool("SELECT * FROM posts;");

    if (!rowCount) return res.status(404).send("No posts found");

    return res.send(200).status(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
};

const create_new_post = async (req, res) => {
  const { author_id, title, image, body, tag_id, source_link } = req.body;

  if (!author_id || !title || !image || !body || !tag_id || source_link) {
    return res.status(400).send("Missing required fields");
  }

  const createPost = {
    text: `INSERT INTO posts (id, author_id, title, image, body, tag_id) 
           VALUES $1, $2, $3, $4, $5, $6 
           RETURNING *;`,
    params: [author_id, title, image, body, tag_id, source_link],
  };

  try {
    const {
      rows: [newPost],
      rowCount,
    } = await db.pool(createPost);

    if (!rowCount) return res.status(404).send("No posts were created");

    return res.send(200).status(newPost);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Sometging went wrong");
  }
};

const retrieve_one_post = async (req, res) => {
  const { id } = req.params;

  const getOnePost = {
    text: `SELECT * FROM posts 
           WHERE id=$1;`,
    params: [id],
  };

  try {
    const {
      rows: [onePost],
      rowCount,
    } = await db.pool(getOnePost);

    if (!rowCount)
      return res.status(404).send(`The post with id ${id} does not exist`);

    return res.send(200).status(onePost);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Sometging went wrong");
  }
};

const update_entire_post = async (req, res) => {
  const { id } = req.params;
  const { author_id, title, image, body, tag_id, source_link } = req.body;
  if (!author_id || !title || !image || !body || !tag_id || source_link) {
    return res.status(400).send("Missing required fields");
  }

  const updateEntirePost = {
    text: `UPDATE posts 
           SET author_id=$1, title=$2, image=$3, body=$4, tag_id=$5, source_link=$6 
           WHERE id=$7`,
    params: [author_id, title, image, body, tag_id, source_link, id],
  };

  try {
    const {
      rows: [updatedPost],
      rowCount,
    } = await db.pool(updateEntirePost);

    if (!rowCount)
      return res.status(404).send(`The post with id ${id} does not exist`);

    return res.send(200).status(updatedPost);
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

  const updatePostPartially = {
    text: `UPDATE posts
           SET ${key}=$1
           WHERE id=$2
           RETURNING *;`,
    params: [value, id],
  };

  try {
    const {
      rows: [updatedPost],
      rowCount,
    } = await db.pool(updatePostPartially);

    if (!rowCount)
      return res.status(404).send(`The post with id ${id} does not exist`);

    return res.send(200).status(updatedPost);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Sometging went wrong");
  }
};

const delete_one_post = async (req, res) => {
  const { id } = req.params;

  const deletePost = {
    text: `
    DELETE FROM posts
    WHERE id=$1
    RETURNING *;`,
    params: [id],
  };

  try {
    const {
      rows: [deletedPost],
      rowCount,
    } = await db.pool(deletePost);

    if (!rowCount)
      return res.status(404).send(`The post with id ${id} does not exist`);

    return res.send(200).status(deletedPost);
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
