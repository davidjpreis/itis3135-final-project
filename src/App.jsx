import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostList from "./components/PostList";
import IndividualPostPage from "./Pages/IndividualPostPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import { ThemeProvider } from "./components/ThemeContext";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>  
          <Header />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/post/:id" element={<IndividualPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
          <Footer />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;