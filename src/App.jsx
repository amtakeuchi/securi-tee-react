import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ProjectListPage from "./components/ProjectListPage";
import ContactPage from "./components/ContactPage";
import BlogListPage from "./components/BlogListPage";
import ThankYouPage from "./components/ThankYouPage";
import NotFoundPage from "./components/NotFoundPage";
import BlogPostPage from "./components/BlogPostPage";
import ProjectPage from "./components/ProjectPage";

function App() {
  return (
    <Router>
      <div className="text-gray-900 bg-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectListPage />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
