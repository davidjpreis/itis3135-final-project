import { Link } from "react-router-dom"; // 

function Post({ id, title, content, author, date }) {
  return (
    <div className="post" style={{ marginBottom: "20px" }}>
      <h2>{title}</h2>
      <p>{content.substring(0, 100)}...</p> {/* short preview */}
      

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