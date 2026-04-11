import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CommentBox from "../components/CommentBox";

function IndividualPostPage() {
  const { id } = useParams(); // matches /post/:id route
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [postingComment, setPostingComment] = useState(false);
  const [error, setError] = useState(null);

  // --- Fetch Post + Author ---
  useEffect(() => {
    const fetchPostAndUser = async () => {
      setLoadingPost(true);
      try {
        const postResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        if (!postResponse.data.id) {
          setError("Post not found");
          setLoadingPost(false);
          return;
        }

        setPost(postResponse.data);

        const userResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${postResponse.data.userId}`
        );
        setUser(userResponse.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch post");
      } finally {
        setLoadingPost(false);
      }
    };

    fetchPostAndUser();
  }, [id]);

  // --- Fetch Comments ---
  useEffect(() => {
    const fetchComments = async () => {
      setLoadingComments(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        setComments(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [id]);

  // --- Add New Comment ---
  const addComment = async (comment, callback) => {
    if (!comment.name || !comment.text) {
      alert("Please enter your name and comment.");
      return;
    }

    setPostingComment(true);
    try {
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
        {
          postId: parseInt(id),
          name: comment.name,
          body: comment.text,
        }
      );
      setComments([...comments, response.data]); // update local state
      callback?.(); // clear form after success
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Failed to post comment. Try again.");
    } finally {
      setPostingComment(false);
    }
  };

  // --- Loading & Error States ---
  if (loadingPost) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="post" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Link to="/" style={{ display: "inline-block", marginBottom: "20px", color: "#3b82f6" }}>
        ← Back to Blog Posts
      </Link>

      {/* Post Content */}
      <h1 style={{ marginBottom: "10px" }}>{post.title}</h1>
      <p style={{ lineHeight: "1.6" }}>{post.body}</p>

      {/* Author Info */}
      {user && (
        <div
          style={{
            marginTop: "20px",
            marginBottom: "30px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <p><strong>Author:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      {/* Comments Section */}
      <h3>Comments</h3>
      {loadingComments ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((c) => (
          <div
            key={c.id}
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #eee",
              borderRadius: "5px",
              backgroundColor: "#fdfdfd",
            }}
          >
            <strong>{c.name}</strong>
            <p>{c.body}</p>
          </div>
        ))
      )}

      {/* Comment Form */}
      <CommentBox addComment={addComment} posting={postingComment} />
    </div>
  );
}

export default IndividualPostPage;