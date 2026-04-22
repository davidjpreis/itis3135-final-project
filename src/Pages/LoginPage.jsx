import { useState } from "react";
import { Navigate } from "react-router-dom";

function LoginPage({ onLogin, isLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const success = onLogin(username, password);

    if (!success) {
      setError("Invalid username or password");
    } else {
      setError("");
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        <button type="submit" className="border rounded p-2">
          Login
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

     
    </div>
  );
}

export default LoginPage;