import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
// import { useUsername } from (path to AuthContext)

function PostList() {
  const [posts, setPosts] = useState([]);
  // const username = useUsername(); // Example of using the AuthContext

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div>
      {/* {username ? (
        <p className="welcome">
          Welcome, {username}! This is the blog site. Feel free to explore the
          posts!
        </p>
      ) : (
        <p className="welcome">
          Welcome! This is the blog site. If you wish to comment, please select
          the "Login" navigation button.
        </p>
      )} */}
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
