import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import { useUsername, useAuth } from "../context/AuthContext";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout } = useAuth();
  const username = useUsername();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  function handleLogoutClick() {
    logout();
    navigate("/");
  }

  return (
    <div
      className={`header p-4 flex justify-between items-center ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <h1 className="text-xl font-bold">My Blog</h1>

      <nav className="navBar">
        {username ? (
          <button className="log1" onClick={handleLogoutClick}>
            Logout
          </button>
        ) : (
          <button className="log2" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/contact")}>Contact</button>

        <button onClick={toggleTheme} className="ml-2 px-2 py-1 border rounded">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </nav>
    </div>
  );
}

export default Header;
