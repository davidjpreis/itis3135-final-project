import { useState } from "react";

function CommentBox({ addComment, posting, username }) {
  const [name] = useState(username);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Please enter a comment.");
      return;
    }

    addComment({ name, text }, () => {
      
      setText("");
    });
  };

  return (
    <div className="mt-4">
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