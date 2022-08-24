const db = require("../db/client");

const retrieve_all_posts_by_author = async (req, res) => {
  //destructure both the key and the value of the two expected params
  const { author_id } = req.params;

  try {
    const { rows: allPostsByAuthor, rowCount } = await db.query(
      `SELECT posts.title, posts.body, posts.image, posts.source_link, posts.published_date, authors.name as author_name, tags.name as tag
      FROM posts
      JOIN authors on authors.id = posts.author_id 
FULL JOIN tags on tags.id = posts.tag_id
        WHERE posts.author_id=$1 `,
      [author_id]
    );

    if (!rowCount)
      return res.status(404).send(`The query did not return any results.`);

    return res.status(200).send(allPostsByAuthor);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Sometging went wrong");
  }
};

module.exports = retrieve_all_posts_by_author;
