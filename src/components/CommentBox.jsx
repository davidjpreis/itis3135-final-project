import { useState } from "react";

function CommentBox({ addComment, posting }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !text) {
      alert("Please enter your name and comment.");
      return;
    }

    addComment({ name, text }, () => {
      // Clear form only after successful post
      setName("");
      setText("");
    });
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-1"
        />

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