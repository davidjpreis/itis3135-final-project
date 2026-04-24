import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function CommentBox({ addComment, posting }) {
  const { user } = useAuth();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) return;

    if (!text.trim()) {
      alert("Please enter a comment.");
      return;
    }

    addComment({ name: user.username, text }, () => {
      setText("");
    });
  };

  if (!user) {
    return <p className="mt-4">Please log in to leave a comment.</p>;
  }

  return (
    <div className="mt-4">
      <p className="mb-2"><strong><u>Commenting as</u></strong>: {user.username}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          placeholder="Your Comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-1"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-1"
          disabled={posting}
        >
          {posting ? "Posting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default CommentBox;