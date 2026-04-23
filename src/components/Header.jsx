import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import { useAuth } from "./AuthContext";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useAuth();
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

      {user && <p>Welcome, {user.username}!</p>}

      <nav className="flex gap-4 items-center">
        <button onClick={() => navigate("/")} className="px-2 py-1 border rounded">
          Home
        </button>
        <button onClick={() => navigate("/contact")} className="px-2 py-1 border rounded">
          Contact
        </button>

        {user ? (
          <>
          
            <button onClick={handleLogoutClick} className="px-2 py-1 border rounded">
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => navigate("/login")} className="px-2 py-1 border rounded">
            Login
          </button>
        )}

        <button onClick={toggleTheme} className="ml-2 px-2 py-1 border rounded">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </nav>
    </div>
  );
}

export default Header;