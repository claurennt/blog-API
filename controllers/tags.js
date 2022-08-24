const db = require("../db/client");
const retrieve_all_posts_by_tag = async (req, res) => {
  const { tag } = req.query;

  try {
    const { rows: allPostsByTag, rowCount } = await db.query(
      `SELECT posts.title, posts.body, posts.image, posts.source_link, posts.published_date, authors.name as author_name, tags.name as tag
      FROM posts
      JOIN authors on authors.id = posts.author_id 
      FULL JOIN tags on tags.id = posts.tag_id
        WHERE tags.name=$1 `,
      [tag]
    );

    if (!rowCount)
      return res
        .status(404)
        .send(
          `The query did not return any results. The available tags are 'gender', 'energy' and 'environment'`
        );

    return res.status(200).send(allPostsByTag);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Sometging went wrong");
  }
};

module.exports = retrieve_all_posts_by_tag;
