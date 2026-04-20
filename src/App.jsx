import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostList from "./components/PostList";
import IndividualPostPage from "./Pages/IndividualPostPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import { ThemeProvider } from "./components/ThemeContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin(username, password) {
    if (username === "admin" && password === "1234") {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  return (
    <ThemeProvider>
      <Router>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <PostList /> : <Navigate to="/login" />}
          />
          <Route
            path="/post/:id"
            element={isLoggedIn ? <IndividualPostPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/contact"
            element={isLoggedIn ? <ContactPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
          />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;