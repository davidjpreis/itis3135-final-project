import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostList from "./components/PostList";
import IndividualPostPage from "./Pages/IndividualPostPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import { ThemeProvider } from "./components/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<PostList />} />         
             
            <Route path="/post/:id" element={<IndividualPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;