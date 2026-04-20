import { Link } from "react-router-dom"; // <-- make sure to import Link

function Post({ id, title, content, author, date }) {
  return (
    <div className="post" style={{ marginBottom: "20px" }}>
      <h2>{title}</h2>
      <p>{content.substring(0, 100)}...</p> {/* short preview */}
      <p>Author: {author}</p>
      <p>Date: {date}</p>

      <Link 
        to={`/post/${id}`} 
        style={{ color: "#3b82f6", textDecoration: "underline", marginTop: "10px", display: "inline-block" }}
      >
        Read More
      </Link>
    </div>
  );
}

export default Post;