  <h1>Welcome to the Blog API</h1>
  <h2>an API built with NodeJs ExpressJS and PostgreSQL.</h2>

  <h3>Endpoints:</h3>
  <ul>
    <h4>
      <li>/api/posts</li>
    </h4>
    <p><strong>GET</strong>-> retrieves all the posts</p>
    <p><strong>POST</strong>-> creates a new post. Expects body values for <code>author_id, title, image, body, tag_id, source_link</code></p>
    <h4>
      <li>/api/posts/:id</li>
    </h4>
    <p><strong>GET</strong>-> retrieves one post by id</p>
    <p><strong>PUT</strong>-> updates entire post post by id. Expects body values for <code>author_id, title, image, body, tag_id, source_link</code></p>
    <p><strong>PATCH</strong>-> updates one field in post. Expects body with one of the following values <code>author_id, title, image, body, tag_id, source_link</code></p>
    <p><strong>DELETE</strong>-> deletes one post by id</p>
    <h4>
      <li>/api/tags?tag=[value]</li>
    </h4>
    <p><strong>GET</strong>-> retrieves all posts by tag. Expects query string ?tag=[value]. Value must be one of 'energy', 'gender', 'environment'</p>
    <h4>
      <li>/api/authors/:author_id/posts</li>
    </h4>
    <p><strong>GET</strong>-> retrieves all posts by author</p>
  </ul>
