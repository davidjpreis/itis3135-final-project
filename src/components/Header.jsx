import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";

function Header({ isLoggedIn, onLogout }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  function handleLogoutClick() {
    onLogout();
    navigate("/login");
  }

  return (
    <div
      className={`header p-4 flex justify-between items-center ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <h1 className="text-xl font-bold">My Blog</h1>

      <nav className="flex gap-4 items-center">
        {/* Nav links visible to everyone */}
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>

        {/* Show Login or Logout depending on auth state */}
        {!isLoggedIn ? (
          <Link to="/login">Login</Link>
        ) : (
          <button
            onClick={handleLogoutClick}
            className="px-2 py-1 border rounded"
          >
            Logout
          </button>
        )}

        <button
          onClick={toggleTheme}
          className="ml-2 px-2 py-1 border rounded"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </nav>
    </div>
  );
}

export default Header;