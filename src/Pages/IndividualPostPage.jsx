import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CommentBox from "../components/CommentBox";



function IndividualPostPage({ isLoggedIn }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [apiComments, setApiComments] = useState([]);

  // Load user-submitted comments from localStorage on first render
  const [localComments, setLocalComments] = useState(() => {
    const saved = localStorage.getItem(`comments-${id}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [postingComment, setPostingComment] = useState(false);
  const [error, setError] = useState(null);

  // Combine API comments + local comments for display
  const allComments = [...apiComments, ...localComments];

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

  // --- Fetch API Comments ---
  // Kept separate from localComments so they never overwrite each other
  useEffect(() => {
    const fetchComments = async () => {
      setLoadingComments(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        setApiComments(response.data);
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

      const newComment = response.data;

      // Update local state and save to localStorage
      setLocalComments((prev) => {
        const updated = [...prev, newComment];
        localStorage.setItem(`comments-${id}`, JSON.stringify(updated));
        return updated;
      });

      callback?.();
    } catch (err) {
      console.error("Error posting comment:", err);
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

      {/* Post Content — visible to everyone */}
      <h1 style={{ marginBottom: "10px" }}>{post.title}</h1>
      <p style={{ lineHeight: "1.6" }}>{post.body}</p>

      {/* Author Info — visible to everyone */}
      {user && (
        <div className="author-box">
          <p><strong>Author:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      {/* Comments Section — only visible to logged in users */}
      {isLoggedIn ? (
        <>
          <h3>Comments</h3>
          {loadingComments ? (
            <p>Loading comments...</p>
          ) : allComments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            allComments.map((c, index) => (
              <div key={c.id ?? `local-${index}`} className="comment-card">
                <strong>{c.name}</strong>
                <p>{c.body}</p>
              </div>
            ))
          )}
          <CommentBox addComment={addComment} posting={postingComment} />
        </>
      ) : (
        <p style={{ marginTop: "20px" }}>
          Please{" "}
          <Link to="/login" style={{ color: "#3b82f6" }}>
            log in
          </Link>{" "}
          to view and leave comments.
        </p>
      )}
    </div>
  );
}

export default IndividualPostPage;