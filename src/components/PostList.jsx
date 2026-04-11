import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setPosts(response.data))
      .catch((error) =>
        console.error("Error fetching posts:", error)
      );
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>

      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.body} // ⚠️ important
        />
      ))}
    </div>
  );
}

export default PostList;