const db = require("../db/client");

const retrieveAllUsers = async (req, res) => {
  try {
    const { rows: posts, rowCount } = await db.pool("SELECT * FROM posts;");

    if (!rowCount) return res.status(404).send("No posts found");

    return res.send(200).status(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Sometging went wrong");
  }
};

module.exports = {
  retrieveAllUsers,
};
