import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";

// import { useUsername, useAuth } from (path to AuthContext)

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  // const username = useUsername(); // Example of using the AuthContext
  // const { logout } = useAuth(); // Example of using the AuthContext

  // Sync theme with body class for global styles

  return (
    <div
      className={`header p-4 flex justify-between items-center ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <h1 className="text-xl font-bold">My Blog</h1>

      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        {/* <Link to="/posts">Posts</Link> */}
        <Link to="/contact">Contact</Link>
        <button onClick={toggleTheme} className="ml-4 px-2 py-1 border rounded">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>

        {/* {username ? (
          <button className="log" onClick={logout}>
            Logout
          </button>
        ) : (
          <button className="log">
            <Link to="/login">Login</Link>
          </button>
        )} */}
      </nav>
    </div>
  );
}

export default Header;
