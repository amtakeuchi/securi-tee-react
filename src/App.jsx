import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import BlogListPage from "./components/BlogListPage";
import BlogPostPage from "./components/BlogPostPage";
import ProjectListPage from "./components/ProjectListPage";
import ProjectPage from "./components/ProjectPage";
import ContactPage from "./components/ContactPage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-800">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/projects" element={<ProjectListPage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
