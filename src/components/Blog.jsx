import React, { useState } from "react";
import BlogList from "./BlogList";

const Blog = () => {
  const initialBlogs = [
    {
      id: 1,
      title: "Understanding Phishing Attacks in 2024",
      content:
        "Phishing attacks have become increasingly sophisticated, using AI-generated content to create more convincing emails...",
      category: "phishing",
      votes: 45,
      comments: [
        { id: 1, text: "Great explanation of modern phishing techniques!" },
        {
          id: 2,
          text: "I recently encountered a similar attack at my workplace.",
        },
      ],
    },
    {
      id: 2,
      title: "The Rise of QR Code Baiting",
      content:
        "Cybercriminals are increasingly using malicious QR codes in public places to trick users...",
      category: "baiting",
      votes: 32,
      comments: [
        {
          id: 3,
          text: "QR codes are everywhere these days, we need to be careful.",
        },
      ],
    },
    {
      id: 3,
      title: "New Ransomware Strain Targeting Cloud Services",
      content:
        "A new strain of ransomware has been detected that specifically targets cloud storage services...",
      category: "malware",
      votes: 67,
      comments: [
        {
          id: 4,
          text: "This is scary stuff. Time to review our backup strategy.",
        },
        { id: 5, text: "Does anyone know if this affects Google Drive?" },
      ],
    },
    {
      id: 4,
      title: "Social Engineering Through Professional Networks",
      content:
        "Attackers are creating elaborate fake profiles on LinkedIn and other professional networks...",
      category: "social-engineering",
      votes: 53,
      comments: [
        {
          id: 6,
          text: "I've seen so many suspicious connection requests lately.",
        },
      ],
    },
  ];

  const [blogs, setBlogs] = useState(initialBlogs);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "phishing",
    "baiting",
    "malware",
    "social-engineering",
  ];

  const handleVote = (id, type) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id
          ? { ...blog, votes: type === "up" ? blog.votes + 1 : blog.votes - 1 }
          : blog
      )
    );
  };

  const addComment = (blogId, comment) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === blogId
          ? {
              ...blog,
              comments: [...blog.comments, { id: Date.now(), text: comment }],
            }
          : blog
      )
    );
  };

  const filteredBlogs =
    selectedCategory === "all"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="app-container">
      <h1>Cybersecurity Blog</h1>
      <div className="category-filter">
        <span>Filter by: </span>
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <BlogList
        blogs={filteredBlogs}
        onVote={handleVote}
        onComment={addComment}
      />
    </div>
  );
};

export default Blog;